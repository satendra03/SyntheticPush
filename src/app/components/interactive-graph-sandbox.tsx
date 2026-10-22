// src/app/components/interactive-graph-sandbox.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Sparkles, 
  Flame, 
  Terminal as TerminalIcon, 
  RefreshCw, 
  Heart, 
  Zap, 
  GitCommit, 
  Layers, 
  ArrowRight,
  CheckCircle2,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// 52 weeks * 7 days = 364 days
const WEEKS = 52;
const DAYS = 7;
const TOTAL_CELLS = WEEKS * DAYS;

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Color map for dark/light themes
const LEVEL_CLASSES = [
  "bg-slate-200/80 dark:bg-[#161b22] border-slate-300/40 dark:border-white/5", // 0
  "bg-emerald-200 dark:bg-[#0e4429] border-emerald-300/50 dark:border-[#0e4429]", // 1
  "bg-emerald-400 dark:bg-[#006d32] border-emerald-500/50 dark:border-[#006d32]", // 2
  "bg-emerald-500 dark:bg-[#26a641] border-emerald-600/50 dark:border-[#26a641]", // 3
  "bg-emerald-400 dark:bg-[#39d353] border-emerald-300/60 dark:border-[#39d353] shadow-[0_0_8px_rgba(57,211,83,0.4)]", // 4
];

