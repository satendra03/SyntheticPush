// src/app/dashboard/[username]/[repo]/page.tsx
"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { format, subDays, subMonths, subYears } from "date-fns";
import { toast } from "sonner";
import {
  Loader2,
  Calendar as CalendarIcon,
  GitCommit,
  Sparkles,
  Flame,
  Zap,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Palette,
  Sliders,
  ShieldCheck,
  ShieldAlert,
  Info,
  Coins,
  Paintbrush,
  Eraser,
  Grid,
  Clock,
  X,
  Lock,
  ArrowUpRight,
  FolderGit2,
  GitBranch,
  ExternalLink,
  Unlock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { SyntheticPushPayload, CommitEntry } from "@/types";

// 52 weeks * 7 days = 364 days
const WEEKS = 52;
const DAYS = 7;
const TOTAL_CELLS = WEEKS * DAYS;

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Clean high-visibility color classes for dark and light modes
const LEVEL_CLASSES = [
  "bg-slate-100 dark:bg-[#161b22] border-slate-300 dark:border-[#30363d] hover:border-slate-400 dark:hover:border-slate-500", // 0
  "bg-emerald-300 dark:bg-[#0e4429] border-emerald-400 dark:border-[#165633]", // 1
  "bg-emerald-400 dark:bg-[#006d32] border-emerald-500 dark:border-[#00873d]", // 2
  "bg-emerald-500 dark:bg-[#26a641] border-emerald-600 dark:border-[#2bbd4a]", // 3
  "bg-emerald-400 dark:bg-[#39d353] border-emerald-300 dark:border-[#39d353] shadow-[0_0_6px_rgba(57,211,83,0.4)]", // 4
];

type DispatchMode = "single" | "range" | "year_realistic" | "year_streak" | "pattern" | "custom";
type PresetPattern = "heart" | "wave" | "matrix" | "hi" | "invader" | "star";

interface ModeOption {
  id: DispatchMode;
  title: string;
  badge: string;
  credits: number | string;
  description: string;
  icon: React.ElementType;
}

const MODES: ModeOption[] = [
  {
    id: "single",
    title: "Single Date",
    badge: "1-4 Credits",
    credits: "1 - 4",
    description: "Target a specific date with customizable commit density (1 credit = 3 commits = ₹1).",
    icon: CalendarIcon,
  },
  {
    id: "range",
    title: "Date Range",
    badge: "Pay per commit",
    credits: "₹1 / 3 commits",
    description: "Fill a continuous date range with realistic activity (1 credit = 3 commits = ₹1).",
    icon: Sliders,
  },
  {
    id: "year_realistic",
    title: "Whole Year (Realistic)",
    badge: "Human-Like",
    credits: "~350 - 500",
    description: "Organic commit distribution (~1,000–1,500 commits at 1 credit = 3 commits = ₹1).",
    icon: Sparkles,
  },
  {
    id: "year_streak",
    title: "Whole Year (365 Streak)",
    badge: "Solid",
    credits: "~700 - 1,000",
    description: "Unbroken emerald streak for every day (~2,000–3,000 commits, 1 credit = 3 commits).",
    icon: Flame,
  },
  {
    id: "pattern",
    title: "Predefined Shapes",
    badge: "Pixel Art",
    credits: "~25 - 60",
    description: "Render recognizable shapes (Heart, Wave, Matrix, etc.) at 1 credit = 3 commits = ₹1.",
    icon: Palette,
  },
  {
    id: "custom",
    title: "Custom Canvas",
    badge: "Interactive",
    credits: "₹1 / 3 commits",
    description: "Paint freely pixel-by-pixel with live price calculator at 1 credit = 3 commits = ₹1.",
    icon: Paintbrush,
  },
];

const AVAILABLE_YEARS = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016];

