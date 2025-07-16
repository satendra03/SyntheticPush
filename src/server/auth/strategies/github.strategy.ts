// src/server/auth/strategies/github.strategy.ts

import GitHubProvider from "next-auth/providers/github";

export const GitHubAuthProvider = GitHubProvider({
  clientId: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
});
