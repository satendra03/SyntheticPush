// src/app/api/github/readme/route.ts

import { NextResponse } from "next/server";
import { getReadme } from "@/server/services/github.service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth/configs/nextauth.config";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const accessToken = session.user.accessToken;
  const username = session.user.username;
  const readme = await getReadme(accessToken, username, username);
  return NextResponse.json(readme.content);
};
