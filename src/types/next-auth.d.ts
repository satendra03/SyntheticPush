import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      avatarUrl: string;
      id: string;
      accessToken: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    username: string;
    avatarUrl: string;
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username: string;
    avatarUrl: string;
    id: string;
    accessToken: string;
  }
}
