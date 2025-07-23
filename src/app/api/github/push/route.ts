// src/app/api/github/push/route.ts

import { NextRequest, NextResponse } from "next/server";
import { SyntheticPushPayload } from "@/types";
import { sendSyntheticPush } from "@/server/controllers/github.controller";

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const result = await sendSyntheticPush(payload);
  return NextResponse.json(result);
}
