// src/app/api/firebase/credits/route.ts

import { NextResponse } from "next/server";
import { checkCredits } from "@/server/controllers/user.controller";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth/configs/nextauth.config";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const credits = await checkCredits(session.user?.username || "");
  return NextResponse.json(credits);
}