// app/not-found.tsx
"use client";

import { GitHubIcon } from "@/icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
      <div className="space-y-6 max-w-md mx-auto">
        <div className="flex items-center justify-center gap-3 text-7xl sm:text-8xl font-black font-mono text-emerald-400">
          <span>4</span>
          <div className="p-3 rounded-2xl bg-muted/60 dark:bg-white/5 border border-border/80">
            <GitHubIcon className="w-14 h-14 text-foreground" />
          </div>
          <span>4</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-mono">Commit SHA Not Found</h2>
          <p className="text-sm text-muted-foreground">
            The page, branch, or repository you&apos;re looking for has been detached or moved to another universe.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Link href="/">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl px-6 py-5 flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

