// src/app/pricing/page.tsx
import React from "react";
import {
  CreditCard,
  Check,
  Sparkles,
  HelpCircle,
  Coffee,
  QrCode,
  Mail,
  Zap,
  ArrowRight,
  ShieldCheck,
  Clock
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing & Credits",
  description: "Transparent pay-as-you-go pricing for SyntheticPush. 1 credit = 3 commits = ₹1. Free credits on signup.",
};

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-github opacity-50 pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden text-center">
        <div className="container mx-auto px-4 relative z-10 max-w-3xl space-y-6">
          <Badge
            variant="outline"
            className="px-3.5 py-1 text-xs font-mono rounded-full border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Simple & Transparent
          </Badge>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
            Invest in Your <span className="text-gradient-emerald">Graph</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Get started for free with 3 credits (up to 9 commits). Top up at just <strong>₹1 per credit (1 credit = 3 commits)</strong>. No subscriptions, no expiry, no server abuse.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            {/* Free Tier */}
            <PricingCard
              title="Starter"
              badge="Free Forever"
              price="$0"
              subPrice="3 free credits (9 commits) on login"
              description="Perfect for testing the waters and repairing a single missed day."
              features={[
                "3 Free Credits (up to 9 commits)",
                "Single Date Target Mode",
                "Standard GitHub OAuth Flow",
                "Community Discord Support",
                "Zero Credit Card Required",
              ]}
              buttonText="Get Started Free"
              href="/"
              highlighted={false}
            />

            {/* Pro Tier */}
            <PricingCard
              title="Graph Pro"
              badge="Pay As You Go"
              price="₹1"
              subPrice="1 Credit = 3 Commits (₹1 = 1 Credit)"
              description="Pay as you go. 1 credit delivers 3 micro-commits (~333 credits for 1,000 commits) to protect server resources."
              features={[
                "1 Credit = 3 Commits anywhere in history",
                "₹1 = 1 Credit (100 credits = ₹100)",
                "Full Year, Date Range & Custom Art",
                "Instant Micro-Commit Push Dispatch",
                "No Expiry on Purchased Credits",
                "Priority Technical Support",
              ]}
              buttonText="Get Pro Credits"
              href="#payment-methods"
              highlighted={true}
            />
          </div>
        </div>
      </section>

      {/* How It Works & Payment Methods */}
      <section id="payment-methods" className="py-20 bg-muted/20 border-y border-border/60">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* How Credits Work */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2.5">
                <HelpCircle className="w-6 h-6 text-emerald-400" />
                <span>How Credits Work</span>
              </h2>
              <ul className="space-y-4">
                <li className="flex gap-3.5 p-4 rounded-xl bg-card/60 border border-border/70">
                  <div className="mt-0.5 bg-emerald-500/10 text-emerald-400 p-2 rounded-lg h-fit">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-foreground block text-sm">1 Credit = 3 Push Commits (₹1 = 1 Credit)</strong>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Every credit delivers 3 micro-commits. For example: 30 commits = 10 credits (₹10), 300 commits = 100 credits (₹100), and 1,000 commits = ~333 credits (₹333).
                    </p>
                  </div>
                </li>

                <li className="flex gap-3.5 p-4 rounded-xl bg-card/60 border border-border/70">
                  <div className="mt-0.5 bg-emerald-500/10 text-emerald-400 p-2 rounded-lg h-fit">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-foreground block text-sm">Anti-Abuse Server Protection</strong>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      This conversion rate prevents bot abuse and protects server infrastructure while offering an affordable ₹1-per-credit rate for developers.
                    </p>
                  </div>
                </li>

                <li className="flex gap-3.5 p-4 rounded-xl bg-card/60 border border-border/70">
                  <div className="mt-0.5 bg-emerald-500/10 text-emerald-400 p-2 rounded-lg h-fit">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-foreground block text-sm">Credits Never Expire</strong>
                    <p className="text-xs text-muted-foreground mt-0.5">Your credit balance remains attached to your GitHub account permanently until consumed.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Payment Methods */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2.5">
                <CreditCard className="w-6 h-6 text-emerald-400" />
                <span>Payment Methods</span>
              </h2>
              <div className="space-y-4">
                <div className="p-5 border border-border/80 rounded-2xl bg-card/70 hover:border-emerald-500/40 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg">
                        <Coffee className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-sm">Buy Me a Coffee</span>
                    </div>
                    <Badge variant="outline" className="font-mono text-[10px] text-yellow-500 border-yellow-500/30">
                      Instant & Global
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">Pay securely with Credit Cards, Apple Pay, Google Pay, or PayPal.</p>
                  <Link
                    href="https://www.buymeacoffee.com/satendra03"
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:underline font-mono"
                  >
                    <span>Visit Buy Me a Coffee Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="p-5 border border-border/80 rounded-2xl bg-card/70 hover:border-emerald-500/40 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                        <QrCode className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-sm">UPI Direct (India) • ₹1 = 1 Credit</span>
                    </div>
                    <Badge variant="outline" className="font-mono text-[10px] text-blue-400 border-blue-500/30">
                      0% Fee
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">Transfer via GPay, PhonePe, or Paytm to:</p>
                  <div className="bg-muted/80 p-2.5 rounded-lg font-mono text-xs text-foreground select-all border border-border/60 mb-3">
                    satendrakumarparteti@oksbi
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-muted-foreground pt-1 border-t border-border/40">
                    <div>₹50 = 50 Credits (150 commits)</div>
                    <div>₹100 = 100 Credits (300 commits)</div>
                    <div>₹350 = 350 Credits (~1,000 commits)</div>
                    <div>₹500 = 500 Credits (1,500 commits)</div>
                  </div>
                </div>

                <div className="p-5 border border-border/80 rounded-2xl bg-card/70 hover:border-emerald-500/40 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-sm">Manual Credit Confirmation</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Email payment receipt/screenshot along with your GitHub username to{" "}
                    <a href="mailto:satendrakumarparteti.work@gmail.com" className="text-emerald-400 hover:underline font-mono">
                      satendrakumarparteti.work@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-sm">Everything you need to know about credits and push mechanics.</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3">
            <AccordionItem value="item-1" className="border border-border/80 rounded-2xl px-6 bg-card/60 backdrop-blur-md">
              <AccordionTrigger className="font-semibold text-left">Are commits genuine and reflected in GitHub stats?</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                Yes! SyntheticPush creates real Git commits targeting your authorized repository via the GitHub REST API. GitHub calculates contributions automatically and lights up the green squares on your profile heatmap.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-border/80 rounded-2xl px-6 bg-card/60 backdrop-blur-md">
              <AccordionTrigger className="font-semibold text-left">Is my GitHub access token safe?</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                Yes, 100%. We never save your GitHub tokens in a permanent database. Authentication is held strictly inside your secure session and used solely to execute the requested commit pushes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-border/80 rounded-2xl px-6 bg-card/60 backdrop-blur-md">
              <AccordionTrigger className="font-semibold text-left">How soon are credits added after payment?</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                Once payment is confirmed on Buy Me a Coffee or receipt is emailed for UPI, credits are typically updated in your account in under 15–30 minutes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-border/80 rounded-2xl px-6 bg-card/60 backdrop-blur-md">
              <AccordionTrigger className="font-semibold text-left">Can I earn free credits without paying?</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                Yes! Every new user gets 3 free credits upon signup. You can also get additional free credits by tweeting about SyntheticPush or sharing feedback with the maintainer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
};

