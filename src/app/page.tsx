// src/app/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Features,
  Problems,
  Solutions,
  Testimonials,
  Pricing,
  HeroVideo,
  InteractiveGraphSandbox,
} from "@/app/components";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  ArrowRight,
  GitBranch,
} from "lucide-react";
import { GitHubIcon } from "@/icons";
import Link from "next/link";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const [clicked, setClicked] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("github");
    } catch (error) {
      console.error("Sign in failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDashboardNavigation = async () => {
    setIsLoading(true);
    if (session?.user?.username) {
      await router.push(`/dashboard/${session.user.username}`);
    }
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* GitHub Grid Background & Ambient Lighting */}
      <div className="absolute inset-0 bg-grid-github pointer-events-none opacity-60 -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[500px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="container pt-12 md:pt-20 pb-12 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>GitHub Commit Engine v2.0 • 3 Free Credits on Signup</span>
          </div>

          {/* Main Title */}
          <h1 className="bold-heading tracking-tight leading-[1.1] text-foreground">
            Simulate GitHub commit activity graph with{" "}
            <span className="text-gradient-emerald">
              precision
            </span>
            .
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Turn empty squares into an undeniable emerald streak. Designed for developers testing heatmaps, recovering lost streaks, and mastering Git history.
          </p>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            {session ? (
              <Button
                onClick={handleDashboardNavigation}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl px-7 py-6 text-base shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Launch Dashboard ({session.user?.username})</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSignIn}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl px-7 py-6 text-base shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2.5"
              >
                <GitHubIcon className="w-5 h-5 fill-white" />
                <span>{isLoading ? "Connecting GitHub..." : "Sign in with GitHub (Free 3 Credits)"}</span>
              </Button>
            )}

            <Link
              href="https://github.com/satendra03/SyntheticPush"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="rounded-xl px-6 py-6 text-sm font-medium border-border/80 bg-card/60 backdrop-blur-md hover:bg-muted text-foreground transition-all flex items-center gap-2"
              >
                <GitBranch className="w-4 h-4 text-emerald-400" />
                <span>View Source on GitHub</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Interactive Contribution Sandbox Canvas */}
        <div className="mt-12 lg:mt-16">
          <InteractiveGraphSandbox />
        </div>
      </section>

      {/* GitHub Platform Stats Ribbon */}
      <section className="border-y border-border/60 bg-muted/20 backdrop-blur-md py-8 my-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">100,000+</div>
              <p className="text-xs text-muted-foreground font-mono">Commits Simulated</p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-foreground">365 Days</div>
              <p className="text-xs text-muted-foreground font-mono">Streak Support</p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">0 Tokens Stored</div>
              <p className="text-xs text-muted-foreground font-mono">Zero-Storage OAuth</p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-foreground">100% Free Start</div>
              <p className="text-xs text-muted-foreground font-mono">3 Credits on Signup</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Bento Grid */}
      <section id="problem" className="container section">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="outline" className="font-mono text-xs text-red-400 border-red-500/30 bg-red-500/10">
            Issue #404: Blank Grid Anxiety
          </Badge>
          <h2 className="heading">The Contribution Graph Dilemma</h2>
          <p className="caption text-base">
            If your graph needs love, we&rsquo;ve got <span className="text-emerald-400 font-semibold">green</span> for that.
          </p>
        </div>
        <Problems />
      </section>

      {/* Solution Section */}
      <section id="solution" className="container section">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="outline" className="font-mono text-xs text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
            Pull Request: Automated Pipeline
          </Badge>
          <h2 className="heading">How SyntheticPush Works</h2>
          <p className="caption text-base">
            This won&rsquo;t replace hard work, but it does replace an <span className="text-emerald-400 font-semibold">empty box</span>.
          </p>
        </div>
        <Solutions />
      </section>

      {/* Features Section */}
      <section id="features" className="container section">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="outline" className="font-mono text-xs text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
            Architecture Highlights
          </Badge>
          <h2 className="heading">Engineered for Git Power Users</h2>
          <p className="caption text-base">
            We generate the commits, you get the <span className="text-emerald-400 font-semibold">glory</span>.
          </p>
        </div>
        <Features />
      </section>

      {/* Video Demo Showcase */}
      <section className="container section">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-8">
          <Badge variant="outline" className="font-mono text-xs text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
            Live Demonstration
          </Badge>
          <h2 className="heading">See SyntheticPush in Action</h2>
          <p className="caption text-base">Watch the step-by-step walkthrough of backdating commits in under 60 seconds.</p>
        </div>
        <div className="max-w-4xl mx-auto p-3 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xl shadow-2xl">
          <HeroVideo />
        </div>
      </section>

      {/* Pricing Matrix */}
      <section id="pricing" className="container section">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="outline" className="font-mono text-xs text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
            Transparent Pricing
          </Badge>
          <h2 className="heading">Simple, Honest Credits</h2>
          <Link
            href="https://c.tenor.com/-7ON2Lqx030AAAAd/tenor.gif"
            target="_blank"
            className="text-emerald-400 cursor-pointer hover:underline text-sm font-mono inline-block pt-1"
            onClick={() => setClicked(true)}
          >
            {clicked ? "Yepp! That's reality! 😭" : "Because we're nice (No monthly subscriptions)."}
          </Link>
        </div>
        <Pricing />
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section">
        <div className="container text-center max-w-2xl mx-auto mb-8 space-y-3">
          <Badge variant="outline" className="font-mono text-xs text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
            Developer Community
          </Badge>
          <h2 className="heading">Loved by Open Source Devs</h2>
          <p className="caption text-base">
            We could hype ourselves up — but we&rsquo;ll let the <span className="text-emerald-400 font-semibold">devs</span> do it instead.
          </p>
        </div>
        <Testimonials />
      </section>

      {/* Final Call To Action Banner */}
      <section className="container my-20 lg:my-32">
        <div className="relative rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/30 to-card p-8 md:p-14 text-center overflow-hidden shadow-2xl glow-emerald">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
              Ready to turn your GitHub graph emerald green?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Join thousands of developers maintaining active contribution streaks. Sign up in 5 seconds with 3 free credits.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                onClick={session ? handleDashboardNavigation : handleSignIn}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl px-8 py-6 text-base shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                {session ? "Open Your Dashboard" : "Get Started Free (3 Credits)"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
