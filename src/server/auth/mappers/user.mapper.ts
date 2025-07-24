// src/server/auth/mappers/user.mapper.ts

import type { AdapterUser } from "next-auth/adapters";
import type { Account, Profile } from "next-auth";
import type { CreateUserDTO, GitHubInfo } from "@/server/dtos/user.dto";

export function mapToCreateUserDTO({
  user,
  account,
  profile,
}: {
  user?: AdapterUser;
  account?: Account | null;
  profile?: Profile;
}): CreateUserDTO | null {


  if (account?.provider !== "github" || !(user || profile)) {
    console.error("Invalid provider or missing user/profile data");
    return null;
  }

  const githubProfile = profile;
  const github: GitHubInfo = {
    id: String((githubProfile as any).id),
    username: (githubProfile as any).login || "",
    avatarUrl: (githubProfile as any).avatar_url || "",
    profileUrl: (githubProfile as any).html_url || "",
  };

  return { github };
}