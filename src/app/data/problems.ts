// src/app/data/problems.ts
"use client";

import { CardType } from "@/app/types";
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
      "Let&apos;s be real — people judge your graph. No green? No clout.",
    icon: Flag,
  },
  {
    title: "Some say time travel isn&apos;t possible…",
    description:
      "Because physics won&apos;t let you change the past! Let SyntheticPush handle it.",
    icon: Clock,
  },
  {
    title: "Green squares filed a missing person report",
    description:
      "They haven&apos;t seen you since April. They&apos;re worried.",
    icon: FileWarning,
  },
];
