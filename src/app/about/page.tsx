// src/app/about/page.tsx
import React from "react";
import {
  GitCommit,
  CalendarDays,
  ShieldCheck,
  Heart,
  Github,
  Sparkles,
  ArrowRight,
  Cpu
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about SyntheticPush, our mission, and how we help developers manage their GitHub contribution history.",
};

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-github opacity-50 pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden text-center">
        <div className="container mx-auto px-4 relative z-10 max-w-3xl space-y-6">
          <Badge
            variant="outline"
            className="px-3.5 py-1 text-xs font-mono rounded-full border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Engineering Story
          </Badge>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
            About <span className="text-gradient-emerald">SyntheticPush</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Built for engineers and creators who value aesthetic perfection in their GitHub profile, test contribution graph algorithms, and desire total control over their commit timeline.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link href="/">
              <Button size="lg" className="rounded-xl bg-emerald-500 hover:bg-emerald-600 font-semibold px-6 py-5 text-white shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all">
                <span>Try It Live</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
            <Link href="https://github.com/satendra03/SyntheticPush" target="_blank">
              <Button variant="outline" size="lg" className="rounded-xl border-border/80 bg-card/60 backdrop-blur-md hover:bg-muted font-medium px-6 py-5 text-foreground transition-all">
                <Github className="w-4 h-4 mr-2 text-foreground" />
                <span>View on GitHub</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why SyntheticPush Bento Grid */}
      <section className="py-16 bg-muted/20 border-y border-border/60">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="heading">Why Developers Choose SyntheticPush</h2>
            <p className="caption text-base">Engineered to make Git activity management frictionless and dependable.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<CalendarDays className="w-6 h-6 text-emerald-400" />}
              title="Missed a Sunday?"
              description="Fill in accidental gaps in your timeline in seconds without touching complex git rebases."
            />
            <FeatureCard
              icon={<GitCommit className="w-6 h-6 text-emerald-400" />}
              title="Time Travel Engine"
              description="Generate backdated commits targeting historical milestones or offline local work."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-6 h-6 text-emerald-400" />}
              title="Zero-Storage OAuth"
              description="We never store your personal access tokens or GitHub keys. Everything is stateless and isolated."
            />
            <FeatureCard
              icon={<Cpu className="w-6 h-6 text-emerald-400" />}
              title="Webhook & UI Testing"
              description="Perfect for testing custom contribution graph widgets, GitHub API parsers, and bots."
            />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="bg-card/70 border border-border/80 rounded-3xl p-8 md:p-14 shadow-xl backdrop-blur-xl relative overflow-hidden">
            <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
              <Heart className="w-7 h-7 fill-emerald-400/20" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Philosophy</h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              We believe in transparency, developer productivity, and giving engineers complete command over their developer artifacts. Whether you&apos;re an open-source maintainer syncing enterprise work, an educator demonstrating Git internals, or someone polishing their portfolio, SyntheticPush is crafted for you.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="bg-card/60 border border-border/80 rounded-2xl p-6 hover:border-emerald-500/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <div className="p-3 rounded-xl bg-muted/80 dark:bg-white/5 w-fit mb-4 border border-border/70 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-emerald-400 transition-colors">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

export default About;