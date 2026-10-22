// src/app/data/solutions.ts
"use client";

import { CardType } from "@/types";
import { Calendar, CreditCard, GitBranch, User } from "lucide-react";

export const solutions: CardType[] = [
  {
    title: "Signup for SyntheticPush",
    description: "Create your free account in seconds — no setup, no Git knowledge needed.",
    icon: User,
  },
  {
    title: "Check Credits",
    description: "1 credit gives 3 commits (₹1 = 1 credit). We show you exactly how many you've got — zero hidden math.",
    icon: CreditCard,
  },
  {
    title: "Select Dates",
    description: "Pick the days you want your GitHub graph to light up.",
    icon: Calendar,
    },
  {
    title: "Git Commit",
    description: "Hit generate and boom!",
    icon: GitBranch,
  },
];