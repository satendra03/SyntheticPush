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
    return NextResponse.json(
      { error: credits.error, type: "credits" },
      { status: 400 }
    );
  }
  if (credits?.credits && credits.credits > 0) {
    // then finnaly do work
    const result = await sendSyntheticPush(payload);

    if (result.success) {
      await updateUserCredits(username, (credits?.credits || 0) - 1);
      // then add the push history
      await addPushHistory(username);

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: result.error, type: "push" },
        { status: 400 }
      );
    }
  }

  return NextResponse.json(
    { error: "No credits", type: "credits" },
    { status: 400 }
  );
}

export async function GET() {
  return NextResponse.json({ success: true });
}
