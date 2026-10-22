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

  const githubProfile = (profile as any) || {};
  const githubUser = (user as any) || {};

  const id = String(githubProfile.id || githubUser.id || account.providerAccountId || "");
  const username = githubProfile.login || githubUser.username || githubUser.name || "";
  const avatarUrl = githubProfile.avatar_url || githubUser.image || "";
  const profileUrl = githubProfile.html_url || (username ? `https://github.com/${username}` : "");

  const github: GitHubInfo = {
    id,
    username,
    avatarUrl,
    profileUrl,
  };

  return { github };
}