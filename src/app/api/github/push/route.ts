// src/app/api/github/push/route.ts

import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);

  const username = searchParams.get("username");
  const repo = searchParams.get("repo");
  const days = searchParams.get("days");
  const message = searchParams.get("message");

  const response = await fetch(`https://api.github.com/repos/${username}/${repo}/commits`);
  const data = await response.json();
  return NextResponse.json(data);
};
