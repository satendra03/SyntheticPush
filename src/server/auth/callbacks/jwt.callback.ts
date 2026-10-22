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
    // 1. Immediately extract accessToken and basic profile if account is present
    if (account) {
      token.accessToken = account.access_token || "";
    }
    if (profile) {
      const p = profile as any;
      if (p.login) token.username = p.login;
      if (p.id) token.id = String(p.id);
      if (p.avatar_url) token.avatarUrl = p.avatar_url;
    }
    if (user && !token.username) {
      token.username = (user as any).username || user.name || "";
    }

    // 2. Sync / create user in Firestore and attach credits
    if (user && account) {
      const userData = await fetchOrCreateUser({ user, account, profile });

      if (userData) {
        token.id = userData.github.id || token.id;
        token.username = userData.github.username || token.username;
        token.avatarUrl = userData.github.avatarUrl || token.avatarUrl;
        token.credits = userData.credits;
        token.accessToken = account.access_token || token.accessToken;
      }
    }
  } catch (error) {
    console.error("Error in JWT callback:", error);
  }

  return token;
};
