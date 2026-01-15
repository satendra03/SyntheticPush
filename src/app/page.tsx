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
} from "@/app/components";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Badge } from "@/components/ui/badge";
import { BadgeCheckIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const { session, login, isLoading: authLoading } = useAuth();
  const [clicked, setClicked] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    await login("github");
  };

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "SyntheticPush",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Simulate GitHub commit activity graph effortlessly with SyntheticPush.",
          }),
        }}
      />
      <div className="relative container">
        <Image
          src="/main-bg.png"
          alt="Hero Background"
          fill
          priority
          className="object-cover -z-10"
        />
        {/* Main content */}
        <div id="home" className="main-content w-[80%] lg:w-full pt-20 lg:pt-20 mx-auto text-center">
          <h1 className="bold-heading relative text-black dark:text-white">
            Simulate GitHub commit activity graph effortlessly with{" "}
            <span className="text-black/50 dark:text-white/50">
              SyntheticPush
            </span>
            .
            <Badge
              variant="secondary"
              className="bg-blue-500 text-white dark:bg-blue-600 absolute -top-5 lg:top-0 -right-10 lg:right-0 transform rotate-12"
            >
              <BadgeCheckIcon />
              Free 3 Credits on Signup
            </Badge>
          </h1>
          <div className="buttons my-10 flex gap-2 items-center justify-center">
            {session ?
              <InteractiveHoverButton onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  router.push(`/dashboard/${session.user?.username}`);
                  setIsLoading(false);
                }, 2000);
              }}>
                {isLoading ? "Please Wait..." : `Let's make it Green`}
              </InteractiveHoverButton>
              :
              <Button variant="green" onClick={handleSignIn}>
                {authLoading ? "Please Wait..." : "Signup using GitHub to use the app"}
              </Button>
            }
          </div>
        </div>
        {/* Video */}
        <div className="video p-2 mb-10 lg:p-4 bg-foreground/20 rounded-2xl">
          <HeroVideo />
        </div>
      </div>

      {/* Trusted by Companies */}

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
      <Divider />

      {/* Testimonials */}
      <div id="testimonials" className="container mx-auto section flex flex-col items-center">
        <h1 className="heading text-center relative w-fit self-center">Testimonials
          <Badge
            variant="secondary"
            className="bg-green-500 text-white dark:bg-green-600 absolute -top-2 -right-6 transform rotate-45"
          >
            <BadgeCheckIcon />
            Soon
          </Badge>
        </h1>
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
