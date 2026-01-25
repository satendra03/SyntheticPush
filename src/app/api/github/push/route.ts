// src/app/api/github/push/route.ts

import { NextRequest, NextResponse } from "next/server";
import { sendSyntheticPush } from "@/server/controllers/github.controller";
import {
  addPushHistory,
  checkCredits,
} from "@/server/controllers/user.controller";
import { updateUserCredits } from "@/server/implementations/user.impl";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const username = payload.authorName;

    // Validate username exists and is not empty
    if (!username || typeof username !== "string" || username.trim() === "") {
      console.error("Invalid or missing authorName in payload:", payload.authorName);
      return NextResponse.json(
        { error: "Invalid or missing authorName in payload" },
        { status: 400 }
      );
    }

    // first check the credits
    const credits = await checkCredits(username);
    
    if (credits.error) {
      console.log("Credit check failed:", credits.error);
      return NextResponse.json(
        { error: credits.error, type: "credits" },
        { status: 400 }
      );
    }
    
    if (!credits?.credits || credits.credits <= 0) {
      console.log("User has no credits:", credits.credits);
      return NextResponse.json(
        { error: "Insufficient credits", type: "credits" },
        { status: 400 }
      );
    }
    
    // then finally do work
    const result = await sendSyntheticPush(payload);

    if (result.success) {
      await updateUserCredits(username, (credits?.credits || 0) - 1);
      // then add the push history
      await addPushHistory(username);

      return NextResponse.json({ success: true });
    } else {
      console.log("Push failed:", result.error);
      return NextResponse.json(
        { error: result.error, type: "push" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ success: true });
}
