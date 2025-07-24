// src/app/api/github/push/route.ts

import { NextRequest, NextResponse } from "next/server";
import { sendSyntheticPush } from "@/server/controllers/github.controller";
import {
  addPushHistory,
  checkCredits,
} from "@/server/controllers/user.controller";
import { updateUserCredits } from "@/server/implementations/user.impl";

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const username = payload.authorName;

  // first check the credits
  const credits = await checkCredits(username);
  if (credits.error) {
    return NextResponse.json({ error: credits.error }, { status: 400 });
  }
  if (credits?.credits && credits.credits <= 0) {
    return NextResponse.json({ error: "No credits" }, { status: 400 });
  }

  // then finnaly do work
  const result = await sendSyntheticPush(payload);

  if (result.success) {
    const updatedCredits = await updateUserCredits(username, (credits?.credits || 0) - 1);
    if (updatedCredits.error) {
      return NextResponse.json({ error: updatedCredits.error }, { status: 400 });
    }
    // then add the push history
    const pushHistory = await addPushHistory(username);
    if (pushHistory.error) {
      return NextResponse.json({ error: pushHistory.error }, { status: 400 });
    }
  } else {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}
