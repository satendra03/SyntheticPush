// src/server/auth/configs/nextauth.config.ts

import type { NextAuthOptions } from "next-auth";
import { GitHubAuthProvider } from "@/server/auth/strategies/github.strategy";
import { jwtCallback } from "@/server/auth/callbacks/jwt.callback";
import { sessionCallback } from "@/server/auth/callbacks/session.callback";

export const authOptions: NextAuthOptions = {
  providers: [GitHubAuthProvider],

  callbacks: {
    jwt: jwtCallback as any,
    session: sessionCallback,
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
