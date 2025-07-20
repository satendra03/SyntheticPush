// src/server/auth/callbacks/session.callback.ts

import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { User } from "@/types";
import { useUser } from "@/app/context/user-context";

export const sessionCallback = async ({
  session,
  token,
}: {
  session: Session;
  token: JWT;
}) => {
  const { setUser, setIsAuthenticated } = useUser();

  if (session.user) {
    session.user.username = token.username;
    session.user.avatarUrl = token.avatarUrl;
    session.user.id = token.id;
    session.user.accessToken = token.accessToken;

    const user: User = {
      id: session.user.id,
      name: session.user.name,
      username: session.user.username,
      avatarUrl: session.user.avatarUrl,
      credits: 10,
      accessToken: session.user.accessToken,
    };

    setUser(user);
    setIsAuthenticated(true);
  }
  return session;
};
