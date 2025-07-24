// src/server/auth/callbacks/jwt.callback.ts

import type { JWT } from "next-auth/jwt";
import type { Account, Profile } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";
import { fetchOrCreateUser } from "@/server/services/user.service";

export const jwtCallback = async ({
  token,
  user,
  account,
  profile,
}: {
  token: JWT;
  user?: AdapterUser;
  account?: Account | null;
  profile?: Profile;
}): Promise<JWT> => {
  try {
    if (user && account) {
      const userData = await fetchOrCreateUser({ user, account, profile });

      if (userData) {
        token.id = userData.github.id;
        token.username = userData.github.username;
        token.avatarUrl = userData.github.avatarUrl;
        token.credits = userData.credits;
        token.accessToken = account?.access_token || "";
      } else {
        console.error("Failed to fetch or create user data");
      }
    } else {
      console.log("No user or account data available");
    }
  } catch (error) {
    console.error("Error in JWT callback:", error);
    // Don't throw the error to prevent authentication failure
    // but log it for debugging
  }

  return token;
};
