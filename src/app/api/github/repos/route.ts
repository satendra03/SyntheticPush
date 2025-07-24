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
    const page = parseInt(request.nextUrl.searchParams.get("page") || "1");
    const perPage = parseInt(request.nextUrl.searchParams.get("per_page") || "15");
  
    try {
      const repos = await getRepos(accessToken, username, page, perPage);
      return NextResponse.json(repos);
    } catch (error) {
      return NextResponse.json({ message: "Failed to fetch repos", error: error }, { status: 500 });
    }
};