// app/not-found.tsx
"use client";

import { GitHubIcon } from "@/icons";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-[50vh]">
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-7xl font-black flex items-center justify-center gap-2">
          4 <GitHubIcon className="w-16 h-16" /> 4
        </h1>
        <p className="font-bold">The page you're looking for doesn't exist.</p>
        <p>
          Need to{" "}  
          <Link href="/" className="link">
            Sign in
          </Link>
          ?
        </p>
      </div>
    </div>
  );
}
