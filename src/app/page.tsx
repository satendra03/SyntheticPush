// src/app/page.tsx
"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div className="bg-[url('/main-bg.png')] bg-no-repeat container bg-cover bg-center">
        {/* Main content */}
        <div className="main-content w-[80%] lg:w-full pt-20 lg:pt-20 mx-auto text-center">
          <h1 className="bold-heading text-black dark:text-white">
            Craft your GitHub contribution graph effortlessly with{" "}
            <span className="text-black/50 dark:text-white/50">
              SyntheticPush
            </span>
            .
          </h1>
          <div className="buttons my-10 flex gap-2 items-center justify-center">
            <Button variant="green">Signup using GitHub</Button>
          </div>
        </div>
        {/* Video */}
        <div className="video p-2 lg:p-4 bg-foreground/20 rounded-2xl overflow-hidden">
          <video src="/hero.mp4" autoPlay muted loop className="rounded-2xl" />
        </div>
      </div>
      {/* Divider */}
      <div className="border-b mt-2 border-foreground/10"></div>
      
      
    </>
  );
}
