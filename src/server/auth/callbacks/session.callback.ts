// src/server/auth/callbacks/session.callback.ts

import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export const sessionCallback = async ({ session, token }: { session: Session, token: JWT }) => {
  if (session.user) {
    session.user.username = token.username;
    session.user.avatarUrl = token.avatarUrl;
    session.user.id = token.id;
    session.user.accessToken = token.accessToken;
  }
  return session;
};
