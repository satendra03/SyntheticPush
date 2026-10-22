import { z } from "zod";

const today = new Date();

// Footer
export interface Link {
    title: string;
    href: string;
    icon?: React.ElementType;
  }
  
  export interface FooterLink {
    title: string;
    links: Link[];
  }
  
  export interface CardType {
    title: string;
    description: string;
    icon?: React.ElementType;
  }
  
  export interface TestimonialType {
    id: string;
    name: string;
    username: string;
    avatar: string;
    role: string;
    text: string;
    streak?: string;
    stars?: number;
    repo?: string;
    tag?: string;
    date?: string;
    verified?: boolean;
  }
  
  export interface History {
    type: string;
    value: number;
    createdAt: string;
  }
  
  // Updated User interface
  export interface User {
    id: string;
    name?: string | null;
    email?: string;
    username: string;
    avatarUrl: string;
    accessToken: string;
    credits: number;
  }

  export interface ProfileType {
    id: number;
    name: string;
    bio: string;
    blog: string;
    company: string;
    email: string;
    followers: number;
    following: number;
    html_url: string;
    location: string;
    login: string;
    twitter_username: string;
  }

export const formSchema = z
  .object({
    mode: z.enum([
      "single",
      "range",
      "year_realistic",
      "year_streak",
      "pattern",
      "custom",
    ]),
    singleDate: z.date().optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    year: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val) return true;
          const yearNum = parseInt(val, 10);
          return yearNum >= 2020 && yearNum <= today.getFullYear();
        },
        {
          message: `Year must be between 2020 and ${today.getFullYear()}`,
          path: ["year"],
        }
      ),
    pattern: z
      .enum(["heart", "wave", "matrix", "hi", "invader", "star"])
      .optional(),
    shade: z.number().min(1).max(4).optional(),
    density: z.enum(["natural", "dense", "light"]).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.mode === "single" && !data.singleDate) {
      ctx.addIssue({
        message: "Please select a date.",
        path: ["singleDate"],
      });
    }
    if (data.mode === "range") {
      if (!data.startDate) {
        ctx.addIssue({
          message: "Please select a start date.",
          path: ["startDate"],
        });
      }
      if (!data.endDate) {
        ctx.addIssue({
          message: "Please select an end date.",
          path: ["endDate"],
        });
      }
    }
    if (
      (data.mode === "year_realistic" ||
        data.mode === "year_streak" ||
        data.mode === "pattern" ||
        data.mode === "custom") &&
      !data.year
    ) {
      ctx.addIssue({
        message: "Please enter a year.",
        path: ["year"],
      });
    }
  })
  .refine(
    (data) => {
      if (data.mode === "range" && data.startDate && data.endDate) {
        return data.endDate > data.startDate;
      }
      return true;
    },
    {
      message: "End date must be after start date.",
      path: ["endDate"],
    }
  );

export interface CommitEntry {
  date: string; // ISO format or YYYY-MM-DD
  count?: number; // Level / commit count
  message?: string;
}

export interface SyntheticPushPayload {
  repo: string; // "username/repo-name"
  accessToken: string;
  authorName: string;
  authorEmail: string;
  date?: string; // Single date
  dates?: string[];
  commits?: CommitEntry[];
  mode?:
    | "single"
    | "range"
    | "year_realistic"
    | "year_streak"
    | "pattern"
    | "custom";
  creditsRequired?: number;
  metadata?: {
    mode?: string;
    pattern?: string;
    year?: string | number;
    shade?: number;
    activeDays?: number;
    totalCommits?: number;
    [key: string]: any;
  };
}