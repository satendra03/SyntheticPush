// src/server/models/user.model.ts

import { GitHubInfo, TwitterInfo } from "@/server/dtos/user.dto";

export interface UserHistoryEntry {
  type: "signup" | "tweet" | "purchase" | "push" | "admin_adjustment";
  value: number;
  createdAt: FirebaseFirestore.Timestamp | Date;
  txId?: string;
  repo?: string;
  mode?: string;
  note?: string;
  [key: string]: any;
}

export interface UserModel {
  github: GitHubInfo;
  twitter?: TwitterInfo | null;
  credits: number;
  joinedAt: FirebaseFirestore.Timestamp | Date;
  history: UserHistoryEntry[];
  isBanned?: boolean;
  banReason?: string | null;
  bannedAt?: FirebaseFirestore.Timestamp | Date | null;
}
