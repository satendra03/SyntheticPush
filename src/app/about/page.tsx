// src/app/about/page.tsx

import React from "react";
import {
  GitCommit,
  CalendarDays,
  ShieldCheck,
  Smile,
  Heart,
  Github
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          {/* <Badge
              variant="secondary"
              className="inline-flex items-center justify-center gap-2 p-2 mb-6 rounded-full bg-muted/50 backdrop-blur-sm border border-foreground/20 hover:bg-muted/80 transition-colors "
            >
            <span className="text-sm font-medium"></span>
            </Badge> */}


          <Badge
            variant="secondary"
            className="mb-6 px-4 py-1 text-sm rounded-full backdrop-blur-sm border-foreground/10 bg-foreground/10"
          >
            <Github className="w-3 h-3 mr-2 text-foreground" />
            Free (Sometime)
          </Badge>

          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            About SyntheticPush
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Built for developers who want to keep their GitHub graph green,
            or just have a little fun with their commit history.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/">
              <Button size="lg" className="rounded-full bg-green-500 hover:bg-green-600 font-semibold active:scale-95 transition-all duration-300 hover:scale-105">
                Try it now
              </Button>
            </Link>
            <Link href="https://github.com/satendra03/SyntheticPush" target="_blank">
              <Button variant="outline" size="lg" className="rounded-full bg-foreground/20 hover:bg-foreground/30 dark:bg-foreground/20 dark:hover:bg-foreground/30 hover:shadow-lg font-semibold active:scale-95 transition-all duration-300 hover:scale-105">
                View on GitHub
              </Button>
            </Link>
          </div>
        </div>

        {/* Background gradient blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl -z-10" />
      </section>

      {/* Why SyntheticPush Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why SyntheticPush?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<CalendarDays className="w-8 h-8" />}
              title="Missed a day?"
              description="We've got your back. Fill in those empty squares easily."
            />
            <FeatureCard
              icon={<GitCommit className="w-8 h-8" />}
              title="Forgot to commit?"
              description="No worries. Generate backdated commits in seconds."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-8 h-8" />}
              title="Perfect Graph"
              description="Aiming for that 100% contribution streak? Go for it."
            />
            <FeatureCard
              icon={<Smile className="w-8 h-8" />}
              title="Just for Fun"
              description="Prank your friends or test your graph. We won't tell."
            />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="bg-card border rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="w-16 h-16 bg-foreground/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold mb-6">Our Philosophy</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe in fun, transparency, and giving developers a little more control
              (and a little less guilt) over their commit history. Whether you&apos;re a
              perfectionist, a procrastinator, or just curious, SyntheticPush is here for you.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="bg-background border rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default About;