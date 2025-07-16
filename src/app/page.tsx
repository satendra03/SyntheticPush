// src/app/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Features,
  Divider,
  Problems,
  Solutions,
  Testimonials,
  Pricing,
  HeroVideo,
  SwitchTheme,
} from "@/app/components";
import { Badge } from "@/components/ui/badge";
import { BadgeCheckIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="relative">
      <div className="fixed z-50 bottom-10 right-5">
        <SwitchTheme />
      </div>
      <div className="bg-[url('/main-bg.png')] bg-no-repeat container bg-cover bg-center">
        {/* Main content */}
        <div id="home" className="main-content w-[80%] lg:w-full pt-20 lg:pt-20 mx-auto text-center">
          <h1 className="bold-heading relative text-black dark:text-white">
            Craft your GitHub contribution graph effortlessly with{" "}
            <span className="text-black/50 dark:text-white/50">
              SyntheticPush
            </span>
            .
            <Badge
              variant="secondary"
              className="bg-blue-500 text-white dark:bg-blue-600 absolute -top-5 lg:top-0 -right-10 lg:right-0 transform rotate-12"
            >
              <BadgeCheckIcon />
              Free 10 Credits on Signup
            </Badge>
          </h1>
          <div className="buttons my-10 flex gap-2 items-center justify-center">
            <Button variant="green">Signup using GitHub</Button>
          </div>
        </div>
        {/* Video */}
        <div className="video p-2 mb-10 lg:p-4 bg-foreground/20 rounded-2xl overflow-hidden">
          <HeroVideo />
        </div>
      </div>

      {/* Trusted by Companies */}

      {/* Divider */}
      <Divider />

      {/* Problem */}
      <div id="problem" className="container mx-auto section">
        <h1 className="heading text-center">Problem</h1>
        <p className="text-center caption">
          If your graph needs love, we&rsquo;ve got{" "}
          <span className="text-green-400">green</span> for that.
        </p>
        <Problems />
      </div>

      {/* Divider */}
      <Divider />

      {/* Solution */}
      <div id="solution" className="container mx-auto section">
        <h1 className="heading text-center">Solution</h1>
        <p className="text-center caption">
          This won&rsquo;t replace hard work, but it does replace an{" "}
          <span className="text-green-400">empty box</span>.
        </p>
        <Solutions />
      </div>

      {/* Divider */}
      <Divider />

      {/* Features */}
      <div id="features" className="container mx-auto section">
        <h1 className="heading text-center">Features</h1>
        <p className="text-center caption">
          We generate the commits, you get the{" "}
          <span className="text-green-400">glory</span>.
        </p>
        <Features />
      </div>

      {/* Divider */}
      <Divider />

      {/* Pricing */}
      <div id="pricing" className="container mx-auto section">
        <h1 className="heading text-center">Pricing</h1>
        <Link
          href="https://c.tenor.com/-7ON2Lqx030AAAAd/tenor.gif"
          target="_blank"
          className="text-green-500 cursor-pointer hover:underline transition-all duration-300"
          onClick={() => setClicked(true)}
        >
          <p className="text-center caption">
            {clicked ? "Yepp! that's reality! 😭" : "Because we're nice."}
          </p>
        </Link>
        <Pricing />
      </div>

      {/* Divider */}
      <Divider />

      {/* Testimonials */}
      <div id="testimonials" className="container mx-auto section">
        <h1 className="heading text-center">Testimonials</h1>
        <p className="text-center caption">
          We could hype ourselves up — but we&rsquo;ll let the{" "}
          <span className="text-green-400">devs</span> do it instead.
        </p>
        <p className="text-center caption">
          Btw you can get{" "}
          <span className="underline text-yellow-400">free credits</span> by
          tweeting about us.
        </p>
        <Testimonials />
      </div>

    </div>
  );
}
