// src/server/models/user.model.ts

import { GitHubInfo, TwitterInfo } from "@/server/dtos/user.dto";

export interface UserHistoryEntry {
  type: "signup" | "tweet" | "purchase" | "push";
  value: number;
  createdAt: FirebaseFirestore.Timestamp | Date;
}

export interface UserModel {
  github: GitHubInfo;
  twitter?: TwitterInfo | null;
  credits: number;
  joinedAt: FirebaseFirestore.Timestamp | Date;
  history: UserHistoryEntry[];
}