// Deterministic 32-bit PRNG (Mulberry32) for SSR hydration safety
function createPrng(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Generates an authentic, realistic developer commit matrix:
// - Strong weekday activity with natural sprint waves and occasional rest days
// - Realistic weekend cooldowns (developers commit mostly on weekdays)
// - Realistic shade distribution (levels 1 through 4)
export function generateRealisticGrid(seed: number = 2026): number[] {
  const rand = createPrng(seed);
  const grid = new Array(TOTAL_CELLS).fill(0);

  // Generate sprint activity curve across 52 weeks (2-4 week cycles + holidays)
  const weekActivity: number[] = [];
  for (let w = 0; w < WEEKS; w++) {
    if (w === 51) {
      weekActivity.push(0.12); // Late December holiday break
    } else if (w === 26) {
      weekActivity.push(0.25); // Mid-summer break
    } else {
      // Natural project cadence waves
      const wave = Math.sin(w / 3.0) * 0.22 + Math.cos(w / 6.0) * 0.12;
      const noise = (rand() - 0.5) * 0.2;
      weekActivity.push(Math.max(0.35, Math.min(1.0, 0.76 + wave + noise)));
    }
  }

  for (let w = 0; w < WEEKS; w++) {
    const activity = weekActivity[w];

    for (let d = 0; d < DAYS; d++) {
      const idx = w * DAYS + d;
      const isWeekend = d === 0 || d === 6; // Sunday or Saturday
      const r = rand();

      if (isWeekend) {
        // Weekends: rare coding (10-20% chance depending on sprint activity)
        const weekendChance = 0.16 * activity;
        if (r < weekendChance) {
          const shadeR = rand();
          grid[idx] = shadeR > 0.8 ? 2 : 1;
        } else {
          grid[idx] = 0;
        }
      } else {
        // Weekdays (Mon-Fri): 75-92% commit frequency
        const weekdayChance = Math.min(0.92, 0.70 * activity + 0.16);
        if (r < weekdayChance) {
          const shadeR = rand();
          // Midweek boost (Tue, Wed, Thu)
          const isMidweek = d >= 2 && d <= 4;
          const boost = isMidweek ? 0.08 : 0;

          if (shadeR + boost > 0.80) {
            grid[idx] = 4; // High activity (10+ commits)
          } else if (shadeR + boost > 0.55) {
            grid[idx] = 3; // Solid activity (6-9 commits)
          } else if (shadeR > 0.26) {
            grid[idx] = 2; // Moderate activity (3-5 commits)
          } else {
            grid[idx] = 1; // Light activity (1-2 commits)
          }
        } else {
          grid[idx] = 0; // Occasional rest or planning weekday
        }
      }
    }
  }

  return grid;
}

export const InteractiveGraphSandbox = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // Grid state: initial authentic realistic developer graph with deterministic seed for SSR safety
  const [grid, setGrid] = useState<number[]>(() => generateRealisticGrid(2026));

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [hoveredCell, setHoveredCell] = useState<{ week: number; day: number; level: number; date: string } | null>(null);
  const [activePreset, setActivePreset] = useState<string>("realistic");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "$ git clone https://github.com/satendra03/SyntheticPush.git",
    "[info] SyntheticPush commit engine initialized.",
    "[info] Click or drag across the graph below to paint your green contribution streak.",
  ]);

  // Handle global mouse up for drag drawing
  useEffect(() => {
    const handleMouseUp = () => setIsMouseDown(false);
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  // Compute stats
  const { totalCommits, activeDays, maxStreak } = useMemo(() => {
    let commits = 0;
    let active = 0;
    let currentStreak = 0;
    let maxS = 0;

    for (let i = 0; i < grid.length; i++) {
      const lvl = grid[i];
      if (lvl > 0) {
        active++;
        commits += lvl === 1 ? 2 : lvl === 2 ? 5 : lvl === 3 ? 10 : 18;
        currentStreak++;
        if (currentStreak > maxS) maxS = currentStreak;
      } else {
        currentStreak = 0;
      }
    }

    return { totalCommits: commits, activeDays: active, maxStreak: maxS };
  }, [grid]);

  // Cell click / paint handler
  const handleCellInteract = (index: number) => {
    setGrid((prev) => {
      const next = [...prev];
      // cycle 0 -> 1 -> 2 -> 3 -> 4 -> 0
      next[index] = (next[index] + 1) % 5;
      return next;
    });

    const now = new Date();
    now.setDate(now.getDate() - (TOTAL_CELLS - index));
    const dateStr = now.toISOString().split("T")[0];

    setTerminalLogs((prev) => [
      ...prev.slice(-4),
      `$ git commit --date="${dateStr} 12:00:00" -m "feat(activity): synthetic push +1"`,
      `[main] Commit recorded (${dateStr}) • Streak synced!`,
    ]);
  };

  const handleCellHover = (index: number, week: number, day: number) => {
    const now = new Date();
    now.setDate(now.getDate() - (TOTAL_CELLS - index));
    const dateStr = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    
    setHoveredCell({
      week,
      day,
      level: grid[index],
      date: dateStr,
    });

    if (isMouseDown) {
      setGrid((prev) => {
        const next = [...prev];
        next[index] = next[index] === 4 ? 4 : Math.min(4, next[index] + 1);
        return next;
      });
    }
  };

  // Preset generators
  const applyPreset = (preset: string) => {
    setActivePreset(preset);
    const newGrid = new Array(TOTAL_CELLS).fill(0);

    if (preset === "streak") {
      // 100% full emerald green
      for (let i = 0; i < TOTAL_CELLS; i++) {
        newGrid[i] = Math.random() > 0.4 ? 4 : 3;
      }
      setTerminalLogs((prev) => [
        ...prev.slice(-3),
        "$ synthetic-push --apply-preset=streak-365",
        "[success] 365-day impenetrable emerald streak generated!",
      ]);
    } else if (preset === "heart") {
      // Draw pixel heart around weeks 22-30
      const centerWeek = 26;
      for (let w = 0; w < WEEKS; w++) {
        for (let d = 0; d < DAYS; d++) {
          const idx = w * DAYS + d;
          const relW = w - centerWeek;
          const relD = d - 3;
          // Heart condition
          if (
            (relD === -2 && (relW === -3 || relW === -2 || relW === 2 || relW === 3)) ||
            (relD === -1 && (relW >= -4 && relW <= 4 && relW !== 0)) ||
            (relD === 0 && (relW >= -4 && relW <= 4)) ||
            (relD === 1 && (relW >= -3 && relW <= 3)) ||
            (relD === 2 && (relW >= -2 && relW <= 2)) ||
            (relD === 3 && (relW >= -1 && relW <= 1))
          ) {
            newGrid[idx] = 4;
          } else {
            newGrid[idx] = Math.random() > 0.85 ? 1 : 0;
          }
        }
      }
      setTerminalLogs((prev) => [
        ...prev.slice(-3),
        "$ synthetic-push --pattern=pixel-heart",
        "[success] Heart contribution pattern rendered on graph.",
      ]);
    } else if (preset === "wave") {
      for (let w = 0; w < WEEKS; w++) {
        const sinVal = Math.sin(w / 3);
        const activeDay = Math.floor((sinVal + 1) * 3);
        for (let d = 0; d < DAYS; d++) {
          const idx = w * DAYS + d;
          if (Math.abs(d - activeDay) <= 1) {
            newGrid[idx] = 4;
          } else if (Math.abs(d - activeDay) <= 2) {
            newGrid[idx] = 2;
          }
        }
      }
      setTerminalLogs((prev) => [
        ...prev.slice(-3),
        "$ synthetic-push --pattern=wave-frequency",
        "[success] Sinusoidal wave commits dispatched.",
      ]);
    } else if (preset === "realistic") {
      const generated = generateRealisticGrid(Math.floor(Math.random() * 100000) + 1);
      for (let i = 0; i < TOTAL_CELLS; i++) {
        newGrid[i] = generated[i];
      }
      setTerminalLogs((prev) => [
        ...prev.slice(-3),
        "$ synthetic-push --simulate-prolific-engineer",
        "[success] Authentic developer commit matrix simulated.",
      ]);
    } else if (preset === "clear") {
      setTerminalLogs((prev) => [
        ...prev.slice(-3),
        "$ git reset --hard HEAD",
        "[info] Canvas cleared. Paint freely.",
      ]);
    }

    setGrid(newGrid);
  };

  const handleLaunch = async () => {
    if (session?.user?.username) {
      router.push(`/dashboard/${session.user.username}`);
    } else {
      await signIn("github");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto rounded-3xl border border-border/80 bg-card/80 backdrop-blur-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:border-emerald-500/40 glow-emerald text-left">
      {/* Window Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-border/70 bg-muted/40">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
          </div>
          <div className="flex items-center gap-2 pl-3 border-l border-border/60">
            <GitCommit className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono text-muted-foreground font-semibold">
              contribution-graph-sandbox.sh
            </span>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-mono bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
              Interactive Canvas
            </Badge>
          </div>
        </div>

        {/* Preset Action Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            onClick={() => applyPreset("realistic")}
            className={cn(
              "px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer flex items-center gap-1 text-xs",
              activePreset === "realistic"
                ? "bg-emerald-500 text-white shadow-sm"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <Sparkles className="w-3 h-3" /> Realistic
          </button>
          <button
            onClick={() => applyPreset("streak")}
            className={cn(
              "px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer flex items-center gap-1 text-xs",
              activePreset === "streak"
                ? "bg-emerald-500 text-white shadow-sm"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <Flame className="w-3 h-3" /> 365-Day Streak
          </button>
          <button
            onClick={() => applyPreset("heart")}
            className={cn(
              "px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer flex items-center gap-1 text-xs",
              activePreset === "heart"
                ? "bg-emerald-500 text-white shadow-sm"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <Heart className="w-3 h-3" /> Pixel Heart
          </button>
          <button
            onClick={() => applyPreset("wave")}
            className={cn(
              "px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer flex items-center gap-1 text-xs",
              activePreset === "wave"
                ? "bg-emerald-500 text-white shadow-sm"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <Zap className="w-3 h-3" /> Wave Pulse
          </button>
          <button
            onClick={() => applyPreset("clear")}
            className="px-2.5 py-1 rounded-md font-medium bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer text-xs"
            title="Reset Canvas"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Sandbox Body */}
      <div className="p-6 space-y-6">
        {/* HUD Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50 text-left">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground font-mono flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Total Commits</span>
            </span>
            <p className="text-2xl font-bold font-mono text-emerald-400 leading-8 text-left">
              {totalCommits.toLocaleString()}
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground font-mono flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span>Max Streak</span>
            </span>
            <p className="text-2xl font-bold font-mono text-orange-400 leading-8 flex items-baseline gap-1.5 text-left">
              <span>{maxStreak}</span>
              <span className="text-xs font-normal text-muted-foreground">days</span>
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground font-mono flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Active Days</span>
            </span>
            <p className="text-2xl font-bold font-mono text-foreground leading-8 flex items-baseline gap-1.5 text-left">
              <span>{activeDays}</span>
              <span className="text-xs font-normal text-muted-foreground">/ 364</span>
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground font-mono flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Status</span>
            </span>
            <div className="h-8 flex items-center gap-2 text-left">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-sm sm:text-base font-semibold font-mono text-emerald-400">
                Synchronized
              </span>
            </div>
          </div>
        </div>

        {/* Heatmap Grid Container */}
        <div 
          className="relative overflow-x-auto pb-4 pt-2 select-none"
          onMouseDown={() => setIsMouseDown(true)}
        >
          {/* Months header labels */}
          <div className="flex justify-between text-[11px] font-mono text-muted-foreground mb-2 px-6 min-w-[760px]">
            {MONTH_NAMES.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>

          {/* 52 Columns x 7 Rows Grid */}
          <div className="flex gap-[3.5px] justify-center min-w-[760px] p-2 bg-muted/10 rounded-xl border border-border/30">
            {Array.from({ length: WEEKS }).map((_, weekIdx) => (
              <div key={weekIdx} className="flex flex-col gap-[3.5px]">
                {Array.from({ length: DAYS }).map((_, dayIdx) => {
                  const cellIndex = weekIdx * DAYS + dayIdx;
                  const level = grid[cellIndex] || 0;

                  return (
                    <div
                      key={dayIdx}
                      onClick={() => handleCellInteract(cellIndex)}
                      onMouseEnter={() => handleCellHover(cellIndex, weekIdx, dayIdx)}
                      className={cn(
                        "w-[11.5px] h-[11.5px] rounded-[2.5px] border cursor-pointer transition-all duration-150 hover:scale-135 hover:z-20",
                        LEVEL_CLASSES[level]
                      )}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* Grid Legend & Hover Tooltip */}
          <div className="flex flex-wrap items-center justify-between text-xs text-muted-foreground mt-4 px-2">
            <div className="font-mono text-[11px]">
              {hoveredCell ? (
                <span>
                  <strong className="text-foreground">{hoveredCell.date}:</strong>{" "}
                  {hoveredCell.level === 0 ? "No commits" : `${hoveredCell.level * 4} commits recorded`}
                </span>
              ) : (
                <span className="text-muted-foreground/80 italic">
                  Tip: Click or click & drag to draw custom commit patterns.
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <span>Less</span>
              {LEVEL_CLASSES.map((cls, idx) => (
                <span key={idx} className={cn("w-3 h-3 rounded-[2px] border inline-block", cls)} />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Live Terminal Output & CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 items-center pt-2 border-t border-border/50">
          {/* Terminal snippet */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 text-emerald-400 font-mono text-xs border border-white/10 space-y-1 overflow-hidden shadow-inner">
            <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] pb-1 border-b border-white/5 mb-1">
              <TerminalIcon className="w-3 h-3 text-emerald-400" />
              <span>LIVE GIT DISPATCH CONSOLE</span>
            </div>
            {terminalLogs.slice(-3).map((log, i) => (
              <p key={i} className="truncate opacity-90">
                {log}
              </p>
            ))}
          </div>

          {/* Action Trigger */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleLaunch}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl px-6 py-6 text-sm shadow-lg hover:shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>Push to Real GitHub Profile</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
