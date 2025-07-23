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
    name: string;
    image: string;
    text: string;
    rating: number;
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
    mode: z.enum(["single", "range", "year"]),
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
          return yearNum >= 2020 && yearNum < today.getFullYear();
        },
        {
          message: `Year must be between 2000 and ${today.getFullYear() - 1}`,
          path: ["year"],
        }
      ),
  })
  // Validate required fields per mode
  .refine(
    (data) => {
      if (data.mode === "single") return !!data.singleDate;
      if (data.mode === "range") return !!data.startDate && !!data.endDate;
      if (data.mode === "year") return !!data.year;
      return false;
    },
    {
      message: "Please fill all required fields for the selected mode.",
      path: ["mode"],
    }
  )
  // Ensure endDate > startDate for range mode
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


  export interface SyntheticPushPayload {
    repo: string; // "username/repo-name"
    accessToken: string;
    date: string; // ISO format
    authorName: string;
    authorEmail: string;
  }