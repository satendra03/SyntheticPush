// src/app/components/footer/bottom-foot.tsx
"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

export const BottomFooter = () => {
  return (
    <div className="text-xs flex flex-col items-center justify-center bg-background dark:bg-[#060911] w-full border-t border-border/80 py-4 px-4">
      <div className="text-center space-y-1">
        <p className="text-muted-foreground font-mono flex items-center justify-center gap-1.5 flex-wrap">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 inline" />
          <span>for developers worldwide. Questions?</span>
          <Link href="/contact" className="text-emerald-400 hover:underline font-semibold">
            Contact us
          </Link>
        </p>
        <p className="text-muted-foreground/70 font-mono text-[11px]">
          &copy; {new Date().getFullYear()} SyntheticPush • Open source Git management utility.
        </p>
      </div>
    </div>
  );
};

