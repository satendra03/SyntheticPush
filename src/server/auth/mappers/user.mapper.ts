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
  console.log("mapToCreateUserDTO called");
  console.log("Account provider:", account?.provider);
  console.log("User exists:", !!user);
  console.log("Profile exists:", !!profile);

  if (account?.provider !== "github" || !(user || profile)) {
    console.error("Invalid provider or missing user/profile data");
    console.log("Provider:", account?.provider);
    console.log("User:", !!user);
    console.log("Profile:", !!profile);
    return null;
  }

  const githubProfile = profile;
  console.log("GitHub profile data:", {
    id: (githubProfile as any).id,
    login: (githubProfile as any).login,
    avatar_url: (githubProfile as any).avatar_url,
    html_url: (githubProfile as any).html_url,
  });

  const github: GitHubInfo = {
    id: String((githubProfile as any).id),
    username: (githubProfile as any).login || "",
    avatarUrl: (githubProfile as any).avatar_url || "",
    profileUrl: (githubProfile as any).html_url || "",
  };

  console.log("Mapped GitHub info:", github);
  return { github };
}