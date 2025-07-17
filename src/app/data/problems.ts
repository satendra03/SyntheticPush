// src/app/data/problems.ts
"use client";

import { CardType } from "@/types";
import { Bed, Flag, Clock, FileWarning } from "lucide-react";

export const problems: CardType[] = [
  {
    title:
      "You code more than you sleep!",
    description:
        "Late nights. Side projects. Debugging chaos. Your reward? One lonely green square.",
    icon: Bed,
  },
  {
    title: "Green squares are Green Flags!",
    description:
      "Let's be real — people judge your graph. No green? No clout.",
    icon: Flag,
  },
  {
    title: "Some say time travel isn't possible…",
    description:
      "Because physics won't let you change the past! Let SyntheticPush handle it.",
    icon: Clock,
  },
  {
    title: "Green squares filed a missing person report",
    description:
      "They haven't seen you since April. They're worried.",
    icon: FileWarning,
  },
];
