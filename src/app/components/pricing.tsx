// src/app/components/pricing.tsx
"use client";

import { Check, Sparkles, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const Pricing = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleAction = () => {
    if (session?.user?.username) {
      router.push(`/dashboard/${session.user.username}`);
    } else {
      signIn("github");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto p-4">
      {/* Free / Starter Plan */}
      <div className="relative rounded-3xl border border-border/80 bg-card/60 backdrop-blur-xl p-8 flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-xl transition-all duration-300 group">
        <div>
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="font-mono text-xs text-muted-foreground border-border bg-muted/30">
              Starter
            </Badge>
            <span className="text-xs font-mono text-emerald-400">Zero Setup</span>
          </div>

          <h3 className="text-2xl font-bold text-foreground mb-1">Free Tier</h3>
          <div className="flex items-baseline gap-1 my-4">
            <span className="text-4xl sm:text-5xl font-extrabold font-mono text-foreground">$0</span>
            <span className="text-muted-foreground text-sm font-mono">/ forever</span>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Everything you need to test the waters and keep your daily streak alive.
          </p>

          <ul className="space-y-3 mb-8 text-sm">
            <li className="flex items-center gap-2.5">
              <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-400">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span><strong>3 Free Credits</strong> instantly on GitHub login</span>
            </li>
            <li className="flex items-center gap-2.5">
              <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-400">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span>Single Date Historical Backdating</span>
            </li>
            <li className="flex items-center gap-2.5">
              <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-400">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span>Zero Credit Card required</span>
            </li>
            <li className="flex items-center gap-2.5">
              <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-400">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span>Community Discord & GitHub Support</span>
            </li>
          </ul>
        </div>

        <Button
          onClick={handleAction}
          variant="outline"
          className="w-full py-6 rounded-xl font-semibold border-border/80 bg-muted/40 hover:bg-muted text-foreground cursor-pointer transition-all"
        >
          {session ? "Use Free Credits" : "Claim 3 Free Credits"}
        </Button>
      </div>

      {/* Pro / Credit Plan */}
      <div className="relative rounded-3xl border-2 border-emerald-500/60 bg-card/90 backdrop-blur-xl p-8 flex flex-col justify-between shadow-2xl shadow-emerald-500/10 hover:border-emerald-400 transition-all duration-300 group">
        {/* Most Popular Badge */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <Badge className="bg-emerald-500 text-white font-mono text-xs px-3.5 py-1 rounded-full shadow-md">
            <Sparkles className="w-3 h-3 mr-1" /> Most Popular
          </Badge>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="font-mono text-xs text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
              Pro Unlimited
            </Badge>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <Zap className="w-3 h-3 fill-emerald-400" /> Instant Topup
            </span>
          </div>

          <h3 className="text-2xl font-bold text-foreground mb-1">Graph Pro</h3>
          <div className="flex items-baseline gap-2 my-4">
            <span className="text-4xl sm:text-5xl font-extrabold font-mono text-emerald-400">₹1</span>
            <span className="text-muted-foreground text-sm font-mono">/ credit (1 Credit = 3 Commits)</span>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Pay as you go. ₹1 per credit delivers 3 micro-commits to sustain your GitHub streak without server misuse.
          </p>

          <ul className="space-y-3 mb-8 text-sm">
            <li className="flex items-center gap-2.5">
              <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span><strong>1 Credit = 3 Commits</strong> (₹1 = 1 Credit)</span>
            </li>
            <li className="flex items-center gap-2.5">
              <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span>Target Full Year, Date Ranges, or Custom Pixels</span>
            </li>
            <li className="flex items-center gap-2.5">
              <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span><strong>No Expiration</strong> on purchased credits</span>
            </li>
            <li className="flex items-center gap-2.5">
              <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span>Instant Topup via UPI (GPay, PhonePe, Paytm) & BMC</span>
            </li>
          </ul>
        </div>

        <Link href="/pricing" className="w-full">
          <Button
            className="w-full py-6 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-emerald-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>View Payment Methods</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