export default function RepoDispatchPage() {
  const { data: session, status } = useSession();
  const { username, repo } = useParams();
  const router = useRouter();
  const disclaimerRef = useRef<HTMLDivElement>(null);

  const sessionUsername = (session?.user?.username || "").toLowerCase();
  const urlUsername = (Array.isArray(username) ? username[0] : username || "").toLowerCase();

  // Automatic security redirects when unauthenticated or mismatched
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/?error=SessionExpired");
    } else if (
      status === "authenticated" &&
      sessionUsername &&
      urlUsername &&
      sessionUsername !== urlUsername
    ) {
      router.replace(`/dashboard/${sessionUsername}/${repo}`);
    }
  }, [status, sessionUsername, urlUsername, repo, router]);

  // Fetch available repositories for quick repository switching
  const [userRepos, setUserRepos] = useState<string[]>([]);
  useEffect(() => {
    if (session?.user?.accessToken) {
      fetch("/api/github/repos?page=1&per_page=50")
        .then((res) => (res.ok ? res.json() : []))
        .then((data) => {
          if (Array.isArray(data)) {
            setUserRepos(data.map((r: any) => r.name).filter(Boolean));
          }
        })
        .catch(() => {});
    }
  }, [session?.user?.accessToken]);

  // Primary mode state
  const [mode, setMode] = useState<DispatchMode>("year_realistic");
  const [targetYear, setTargetYear] = useState<number>(2024);
  const [singleDate, setSingleDate] = useState<Date>(() => subDays(new Date(), 1));
  const [startDate, setStartDate] = useState<Date>(() => subDays(new Date(), 30));
  const [endDate, setEndDate] = useState<Date>(() => new Date());
  const [pattern, setPattern] = useState<PresetPattern>("heart");
  const [shade, setShade] = useState<number>(4);
  const [brushShade, setBrushShade] = useState<number>(4);

  // Custom paint grid
  const [customGrid, setCustomGrid] = useState<number[]>(() => new Array(TOTAL_CELLS).fill(0));
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [hoveredCell, setHoveredCell] = useState<{
    week: number;
    day: number;
    level: number;
    date: string;
  } | null>(null);

  // User credits & disclaimer state
  const [credits, setCredits] = useState<number | null>(null);
  const [isLoadingCredits, setIsLoadingCredits] = useState(false);
  const [know, setKnow] = useState(false);
  const [highlightDisclaimer, setHighlightDisclaimer] = useState(false);

  // Progress & Loading States
  const [isDispatching, setIsDispatching] = useState(false);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [dispatchLogs, setDispatchLogs] = useState<string[]>([]);
  const [dispatchStage, setDispatchStage] = useState<string>("");
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const elapsedTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Seed for random realistic regeneration
  const [seedOffset, setSeedOffset] = useState<number>(42);

  // Protect user from accidental navigation / back button / tab close while dispatching
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDispatching) {
        e.preventDefault();
        e.returnValue = "A Git commit dispatch is in progress. Leaving this page will interrupt the push.";
        return e.returnValue;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDispatching]);

  // Global mouse up for paint canvas
  useEffect(() => {
    const handleMouseUp = () => setIsMouseDown(false);
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  // Fetch user credit balance
  const fetchCredits = useCallback(async () => {
    if (!session?.user?.username) return;
    setIsLoadingCredits(true);
    try {
      const res = await fetch("/api/firebase/credits");
      if (res.ok) {
        const data = await res.json();
        if (typeof data.credits === "number") {
          setCredits(data.credits);
        }
      }
    } catch (err) {
      console.error("Failed to fetch user credits:", err);
    } finally {
      setIsLoadingCredits(false);
    }
  }, [session?.user?.username]);

  useEffect(() => {
    fetchCredits();
  }, [fetchCredits]);

  // Compute active preview grid based on current mode and settings
  const activeGrid = useMemo<number[]>(() => {
    const grid = new Array(TOTAL_CELLS).fill(0);

    if (mode === "single") {
      if (singleDate) {
        const year = singleDate.getFullYear();
        const jan1 = new Date(year, 0, 1);
        const startSunday = new Date(jan1.getTime() - jan1.getDay() * 86400000);
        const diffDays = Math.floor((singleDate.getTime() - startSunday.getTime()) / 86400000);
        if (diffDays >= 0 && diffDays < TOTAL_CELLS) {
          grid[diffDays] = shade;
        }
      }
    } else if (mode === "range") {
      if (startDate && endDate) {
        const rangeStart = Math.min(startDate.getTime(), endDate.getTime());
        const rangeEnd = Math.max(startDate.getTime(), endDate.getTime());
        const year = new Date(rangeStart).getFullYear();
        const jan1 = new Date(year, 0, 1);
        const startSunday = new Date(jan1.getTime() - jan1.getDay() * 86400000);

        for (let i = 0; i < TOTAL_CELLS; i++) {
          const cellTime = startSunday.getTime() + i * 86400000;
          if (cellTime >= rangeStart && cellTime <= rangeEnd) {
            const pseudo = (Math.sin(i * 12.9898 + 78.233) * 43758.5453) % 1;
            grid[i] = Math.abs(pseudo) > 0.3 ? shade : Math.max(1, shade - 1);
          }
        }
      }
    } else if (mode === "year_realistic") {
      for (let w = 0; w < WEEKS; w++) {
        for (let d = 0; d < DAYS; d++) {
          const idx = w * DAYS + d;
          const isWeekend = d === 0 || d === 6;

          const pseudo = Math.abs(Math.sin(idx * 37.19 + seedOffset * 17.31) * 10000) % 1;

          if (isWeekend) {
            if (pseudo > 0.7) {
              grid[idx] = pseudo > 0.9 ? 2 : 1;
            }
          } else {
            if (pseudo > 0.25) {
              if (pseudo > 0.85) grid[idx] = 4;
              else if (pseudo > 0.65) grid[idx] = 3;
              else if (pseudo > 0.45) grid[idx] = 2;
              else grid[idx] = 1;
            }
          }
        }
      }
    } else if (mode === "year_streak") {
      for (let i = 0; i < TOTAL_CELLS; i++) {
        const pseudo = Math.abs(Math.sin(i * 19.83) * 10000) % 1;
        grid[i] = pseudo > 0.5 ? shade : Math.max(2, shade - 1);
      }
    } else if (mode === "pattern") {
      if (pattern === "heart") {
        const centerWeek = 26;
        for (let w = 0; w < WEEKS; w++) {
          for (let d = 0; d < DAYS; d++) {
            const idx = w * DAYS + d;
            const relW = w - centerWeek;
            const relD = d - 3;
            if (
              (relD === -2 && (relW === -3 || relW === -2 || relW === 2 || relW === 3)) ||
              (relD === -1 && relW >= -4 && relW <= 4 && relW !== 0) ||
              (relD === 0 && relW >= -4 && relW <= 4) ||
              (relD === 1 && relW >= -3 && relW <= 3) ||
              (relD === 2 && relW >= -2 && relW <= 2) ||
              (relD === 3 && relW >= -1 && relW <= 1)
            ) {
              grid[idx] = shade;
            } else {
              grid[idx] = 0;
            }
          }
        }
      } else if (pattern === "wave") {
        for (let w = 0; w < WEEKS; w++) {
          const sinVal = Math.sin(w / 3.5);
          const activeDay = Math.floor((sinVal + 1) * 3);
          for (let d = 0; d < DAYS; d++) {
            const idx = w * DAYS + d;
            if (Math.abs(d - activeDay) === 0) {
              grid[idx] = shade;
            } else if (Math.abs(d - activeDay) === 1) {
              grid[idx] = Math.max(1, shade - 1);
            }
          }
        }
      } else if (pattern === "matrix") {
        for (let w = 0; w < WEEKS; w++) {
          for (let d = 0; d < DAYS; d++) {
            const idx = w * DAYS + d;
            if ((w + d) % 4 === 0) {
              grid[idx] = shade;
            } else if ((w + d) % 4 === 1) {
              grid[idx] = Math.max(1, shade - 2);
            }
          }
        }
      } else if (pattern === "hi") {
        for (let w = 0; w < WEEKS; w++) {
          for (let d = 1; d <= 5; d++) {
            const idx = w * DAYS + d;
            if ((w === 22 || w === 24) && d >= 1 && d <= 5) grid[idx] = shade;
            if (w === 23 && d === 3) grid[idx] = shade;
            if (w === 27 && d >= 1 && d <= 5) grid[idx] = shade;
            if ((w === 26 || w === 28) && (d === 1 || d === 5)) grid[idx] = shade;
          }
        }
      } else if (pattern === "invader") {
        const invaderMatrix = [
          [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
          [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
          [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
          [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
          [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
        ];
        const startW = 21;
        for (let r = 0; r < 7; r++) {
          for (let c = 0; c < 11; c++) {
            if (invaderMatrix[r][c] === 1) {
              const idx = (startW + c) * DAYS + r;
              grid[idx] = shade;
            }
          }
        }
      } else if (pattern === "star") {
        for (let w = 0; w < WEEKS; w++) {
          for (let d = 0; d < DAYS; d++) {
            const idx = w * DAYS + d;
            if (w % 6 === 0 && d === (w % 7)) {
              grid[idx] = shade;
            }
          }
        }
      }
    } else if (mode === "custom") {
      return customGrid;
    }

    return grid;
  }, [mode, singleDate, startDate, endDate, pattern, shade, seedOffset, customGrid]);

  // Compute stats from activeGrid
  const { totalCommits, activeDays, requiredCredits } = useMemo(() => {
    let commits = 0;
    let active = 0;
    let curStreak = 0;
    let maxS = 0;

    for (let i = 0; i < activeGrid.length; i++) {
      const lvl = activeGrid[i];
      if (lvl > 0) {
        active++;
        commits += lvl === 1 ? 1 : lvl === 2 ? 3 : lvl === 3 ? 6 : 10;
        curStreak++;
        if (curStreak > maxS) maxS = curStreak;
      } else {
        curStreak = 0;
      }
    }

    // High conversion rate: 1 credit = 3 commits (1 Credit = ₹1)
    // Ensures server protection against misuse and fair monetization
    const cost = Math.max(1, Math.ceil(commits / 3));

    return {
      totalCommits: commits,
      activeDays: active,
      requiredCredits: cost,
    };
  }, [activeGrid]);

  const balanceAfter = credits !== null ? credits - requiredCredits : null;

  // Trigger guidance when user tries to dispatch without accepting protocol
  const triggerDisclaimerHint = () => {
    setHighlightDisclaimer(true);
    if (disclaimerRef.current) {
      disclaimerRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    toast.error("Please click 'Acknowledge Protocol' on the left first.", {
      duration: 4000,
      icon: <ShieldAlert className="w-4 h-4 text-amber-500" />,
    });
    setTimeout(() => {
      setHighlightDisclaimer(false);
    }, 2000);
  };

  // Custom canvas click & drag paint handler
  const handleCellPaint = (index: number) => {
    if (mode !== "custom") return;
    setCustomGrid((prev) => {
      const next = [...prev];
      next[index] = brushShade;
      return next;
    });
  };

  const handleCellHover = (index: number, week: number, day: number) => {
    const cellYear = mode === "single" && singleDate ? singleDate.getFullYear() : targetYear;
    const jan1 = new Date(cellYear, 0, 1);
    const startSunday = new Date(jan1.getTime() - jan1.getDay() * 86400000);
    const cellDate = new Date(startSunday.getTime() + index * 86400000);

    const dateStr = format(cellDate, "EEE, MMM d, yyyy");
    const lvl = activeGrid[index] || 0;

    setHoveredCell({
      week,
      day,
      level: lvl,
      date: dateStr,
    });

    if (isMouseDown && mode === "custom") {
      setCustomGrid((prev) => {
        const next = [...prev];
        next[index] = brushShade;
        return next;
      });
    }
  };

  // Custom Toast Notification Builders
  const showSuccessToast = (commitsCount: number, datesCount: number, remaining: number) => {
    toast.custom((t) => (
      <div className="w-full max-w-sm p-4 rounded-2xl border border-emerald-500/80 bg-slate-950 text-white shadow-xl space-y-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-emerald-400">
                Git Dispatch Successful
              </h4>
              <p className="text-xs text-slate-300 font-mono">
                {commitsCount} commits synced ({datesCount} days)
              </p>
            </div>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="p-1 rounded text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300">Remaining Balance:</span>
          <span className="font-bold text-emerald-400">{remaining} Credits</span>
        </div>

        <div className="flex items-center gap-2 pt-0.5">
          <Link
            href={`https://github.com/${username}/${repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button
              size="sm"
              variant="outline"
              className="w-full h-8 text-xs font-mono rounded-lg border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20"
            >
              <span>View Repo</span>
              <ArrowUpRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
          <Link
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button
              size="sm"
              className="w-full h-8 text-xs font-mono rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium"
            >
              <span>Profile</span>
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    ), { duration: 8000 });
  };

  const showErrorToast = (errorMessage: string) => {
    toast.custom((t) => (
      <div className="w-full max-w-sm p-4 rounded-2xl border border-red-500/80 bg-slate-950 text-white shadow-xl space-y-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-red-400">Git Dispatch Failed</h4>
              <p className="text-xs text-slate-300 leading-snug mt-0.5">{errorMessage}</p>
            </div>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="p-1 rounded text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2 pt-0.5">
          <Link href="/pricing" target="_blank" className="flex-1">
            <Button size="sm" className="w-full h-8 text-xs font-mono rounded-lg bg-red-500 hover:bg-red-600 text-white">
              Get Credits
            </Button>
          </Link>
          <Button
            size="sm"
            variant="outline"
            onClick={() => toast.dismiss(t)}
            className="flex-1 h-8 text-xs font-mono rounded-lg border-slate-700 text-slate-300"
          >
            Dismiss
          </Button>
        </div>
      </div>
    ), { duration: 6000 });
  };

  // Dispatch Git commits with simulated progressive stages
  const handleDispatch = async () => {
    if (!know) {
      triggerDisclaimerHint();
      return;
    }

    if (!session?.user?.username) {
      toast.error("User session expired. Please sign in again.");
      return;
    }

    if (credits !== null && credits < requiredCredits) {
      showErrorToast(`Insufficient credits. You need ${requiredCredits} credits, but currently have ${credits}.`);
      return;
    }

    if (activeDays === 0) {
      toast.error("No active days selected. Please choose at least 1 day to push.");
      return;
    }

    // Start loading state & progressive tracker
    setIsDispatching(true);
    setProgressPercent(5);
    setElapsedSeconds(0);
    setDispatchStage("Initializing Git micro-engine...");
    setDispatchLogs([
      `$ synthetic-push dispatch --repo="${username}/${repo}" --mode="${mode}"`,
      `[init] Starting transmission for @${username}/${repo}...`,
    ]);

    const startTime = Date.now();
    elapsedTimerRef.current = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    progressTimerRef.current = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev < 25) {
          setDispatchStage("Cloning repository sandbox (depth: 1)...");
          return prev + 3;
        } else if (prev < 65) {
          setDispatchStage(`Generating ${totalCommits} historical commits...`);
          return prev + 2;
        } else if (prev < 88) {
          setDispatchStage("Staging SyntheticPush.json and packing Git objects...");
          return prev + 1.5;
        } else if (prev < 96) {
          setDispatchStage("Transmitting atomic packfile to origin/main...");
          return prev + 0.5;
        }
        return prev;
      });
    }, 280);

    try {
      const cellYear = mode === "single" && singleDate ? singleDate.getFullYear() : targetYear;
      const jan1 = new Date(cellYear, 0, 1);
      const startSunday = new Date(jan1.getTime() - jan1.getDay() * 86400000);

      const commitEntries: CommitEntry[] = [];

      for (let i = 0; i < activeGrid.length; i++) {
        const lvl = activeGrid[i];
        if (lvl > 0) {
          const cellDate = new Date(startSunday.getTime() + i * 86400000);
          commitEntries.push({
            date: format(cellDate, "yyyy-MM-dd"),
            count: lvl === 1 ? 1 : lvl === 2 ? 3 : lvl === 3 ? 6 : 10,
            message: `Synthetic push: synced contribution activity (${format(cellDate, "MMM d, yyyy")})`,
          });
        }
      }

      setDispatchLogs((logs) => [
        ...logs,
        `[matrix] Created ${commitEntries.length} chronological timestamp targets.`,
        `[network] Dispatching payload to backend service...`,
      ]);

      const payload: SyntheticPushPayload = {
        repo: `${username}/${repo}`,
        accessToken: session.user.accessToken || "",
        authorName: session.user.username || "",
        authorEmail: session.user.email || `${session.user.username}@users.noreply.github.com`,
        mode,
        creditsRequired: requiredCredits,
        commits: commitEntries,
        metadata: {
          mode,
          pattern: mode === "pattern" ? pattern : undefined,
          targetYear: cellYear,
          shade,
          activeDays,
          totalCommits,
        },
      };

      const res = await fetch("/api/github/push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        showErrorToast(data.error || "Git push failed. Please verify your repository permissions.");
        return;
      }

      // Success complete
      setProgressPercent(100);
      setDispatchStage("Synchronized. GitHub is indexing the contribution graph.");
      setDispatchLogs((logs) => [
        ...logs,
        `[git] Push accepted by GitHub. Packfile verified.`,
        `[success] Complete. All commits signed and pushed.`,
      ]);

      const remaining = typeof data.remainingCredits === "number"
        ? data.remainingCredits
        : credits !== null
        ? credits - requiredCredits
        : 0;

      setCredits(remaining);

      showSuccessToast(
        data.commitsCount || totalCommits,
        data.datesCount || activeDays,
        remaining
      );
    } catch (err: any) {
      console.error("Dispatch error:", err);
      showErrorToast("Network connection error connecting to Git backend.");
    } finally {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      if (elapsedTimerRef.current) clearInterval(elapsedTimerRef.current);

      setTimeout(() => {
        setIsDispatching(false);
        setProgressPercent(0);
      }, 1000);
    }
  };

  // 1. Session Loading State
  if (status === "loading") {
    return (
      <div className="container mx-auto h-[65vh] flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        <p className="text-xs font-mono text-muted-foreground">Verifying secure session...</p>
      </div>
    );
  }

  // 2. Unauthenticated / Session Expired Guard
  if (!session) {
    return (
      <div className="container mx-auto h-[65vh] flex flex-col items-center justify-center text-center space-y-4 max-w-md p-6">
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-lg font-bold font-mono text-foreground">Authentication Required</h1>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Your session has expired or you are not signed in. Redirecting to sign in...
        </p>
        <Button
          onClick={() => signIn("github")}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-mono text-xs font-semibold rounded-xl px-5 py-2 cursor-pointer shadow-md shadow-emerald-500/20"
        >
          Sign In with GitHub
        </Button>
      </div>
    );
  }

  // 3. User Authorization / Permission Guard
  if (sessionUsername && urlUsername && sessionUsername !== urlUsername) {
    return (
      <div className="container mx-auto h-[65vh] flex flex-col items-center justify-center text-center space-y-4 max-w-md p-6">
        <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-lg font-bold font-mono text-foreground">Access Restricted</h1>
        <p className="text-xs text-muted-foreground leading-relaxed">
          You are signed in as <strong className="text-foreground">@{session.user?.username}</strong>. Redirecting to your repository...
        </p>
        <Button
          onClick={() => router.replace(`/dashboard/${session.user?.username}`)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-mono text-xs font-semibold rounded-xl px-5 py-2 cursor-pointer shadow-md shadow-emerald-500/20"
        >
          Go to Your Repositories
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-6 mx-auto min-h-[calc(100vh-5rem)] max-w-5xl space-y-6">
      {/* Top Breadcrumb & User Credits Bar with Clean Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl border border-border bg-card/90 dark:bg-card/70 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-2.5 text-xs font-mono flex-wrap">
          {/* Dedicated Back to Repositories button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/dashboard/${sessionUsername || username}`)}
            className="h-8 text-xs font-mono font-medium gap-1.5 rounded-xl border-border/80 hover:border-emerald-500/40 hover:bg-muted/70 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-emerald-500" />
            <span>Repositories</span>
          </Button>

          <span className="text-muted-foreground/30 font-light">/</span>

          {/* User breadcrumb */}
          <Link
            href={`/dashboard/${sessionUsername || username}`}
            className="text-muted-foreground hover:text-foreground font-mono text-xs transition-colors"
          >
            @{username}
          </Link>

          <span className="text-muted-foreground/30 font-light">/</span>

          {/* Repo Switcher Dropdown & Info */}
          <div className="flex items-center gap-1.5">
            {userRepos.length > 0 ? (
              <Select
                value={String(repo)}
                onValueChange={(selectedRepo) => {
                  if (selectedRepo && selectedRepo !== repo) {
                    router.push(`/dashboard/${sessionUsername || username}/${selectedRepo}`);
                  }
                }}
              >
                <SelectTrigger className="h-8 text-xs font-mono font-bold bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 px-2.5 rounded-xl hover:bg-emerald-500/15 transition-all">
                  <FolderGit2 className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                  <SelectValue placeholder={repo} />
                </SelectTrigger>
                <SelectContent className="max-h-64 font-mono text-xs">
                  {userRepos.map((rName) => (
                    <SelectItem key={rName} value={rName} className="cursor-pointer">
                      <div className="flex items-center gap-2">
                        <FolderGit2 className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className={rName === repo ? "font-bold text-emerald-500" : ""}>{rName}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs font-mono">
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>{repo}</span>
              </div>
            )}

            <Badge variant="outline" className="text-[10px] font-mono px-2 py-0.5 border-border bg-muted/40 text-muted-foreground hidden sm:inline-flex items-center gap-1">
              <GitBranch className="w-3 h-3 text-emerald-500" />
              <span>main</span>
            </Badge>

            <a
              href={`https://github.com/${username}/${repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg border border-border/80 hover:border-emerald-500/50 hover:bg-muted/60 text-muted-foreground hover:text-emerald-500 transition-all inline-flex items-center"
              title="Open repository on GitHub"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium">
            <Coins className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            <span>
              {isLoadingCredits ? "..." : credits !== null ? `${credits} Credits` : "Checking..."}
            </span>
          </div>

          <Link href="/pricing" target="_blank">
            <Button
              variant="outline"
              size="sm"
              className="text-xs font-mono h-8 rounded-xl border-border hover:border-emerald-500/50 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all cursor-pointer px-3"
            >
              <Zap className="w-3 h-3 mr-1 text-emerald-500 dark:text-emerald-400" />
              Get More
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Grid: Disclaimer + Mode Dispatch Controller */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Disclaimer & Estimation */}
        <div className="lg:col-span-4 space-y-4">
          <div
            ref={disclaimerRef}
            className={cn(
              "rounded-2xl border p-5 shadow-sm space-y-4 transition-all duration-300",
              highlightDisclaimer
                ? "ring-2 ring-amber-500 border-amber-500 bg-amber-500/10 dark:bg-amber-950/30"
                : know
                ? "border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-950/15"
                : "border-border bg-card"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-border">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "p-1.5 rounded-lg border",
                    know
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                      : "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30"
                  )}
                >
                  {know ? <ShieldCheck className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                </div>
                <div>
                  <h2 className="text-sm font-bold text-foreground">Disclaimer & Liability</h2>
                  <p className="text-[10px] text-muted-foreground font-mono">Usage Terms & Release</p>
                </div>
              </div>

              <Badge
                variant="outline"
                className={cn(
                  "text-[10px] font-mono px-1.5 py-0",
                  know
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                    : "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30"
                )}
              >
                {know ? "Agreed" : "Required"}
              </Badge>
            </div>

            {/* Protocol points */}
            <div className="space-y-2.5 text-xs text-foreground/80 dark:text-slate-300 leading-relaxed">
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 text-xs">
                <p className="font-semibold flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 shrink-0 text-amber-600 dark:text-amber-400" /> Limitation of Liability
                </p>
                <p className="text-[11px] mt-0.5 opacity-90 leading-normal">
                  SyntheticPush is provided &ldquo;as is&rdquo;. We are not responsible or liable for any account restrictions, rate limits, data loss, repository damages, or any other consequences resulting from the use of this service.
                </p>
              </div>

              <ul className="space-y-2 text-xs">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground">User responsibility:</strong> You are solely responsible for complying with GitHub terms and managing your repository history.
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground">Safe sync:</strong> Commits are safely appended to <code>SyntheticPush.json</code> without touching existing source code.
                  </span>
                </li>
              </ul>
            </div>

            {/* Acknowledge Button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setKnow((prev) => !prev)}
                className={cn(
                  "w-full py-2.5 px-3 rounded-xl font-medium text-xs font-mono transition-all duration-150 cursor-pointer flex items-center justify-between gap-2 border",
                  know
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/25"
                    : "bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold border-amber-400"
                )}
              >
                <div className="flex items-center gap-1.5">
                  {know ? (
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  ) : (
                    <Unlock className="w-3.5 h-3.5 text-slate-950 shrink-0" />
                  )}
                  <span>{know ? "Liability Terms Acknowledged" : "I Agree & Accept Responsibility"}</span>
                </div>
                <span className="text-[10px] opacity-80">{know ? "Change" : "Click here"}</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Summary Card */}
          <div className="rounded-2xl border border-border bg-muted/30 dark:bg-muted/10 p-4 space-y-3">
            <h3 className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
              Dispatch Estimation
            </h3>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-card border border-border/70">
                <span className="text-[10px] text-muted-foreground font-mono">Commits</span>
                <p className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">{totalCommits}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-card border border-border/70">
                <span className="text-[10px] text-muted-foreground font-mono">Active Days</span>
                <p className="text-base font-bold font-mono text-foreground">{activeDays}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-card border border-border/70">
                <span className="text-[10px] text-muted-foreground font-mono flex items-center justify-between">
                  <span>Cost</span>
                  <span className="text-[9px] text-emerald-500 font-semibold">1 cr = 3 commits</span>
                </span>
                <p className="text-base font-bold font-mono text-amber-600 dark:text-amber-400">
                  {requiredCredits} Credits <span className="text-xs text-muted-foreground font-normal">(₹{requiredCredits})</span>
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-card border border-border/70">
                <span className="text-[10px] text-muted-foreground font-mono">Balance After</span>
                <p
                  className={cn(
                    "text-base font-bold font-mono",
                    balanceAfter !== null && balanceAfter < 0 ? "text-red-500 dark:text-red-400" : "text-foreground"
                  )}
                >
                  {balanceAfter !== null ? balanceAfter : "—"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Mode Selector & Dispatch Canvas Controller */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-5 shadow-sm">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border">
              <div>
                <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <GitCommit className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                  Dispatch Controller
                </h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Configure synthetic commit density, timelines, shapes, or custom painted patterns.
                </p>
              </div>
              <Badge variant="outline" className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
                branch: main
              </Badge>
            </div>

            {/* Mode Selector Cards */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
                Select Mode
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {MODES.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = mode === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setMode(opt.id)}
                      className={cn(
                        "p-3 rounded-xl text-left border transition-all duration-150 cursor-pointer flex flex-col justify-between space-y-2",
                        isSelected
                          ? "border-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/10 ring-1 ring-emerald-500/40"
                          : "border-border bg-card hover:bg-muted/50 hover:border-border"
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div
                          className={cn(
                            "p-1.5 rounded-lg border",
                            isSelected
                              ? "bg-emerald-500 text-white border-emerald-400"
                              : "bg-muted text-muted-foreground border-border/60"
                          )}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <Badge
                          variant="secondary"
                          className={cn(
                            "text-[10px] font-mono font-medium px-1.5 py-0",
                            isSelected
                              ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-500/30"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {opt.credits} {typeof opt.credits === "number" ? (opt.credits === 1 ? "Credit" : "Credits") : "Credits"}
                        </Badge>
                      </div>

                      <div>
                        <h4 className={cn("text-xs font-bold", isSelected ? "text-emerald-600 dark:text-emerald-400" : "text-foreground")}>
                          {opt.title}
                        </h4>
                        <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug line-clamp-2">
                          {opt.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mode-Specific Settings Bar */}
            <div className="p-4 rounded-xl bg-muted/40 dark:bg-muted/15 border border-border space-y-3">
              {/* Single Date Controls */}
              {mode === "single" && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> Presets
                    </label>
                    <div className="flex flex-wrap gap-1">
                      {[
                        { label: "Yesterday", date: subDays(new Date(), 1) },
                        { label: "3 Days Ago", date: subDays(new Date(), 3) },
                        { label: "1 Week Ago", date: subDays(new Date(), 7) },
                        { label: "1 Month Ago", date: subMonths(new Date(), 1) },
                        { label: "3 Months Ago", date: subMonths(new Date(), 3) },
                        { label: "6 Months Ago", date: subMonths(new Date(), 6) },
                        { label: "1 Year Ago", date: subYears(new Date(), 1) },
                      ].map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => setSingleDate(preset.date)}
                          className={cn(
                            "px-2 py-0.5 rounded text-xs font-mono font-medium transition-all cursor-pointer border",
                            singleDate && format(singleDate, "yyyy-MM-dd") === format(preset.date, "yyyy-MM-dd")
                              ? "bg-emerald-500 text-white border-emerald-400"
                              : "bg-card border-border text-foreground hover:text-emerald-500 hover:bg-muted"
                          )}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                    <div className="space-y-1">
                      <label className="text-xs font-mono font-bold text-muted-foreground">Target Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between text-left font-normal border-border bg-card h-9"
                          >
                            <div className="flex items-center gap-1.5">
                              <CalendarIcon className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
                              <span className="font-mono text-xs font-medium text-foreground">
                                {singleDate ? format(singleDate, "PPP") : "Pick a date"}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-muted-foreground">
                              {singleDate ? format(singleDate, "yyyy") : ""}
                            </span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={singleDate}
                            onSelect={(d) => d && setSingleDate(d)}
                            disabled={(date) => date > new Date() || date < new Date("2020-01-01")}
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono font-bold text-muted-foreground">Intensity (Shade)</label>
                      <Select value={String(shade)} onValueChange={(v) => setShade(Number(v))}>
                        <SelectTrigger className="w-full bg-card h-9 text-xs">
                          <SelectValue placeholder="Select shade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Level 1 (Light • 1 commit)</SelectItem>
                          <SelectItem value="2">Level 2 (Medium • 3 commits)</SelectItem>
                          <SelectItem value="3">Level 3 (Deep • 6 commits)</SelectItem>
                          <SelectItem value="4">Level 4 (Emerald • 10 commits)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Date Range Controls */}
              {mode === "range" && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> Presets
                    </label>
                    <div className="flex flex-wrap gap-1">
                      {[
                        { label: "Last 7 Days", start: subDays(new Date(), 7), end: new Date() },
                        { label: "Last 14 Days", start: subDays(new Date(), 14), end: new Date() },
                        { label: "Last 30 Days", start: subDays(new Date(), 30), end: new Date() },
                        { label: "Last 60 Days", start: subDays(new Date(), 60), end: new Date() },
                        { label: "Last 90 Days", start: subDays(new Date(), 90), end: new Date() },
                        { label: "Last 6 Months", start: subMonths(new Date(), 6), end: new Date() },
                        { label: "Q1 Jan-Mar", start: new Date(2024, 0, 1), end: new Date(2024, 2, 31) },
                        { label: "Q2 Apr-Jun", start: new Date(2024, 3, 1), end: new Date(2024, 5, 30) },
                        { label: "Q3 Jul-Sep", start: new Date(2024, 6, 1), end: new Date(2024, 8, 30) },
                        { label: "Q4 Oct-Dec", start: new Date(2024, 9, 1), end: new Date(2024, 11, 31) },
                      ].map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => {
                            setStartDate(preset.start);
                            setEndDate(preset.end);
                          }}
                          className="px-2 py-0.5 rounded text-xs font-mono font-medium transition-all cursor-pointer border bg-card border-border text-foreground hover:text-emerald-500 hover:bg-muted"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                    <div className="space-y-1">
                      <label className="text-xs font-mono font-bold text-muted-foreground">Start Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between text-left font-normal border-border bg-card h-9 text-xs"
                          >
                            <span className="font-mono">{startDate ? format(startDate, "PP") : "Start"}</span>
                            <CalendarIcon className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={(d) => d && setStartDate(d)}
                            disabled={(date) => date > new Date() || date < new Date("2020-01-01")}
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono font-bold text-muted-foreground">End Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between text-left font-normal border-border bg-card h-9 text-xs"
                          >
                            <span className="font-mono">{endDate ? format(endDate, "PP") : "End"}</span>
                            <CalendarIcon className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={(d) => d && setEndDate(d)}
                            disabled={(date) => date > new Date() || (startDate && date < startDate)}
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono font-bold text-muted-foreground">Intensity</label>
                      <Select value={String(shade)} onValueChange={(v) => setShade(Number(v))}>
                        <SelectTrigger className="w-full bg-card h-9 text-xs">
                          <SelectValue placeholder="Intensity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Level 1 (Light)</SelectItem>
                          <SelectItem value="2">Level 2 (Medium)</SelectItem>
                          <SelectItem value="3">Level 3 (Deep)</SelectItem>
                          <SelectItem value="4">Level 4 (Emerald)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Year (Realistic or Streak) Controls */}
              {(mode === "year_realistic" || mode === "year_streak") && (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="space-y-1">
                      <label className="text-xs font-mono font-bold text-muted-foreground">Target Year</label>
                      <Select
                        value={String(targetYear)}
                        onValueChange={(v) => setTargetYear(Number(v))}
                      >
                        <SelectTrigger className="w-28 bg-card font-semibold h-8 text-xs">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {AVAILABLE_YEARS.map((yr) => (
                            <SelectItem key={yr} value={String(yr)}>
                              {yr}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {mode === "year_realistic" && (
                      <div className="pt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSeedOffset((s) => s + 1)}
                          className="h-8 text-xs font-mono cursor-pointer flex items-center gap-1 bg-card hover:border-emerald-500/50"
                        >
                          <RotateCcw className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
                          <span>Shuffle</span>
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                    <span>
                      {mode === "year_realistic"
                        ? "Weekday bias with realistic rest intervals."
                        : "Fills 364 consecutive days."}
                    </span>
                  </div>
                </div>
              )}

              {/* Pattern Controls */}
              {mode === "pattern" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-muted-foreground">Shape</label>
                    <Select value={pattern} onValueChange={(v) => setPattern(v as PresetPattern)}>
                      <SelectTrigger className="w-full bg-card h-9 text-xs font-medium">
                        <SelectValue placeholder="Shape" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="heart">Pixel Heart</SelectItem>
                        <SelectItem value="wave">Sine Wave</SelectItem>
                        <SelectItem value="matrix">Matrix Diagonal</SelectItem>
                        <SelectItem value="hi">Word &apos;HI&apos;</SelectItem>
                        <SelectItem value="invader">Space Invader</SelectItem>
                        <SelectItem value="star">Shooting Star</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-muted-foreground">Year</label>
                    <Select
                      value={String(targetYear)}
                      onValueChange={(v) => setTargetYear(Number(v))}
                    >
                      <SelectTrigger className="w-full bg-card h-9 text-xs font-medium">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {AVAILABLE_YEARS.map((yr) => (
                          <SelectItem key={yr} value={String(yr)}>
                            {yr}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-muted-foreground">Shade Level</label>
                    <Select value={String(shade)} onValueChange={(v) => setShade(Number(v))}>
                      <SelectTrigger className="w-full bg-card h-9 text-xs font-medium">
                        <SelectValue placeholder="Shade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Level 1 (Light)</SelectItem>
                        <SelectItem value="2">Level 2 (Medium)</SelectItem>
                        <SelectItem value="3">Level 3 (Deep)</SelectItem>
                        <SelectItem value="4">Level 4 (Emerald)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Custom Paint Controls */}
              {mode === "custom" && (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-muted-foreground">Brush:</span>
                    <button
                      type="button"
                      onClick={() => setBrushShade(0)}
                      className={cn(
                        "px-2 py-1 rounded border text-xs font-mono flex items-center gap-1 cursor-pointer transition-all",
                        brushShade === 0
                          ? "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30"
                          : "bg-card text-muted-foreground border-border hover:bg-muted"
                      )}
                    >
                      <Eraser className="w-3 h-3" /> Eraser
                    </button>

                    {[1, 2, 3, 4].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setBrushShade(lvl)}
                        className={cn(
                          "w-6 h-6 rounded border transition-all cursor-pointer flex items-center justify-center text-[10px] font-mono font-bold",
                          LEVEL_CLASSES[lvl],
                          brushShade === lvl ? "ring-2 ring-emerald-500 dark:ring-emerald-400" : "opacity-80 hover:opacity-100"
                        )}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <Select
                      value={String(targetYear)}
                      onValueChange={(v) => setTargetYear(Number(v))}
                    >
                      <SelectTrigger className="w-24 h-7 text-xs bg-card font-medium">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {AVAILABLE_YEARS.map((yr) => (
                          <SelectItem key={yr} value={String(yr)}>
                            {yr}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCustomGrid(new Array(TOTAL_CELLS).fill(0))}
                      className="h-7 text-xs font-mono cursor-pointer bg-card px-2"
                    >
                      Clear
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCustomGrid((prev) =>
                          prev.map(() => (Math.random() > 0.65 ? Math.floor(Math.random() * 4) + 1 : 0))
                        );
                      }}
                      className="h-7 text-xs font-mono cursor-pointer bg-card px-2"
                    >
                      Randomize
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Live Interactive Heatmap Preview Canvas */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono font-semibold text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Grid className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                  Simulation ({mode === "single" && singleDate ? singleDate.getFullYear() : targetYear})
                </span>
                <span className="text-foreground">{activeDays} active days • {totalCommits} commits</span>
              </div>

              <div
                className="relative overflow-x-auto pb-2.5 pt-2 select-none border border-border rounded-xl bg-card/60 dark:bg-slate-950/40 p-3 shadow-xs"
                onMouseDown={() => setIsMouseDown(true)}
              >
                {/* Months Header */}
                <div className="flex justify-between text-[11px] font-mono text-muted-foreground mb-1.5 px-4 min-w-[720px]">
                  {MONTH_NAMES.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>

                {/* Heatmap 52 Weeks x 7 Days Grid */}
                <div className="flex gap-[3px] justify-center min-w-[720px] p-1.5 bg-muted/20 rounded-lg border border-border/60">
                  {Array.from({ length: WEEKS }).map((_, weekIdx) => (
                    <div key={weekIdx} className="flex flex-col gap-[3px]">
                      {Array.from({ length: DAYS }).map((_, dayIdx) => {
                        const cellIndex = weekIdx * DAYS + dayIdx;
                        const level = activeGrid[cellIndex] || 0;

                        return (
                          <div
                            key={dayIdx}
                            onClick={() => handleCellPaint(cellIndex)}
                            onMouseEnter={() => handleCellHover(cellIndex, weekIdx, dayIdx)}
                            className={cn(
                              "w-[11px] h-[11px] rounded-[2px] border cursor-pointer transition-all duration-100 hover:scale-125 hover:z-20",
                              LEVEL_CLASSES[level]
                            )}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Footer Legend & Hover Tooltip */}
                <div className="flex flex-wrap items-center justify-between text-xs text-muted-foreground mt-2.5 px-1">
                  <div className="font-mono text-[11px]">
                    {hoveredCell ? (
                      <span>
                        <strong className="text-foreground font-semibold">{hoveredCell.date}:</strong>{" "}
                        {hoveredCell.level === 0 ? "0 commits" : `${hoveredCell.level * 3} commits`}
                      </span>
                    ) : (
                      <span className="text-muted-foreground italic">
                        {mode === "custom"
                          ? "Click or drag to paint on grid."
                          : "Hover over any square to preview details."}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-[11px]">
                    <span>Less</span>
                    {LEVEL_CLASSES.map((cls, idx) => (
                      <span key={idx} className={cn("w-2.5 h-2.5 rounded-[2px] border inline-block", cls)} />
                    ))}
                    <span>More</span>
                  </div>
                </div>
              </div>
            </div>

            {/* In-Flight Transmission Progress HUD & Live Percentage Bar */}
            {isDispatching && (
              <div className="p-4 rounded-xl border border-emerald-500/80 bg-slate-950 text-white space-y-3 shadow-lg">
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                      Git Transmission In Progress
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-mono text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{elapsedSeconds}s</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-amber-500/15 border border-amber-400/40 text-amber-200 text-xs flex items-center gap-2 font-mono">
                  <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>
                    Do not reload or close tab. Dispatching commits to GitHub...
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                      {dispatchStage}
                    </span>
                    <span className="font-bold text-emerald-400">
                      {Math.min(100, Math.floor(progressPercent))}%
                    </span>
                  </div>

                  <div className="w-full h-2.5 rounded-full bg-slate-900 border border-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-400 transition-all duration-200"
                      style={{ width: `${Math.min(100, Math.max(5, progressPercent))}%` }}
                    />
                  </div>
                </div>

                <div className="p-2 rounded bg-black/70 border border-white/5 font-mono text-[10px] text-emerald-400 space-y-0.5 max-h-20 overflow-hidden">
                  {dispatchLogs.slice(-2).map((log, i) => (
                    <p key={i} className="truncate opacity-90">
                      {log}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Credit Notice & Final Dispatch Button */}
            <div className="pt-1 space-y-3">
              {/* Insufficient Credit Warning */}
              {credits !== null && credits < requiredCredits && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-500/30 text-red-900 dark:text-red-300 text-xs flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>
                      Requires <strong>{requiredCredits} credits / ₹{requiredCredits}</strong> (you have {credits} credits). Rate: 1 credit = 3 commits.
                    </span>
                  </div>
                  <Link href="/pricing" target="_blank">
                    <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white font-mono text-xs rounded-lg h-7 px-2.5 font-semibold">
                      Top Up (₹{requiredCredits - credits} needed) <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              )}

              {/* Main Submit Button - Clean and Proportional */}
              {!know ? (
                <button
                  type="button"
                  onClick={triggerDisclaimerHint}
                  className="w-full py-3.5 rounded-xl font-bold font-mono text-xs sm:text-sm transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 border bg-amber-500/10 dark:bg-amber-500/10 border-amber-500/50 text-amber-800 dark:text-amber-300 hover:bg-amber-500/20"
                >
                  <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Acknowledge Disclaimer on Left to Unlock</span>
                  <Badge variant="outline" className="text-[10px] font-mono border-amber-500/40 text-amber-700 dark:text-amber-300">
                    Required
                  </Badge>
                </button>
              ) : credits !== null && credits < requiredCredits ? (
                <Link href="/pricing" target="_blank" className="block w-full">
                  <Button
                    type="button"
                    className="w-full py-4 rounded-xl font-bold font-mono text-xs sm:text-sm bg-red-500/15 border border-red-500/40 text-red-700 dark:text-red-300 hover:bg-red-500/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Zap className="w-4 h-4 text-red-500" />
                    <span>Insufficient Credits ({credits}/{requiredCredits}) — Top Up ₹{requiredCredits - credits}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                  </Button>
                </Link>
              ) : (
                <Button
                  type="button"
                  onClick={handleDispatch}
                  disabled={isDispatching}
                  className="w-full py-4 rounded-xl font-bold font-mono text-xs sm:text-sm transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                >
                  {isDispatching ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting ({Math.floor(progressPercent)}%)...</span>
                    </>
                  ) : (
                    <>
                      <GitCommit className="w-4 h-4" />
                      <span>
                        Dispatch Synthetic Push ({requiredCredits} {requiredCredits === 1 ? "Credit" : "Credits"} • ₹{requiredCredits})
                      </span>
                    </>
                  )}
                </Button>
              )}

              <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-muted-foreground">
                <ShieldCheck className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
                <span>Zero-storage OAuth token guarantee • Signed by @{username}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation & Context Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl border border-border bg-card/60 backdrop-blur-md">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push(`/dashboard/${sessionUsername || username}`)}
          className="text-xs font-mono text-muted-foreground hover:text-foreground cursor-pointer gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-emerald-500" />
          <span>Return to Repositories Dashboard</span>
        </Button>
        <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
          <span>Targeting: <strong className="text-foreground">{username}/{repo}</strong></span>
          <span>•</span>
          <span>Branch: <strong className="text-foreground">main</strong></span>
        </div>
      </div>
    </div>
  );
}
