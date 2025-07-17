// src/app/api/github/repos/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth/configs/nextauth.config";
import { getRepos } from "@/server/services/github.service";

export const GET = async (request: NextRequest) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const accessToken = session.user.accessToken;
    const username = session.user.username;
  const repos = await getRepos(accessToken, username);
  return NextResponse.json(repos);
};