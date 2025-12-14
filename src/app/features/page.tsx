// src/app/features/page.tsx

import React from "react";
import {
  GitCommit,
  LayoutTemplate,
  CreditCard,
  ShieldCheck,
  Zap,
  BarChart3,
  Calendar,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Features = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden text-center">
        <div className="container mx-auto px-4 relative z-10">
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-1 text-sm rounded-full backdrop-blur-sm border-foreground/10 bg-foreground/10"
          >
            <Zap className="w-3 h-3 mr-2 text-foreground" />
            Powerful Features
          </Badge>

          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent">
            Everything You Need
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            SyntheticPush is the ultimate tool for developers who want to have fun with their GitHub profile, test workflows, or just enjoy a little harmless mischief.
          </p>
        </div>

        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-foreground/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-foreground/5 rounded-full blur-3xl -z-10" />
      </section>

      {/* Main Features Grid */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <FeatureCard
              icon={<GitCommit className="w-8 h-8" />}
              title="GitHub Commits"
              description="Pick any date, and we'll commit for you. Perfect for streaks, demos, or just for laughs."
            />
            <FeatureCard
              icon={<LayoutTemplate className="w-8 h-8" />}
              title="Clean UI"
              description="Minimal design, maximum sarcasm. Enjoy a smooth, distraction-free experience."
            />
            <FeatureCard
              icon={<CreditCard className="w-8 h-8" />}
              title="Credit System"
              description="Earn or buy credits to use features. No hidden fees, no subscriptions, just simple credits."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-8 h-8" />}
              title="No Personal Data"
              description="Just GitHub login, nothing else. We respect your privacy and keep things simple."
            />
          </div>
        </div>
      </section>

      {/* Upcoming Features */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6" />
              Coming Soon
            </h2>
            <p className="text-muted-foreground">We&apos;re just getting started. Here&apos;s what&apos;s next.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <UpcomingFeature
              icon={<Calendar className="w-6 h-6 text-foreground/80" />}
              title="Bulk Commit Scheduling"
              description="Plan your commits for the entire week in one go."
            />
            <UpcomingFeature
              icon={<BarChart3 className="w-6 h-6 text-foreground/80" />}
              title="Analytics Dashboard"
              description="Visualize your fake productivity with beautiful charts."
            />
            <UpcomingFeature
              icon={<GitCommit className="w-6 h-6 text-foreground/80" />}
              title="Visual Graph Selector"
              description="Click directly on a contribution graph to add commits."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t bg-muted/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to try SyntheticPush?</h2>
          <p className="mb-8 text-xl text-muted-foreground max-w-xl mx-auto">
            Sign in with GitHub and start having fun with your commit history today!
          </p>
          <Link href="/">
            <Button size="lg" className="rounded-full font-semibold px-8 h-12 text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 bg-green-500 hover:bg-green-600">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="bg-background border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      <div className="mb-4 p-2 bg-muted rounded-lg w-fit group-hover:bg-foreground/10 transition-colors duration-300 text-foreground">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

const UpcomingFeature = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-card border rounded-xl shadow-sm hover:shadow-md transition-all">
      <div className="p-3 bg-muted/50 rounded-full mb-4 ring-1 ring-border">{icon}</div>
      <span className="font-semibold text-lg mb-2">{title}</span>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

export default Features;