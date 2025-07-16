// src/app/data/features.ts
"use client";

import { Cloud, DollarSign, Hand, Terminal } from "lucide-react";
import { CardType } from "@/app/types";

export const features: CardType[] = [
    {
      title: "Built for developers",
      description:
        "Built for engineers, developers, dreamers, thinkers and doers.",
      icon: Terminal,
    },
    {
      title: "Ease of use",
      description:
        "It's as easy as using an Apple, and as expensive as buying one.",
      icon: Hand,
    },
    {
      title: "Pricing like no other",
      description:
        "Our prices are best in the market. No cap, no lock, no credit card required.",
      icon: DollarSign,
    },
    {
      title: "100% Uptime guarantee",
      description: "We just cannot be taken down by anyone.",
      icon: Cloud,
    },
  ];