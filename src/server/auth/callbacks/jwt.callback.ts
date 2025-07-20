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
    console.log("JWT Callback triggered");
    console.log("User:", user?.name);
    console.log("Account provider:", account?.provider);
    console.log("Profile:", profile?.name);

    console.log();
    console.log("This is complete user", user);
    console.log("This is complete account", account);
    console.log("This is complete profile", profile);
    console.log("This is complete token", token);
    console.log("--------------------------------");
    console.log();

    if (user && account) {
      console.log("Processing user and account data");
      const userData = await fetchOrCreateUser({ user, account, profile });

      if (userData) {
        console.log(
          "User data successfully fetched/created:",
          userData.github.username
        );
        token.id = userData.github.id;
        token.username = userData.github.username;
        token.avatarUrl = userData.github.avatarUrl;
        token.credits = userData.credits;
        token.accessToken = account?.access_token || "";
        console.log("Token updated with user data");
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
