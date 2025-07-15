// src/app/data/solutions.ts
"use client";

import { CardType } from "@/app/types";
import { Calendar, CreditCard, GitBranch, User } from "lucide-react";

export const solutions: CardType[] = [
  {
    title: "Signup for SyntheticPush",
    description: "Create your free account in seconds — no setup, no Git knowledge needed.",
    icon: User,
  },
  {
    title: "Check Credits",
    description: "Every commit costs a credit. We show you exactly how many youve got — no hidden math.",
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