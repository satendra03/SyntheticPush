// src/app/careers/page.tsx

import React from "react";
import {
  Briefcase,
  Brain,
  Code2,
  Terminal,
  Smile,
  Gift,
  MapPin,
  AlertTriangle,
  XCircle,
  Cpu
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Careers = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl -z-10" />

      {/* Hero Section */}
      <section className="relative py-24 text-center">
        <div className="container mx-auto px-4 relative z-10 w-full mb-10">
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-1 text-sm rounded-full backdrop-blur-sm border-foreground/10 bg-foreground/10"
          >
            <Briefcase className="w-3.5 h-3.5 mr-2" />
            We are (not) hiring
          </Badge>

          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent">
            Careers at <br className="hidden md:block" /> SyntheticPush
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Where we prioritize <strong className="text-foreground">fake commits</strong> over real work.
            <span className="block text-sm mt-2 opacity-75">(Just kidding, please go study).</span>
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl pb-24">

        {/* Reality Check - Glassmorphic Card */}
        <section className="mb-24 relative">
          <div className="absolute inset-0 bg-destructive/10 blur-2xl rounded-full -z-10" />
          <div className="bg-card/50 backdrop-blur-xl border border-destructive/20 rounded-3xl p-6 md:p-8 text-center shadow-2xl overflow-hidden relative group max-w-3xl mx-auto">
            {/* Floating Icons Background */}
            <XCircle className="absolute top-10 left-10 w-24 h-24 text-destructive/5 rotate-12 group-hover:rotate-45 transition-transform duration-700" />
            <XCircle className="absolute bottom-10 right-10 w-32 h-32 text-destructive/5 -rotate-12 group-hover:-rotate-45 transition-transform duration-700" />

            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex flex-col md:flex-row items-center justify-center gap-3 text-destructive">
              <AlertTriangle className="w-8 h-8 mb-2 md:mb-0" />
              Reality Check Detected
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              You think faking GitHub commits will impress a recruiter?
              <br />
              <span className="text-foreground font-semibold">Spoiler Alert:</span> It won&apos;t. They can read code.
            </p>

            <div className="inline-flex items-center gap-4 bg-destructive/10 border border-destructive/20 rounded-full px-6 py-2 text-destructive font-mono font-bold text-lg">
              <XCircle className="w-5 h-5" />
              Fake Commits ≠ Real Skills
            </div>
          </div>
        </section>

        {/* DSA Roadmap - Timeline Style */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3.5 bg-green-500/10 rounded-full mb-6">
              <Brain className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-4xl font-black tracking-tight mb-4">The Real Career Push</h2>
            <p className="text-xl text-muted-foreground">
              Forget the green dots. Fill your brain instead.
            </p>
          </div>

          <div className="grid gap-8 relative">
            {/* Vertical Line for Desktop */}
            <div className="hidden md:block absolute left-[50px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-transparent via-border to-transparent" />

            <RoadmapStep
              step="01"
              title="Master the Basics"
              description="Don't rush. Build the foundation."
              icon={<Code2 className="w-6 h-6" />}
              items={["Arrays & Strings", "Hashmaps", "Sets", "Recursion"]}
            />
            <RoadmapStep
              step="02"
              title="Core DSA Patterns"
              description="The bread and butter of interviews."
              icon={<Terminal className="w-6 h-6" />}
              items={["Linked List", "Binary Search", "Sliding Window", "Two Pointers"]}
            />
            <RoadmapStep
              step="03"
              title="Trees & Graph Theory"
              description="Where it actually gets fun (and hard)."
              icon={<Cpu className="w-6 h-6" />}
              items={["BST", "DFS/BFS", "Union Find", "Topological Sort"]}
            />
            <RoadmapStep
              step="04"
              title="Dynamic Programming"
              description="The boss battle. Good luck."
              icon={<Brain className="w-6 h-6" />}
              items={["1D/2D DP", "Knapsack", "LCS/LIS", "Tears & Pain"]}
            />
          </div>
        </section>

        {/* The Offer - Ticket Style */}
        <section className="mb-24 px-4">
          <div className="relative max-w-3xl mx-auto">
            {/* Ticket Perforations */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-background rounded-full -ml-4 z-10" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-background rounded-full -mr-4 z-10" />

            <div className="bg-card border-2 border-dashed border-border rounded-xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 mb-2">
                  <Smile className="w-6 h-6 text-yellow-500" />
                  <span className="font-bold text-yellow-500 uppercase tracking-widest text-sm">Official Offer Letter</span>
                </div>
                <h2 className="text-3xl font-bold">Still want to work with us?</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6 font-mono text-sm">
                <div className="bg-muted p-4 rounded-lg border border-border/50">
                  <Briefcase className="w-5 h-5 mb-3 text-muted-foreground" />
                  <div className="text-xs text-muted-foreground uppercase mb-1">Position</div>
                  <div className="font-bold text-foreground text-lg">Chief Timepass Officer</div>
                </div>
                <div className="bg-muted p-4 rounded-lg border border-border/50">
                  <div className="text-lg mb-3">₹</div>
                  <div className="text-xs text-muted-foreground uppercase mb-1">Salary</div>
                  <div className="font-bold text-foreground text-lg">₹0.00 <span className="text-xs font-normal text-muted-foreground">/ year</span></div>
                </div>
                <div className="bg-muted p-4 rounded-lg border border-border/50">
                  <Gift className="w-5 h-5 mb-3 text-muted-foreground" />
                  <div className="text-xs text-muted-foreground uppercase mb-1">Benefits</div>
                  <div className="font-bold text-foreground text-lg">Unlimited Guilt</div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button disabled className="w-full md:w-auto px-8 py-6 rounded-xl font-bold text-lg opacity-50 cursor-not-allowed  bg-green-500">
                  Apply Now (Button Broken)
                </Button>
                <p className="text-xs text-muted-foreground mt-3">
                  * Application will definitely be rejected.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center pt-10 border-t">
          <h3 className="text-2xl font-bold mb-4">Go build something real.</h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            But if you want to contribute to this open source chaos, we welcome you.
          </p>
          <Link href="mailto:satendrakumarparteti.work@gmail.com">
            <Button variant="default" className="gap-2 rounded-full px-8 py-6 font-semibold bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-green-500/25 transition-all hover:-translate-y-1">
              <MapPin className="w-5 h-5" />
              Contact The Team
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

const RoadmapStep = ({ step, title, description, icon, items }: { step: string, title: string, description: string, icon: React.ReactNode, items: string[] }) => {
  return (
    <div className="flex flex-col md:flex-row gap-8 relative">
      {/* Step Number Bubble (Desktop) */}
      <div className="hidden md:flex flex-col items-center flex-shrink-0 w-[100px] z-10">
        <div className="w-12 h-12 rounded-full bg-background border-4 border-muted flex items-center justify-center font-bold font-mono text-muted-foreground">
          {step}
        </div>
      </div>

      <div className="flex-grow p-1">
        <div className="group bg-card hover:bg-muted/40 border rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1">
          <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
            <div className="p-3 bg-muted rounded-xl w-fit group-hover:bg-background group-hover:text-green-500 transition-colors">
              {icon}
            </div>
            <div>
              <h3 className="text-xl font-bold flex items-center gap-3">
                <span className="md:hidden text-muted-foreground font-mono mr-2">{step}</span>
                {title}
              </h3>
              <p className="text-muted-foreground">{description}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4 ml-0 md:ml-16">
            {items.map((item, i) => (
              <Badge key={i} variant="secondary" className="px-3 py-1 font-normal bg-muted/50 hover:bg-green-500/10 hover:text-green-500 transition-colors cursor-default">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Careers;