const PricingCard = ({
  title,
  badge,
  price,
  subPrice,
  description,
  features,
  buttonText,
  href,
  highlighted,
}: {
  title: string;
  badge: string;
  price: string;
  subPrice: string;
  description: string;
  features: string[];
  buttonText: string;
  href: string;
  highlighted: boolean;
}) => {
  return (
    <div
      className={`relative p-8 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
        highlighted
          ? "bg-card/90 shadow-2xl ring-2 ring-emerald-500/80 hover:ring-emerald-400"
          : "bg-card/60 hover:border-emerald-500/40 hover:shadow-xl"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-3.5 py-1 rounded-full text-xs font-mono font-bold shadow-md flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Most Popular
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-3">
          <Badge
            variant="outline"
            className={`font-mono text-xs ${
              highlighted ? "text-emerald-400 border-emerald-500/40 bg-emerald-500/10" : "text-muted-foreground border-border bg-muted/30"
            }`}
          >
            {badge}
          </Badge>
        </div>

        <h3 className="text-2xl font-bold text-foreground mb-1">{title}</h3>
        <div className="my-4">
          <div className="text-4xl font-extrabold font-mono text-foreground">{price}</div>
          <p className="text-xs font-mono text-emerald-400 mt-1">{subPrice}</p>
        </div>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{description}</p>

        <ul className="space-y-3 mb-8 text-sm">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2.5">
              <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-400 flex-shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span className="text-foreground/90">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link href={href} className="w-full">
        <Button
          className={`w-full py-6 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
            highlighted
              ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20 hover:scale-105 active:scale-95"
              : "border border-border/80 bg-muted/40 hover:bg-muted text-foreground"
          }`}
        >
          {buttonText}
        </Button>
      </Link>
    </div>
  );
};

export default PricingPage;
