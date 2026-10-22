// src/app/features/page.tsx
import React from "react";
import {
  GitCommit,
  CreditCard,
  Zap,
  BarChart3,
  Calendar,
  Sparkles,
  ArrowRight,
  Terminal,
  Cpu,
  Lock
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform Features",
  description: "Explore the powerful Git simulation, backdating engine, and automated contribution features of SyntheticPush.",
};

const Features = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-github opacity-50 pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden text-center">
        <div className="container mx-auto px-4 relative z-10 max-w-3xl space-y-6">
          <Badge
            variant="outline"
            className="px-3.5 py-1 text-xs font-mono rounded-full border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
          >
            <Zap className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
            Capabilities & Architecture
          </Badge>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
            Everything Built for <br />
            <span className="text-gradient-emerald">Maximum Control</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From precision historical backdating to automated streak preservation, explore the full suite of Git workflow tools.
          </p>
        </div>
      </section>

      {/* Main Features Bento Grid */}
      <section className="py-12 bg-muted/20 border-y border-border/60">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard
              icon={<GitCommit className="w-6 h-6 text-emerald-400" />}
              badge="Core Engine"
              title="Timestamp Precision Commits"
              description="Target any exact historical date, time, and timezone. SyntheticPush constructs legitimate Git tree objects and dispatches them straight to your repository."
            />
            <FeatureCard
              icon={<Lock className="w-6 h-6 text-emerald-400" />}
              badge="Security"
              title="Zero-Knowledge Secret Management"
              description="No database storage of GitHub personal access tokens. Authentication is session-scoped and strictly scoped to repository push permissions."
            />
            <FeatureCard
              icon={<CreditCard className="w-6 h-6 text-emerald-400" />}
              badge="Fair Pricing"
              title="Predictable Credits System"
              description="No sneaky recurring subscriptions. 1 credit = 3 commits (₹1 = 1 credit). Transparent, anti-abuse pricing with 3 free credits on signup."
            />
            <FeatureCard
              icon={<Terminal className="w-6 h-6 text-emerald-400" />}
              badge="Developer Experience"
              title="Lightweight & Non-Destructive"
              description="Commits are appended cleanly to dedicated or existing branches without interfering with your production commits or merge trees."
            />
          </div>
        </div>
      </section>

      {/* Upcoming Feature Pipeline */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14 space-y-3">
            <Badge variant="outline" className="font-mono text-xs text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              Product Roadmap
            </Badge>
            <h2 className="heading">Upcoming Milestones</h2>
            <p className="caption text-base">Features currently in active development for the next release.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <UpcomingFeature
              icon={<Calendar className="w-6 h-6 text-emerald-400" />}
              title="Batch Date Range Selector"
              description="Select multi-month spans or entire quarters and generate randomized commit curves in one click."
            />
            <UpcomingFeature
              icon={<BarChart3 className="w-6 h-6 text-emerald-400" />}
              title="Streak Analytics HUD"
              description="Detailed heatmap insights, commit density charts, and streak preservation reminders."
            />
            <UpcomingFeature
              icon={<Cpu className="w-6 h-6 text-emerald-400" />}
              title="Pixel Art Generator"
              description="Upload 7x52 pixel art or text and auto-generate the exact commit coordinate payload."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border/80 bg-muted/30">
        <div className="container mx-auto px-4 text-center max-w-2xl space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to take command of your graph?</h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Connect your GitHub account in seconds. 3 free credits waiting on your dashboard.
          </p>
          <Link href="/">
            <Button size="lg" className="rounded-xl font-bold px-8 py-6 text-base shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95 bg-emerald-500 hover:bg-emerald-600 text-white transition-all cursor-pointer inline-flex items-center gap-2">
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({
  icon,
  badge,
  title,
  description,
}: {
  icon: React.ReactNode;
  badge: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-card/70 border border-border/80 rounded-2xl p-7 hover:border-emerald-500/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl bg-muted/80 dark:bg-white/5 border border-border/70 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <span className="text-xs font-mono font-medium text-muted-foreground px-2.5 py-1 rounded-full bg-muted/50 border border-border/60">
          {badge}
        </span>
      </div>
      <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-emerald-400 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
};

const UpcomingFeature = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-start p-6 bg-card/60 border border-border/80 rounded-2xl shadow-sm hover:border-emerald-500/30 transition-all">
      <div className="p-3 bg-emerald-500/10 rounded-xl mb-4 text-emerald-400 ring-1 ring-emerald-500/20">
        {icon}
      </div>
      <h4 className="font-bold text-base mb-2 text-foreground">{title}</h4>
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

export default Features;