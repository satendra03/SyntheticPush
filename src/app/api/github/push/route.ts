// src/app/api/github/push/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth/configs/nextauth.config";
import { sendSyntheticPush } from "@/server/controllers/github.controller";
import {
  addPushHistory,
  checkCredits,
} from "@/server/controllers/user.controller";
import { updateUserCredits } from "@/server/implementations/user.impl";
import { SyntheticPushPayload } from "@/types";

export async function POST(req: NextRequest) {
  try {
    // 1. Verify user session server-side
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.username || !session.user?.accessToken) {
      return NextResponse.json(
        { error: "Unauthorized. Your session has expired, please log in again.", type: "auth" },
        { status: 401 }
      );
    }

    const payload: SyntheticPushPayload = await req.json();
    const sessionUsername = session.user.username.toLowerCase();
    const authorName = (payload.authorName || "").trim().toLowerCase();

    // 2. Prevent account spoofing - authorName must match session user
    if (authorName && authorName !== sessionUsername) {
      return NextResponse.json(
        { error: "Forbidden. You can only dispatch commits for your own authenticated GitHub account.", type: "auth" },
        { status: 403 }
      );
    }

    // 3. Secure credentials from trusted server session
    payload.accessToken = session.user.accessToken;
    payload.authorName = session.user.username;
    payload.authorEmail = session.user.email || payload.authorEmail || `${session.user.username}@users.noreply.github.com`;

    const username = session.user.username;

    // 4. Server-side anti-misuse credit calculation (1 Credit = 3 Commits = ₹1)
    let totalCommitsCount = 0;
    if (Array.isArray(payload.commits) && payload.commits.length > 0) {
      for (const item of payload.commits) {
        const count = Math.max(1, Math.min(Number(item.count) || 1, 20));
        totalCommitsCount += count;
      }
    } else if (Array.isArray(payload.dates) && payload.dates.length > 0) {
      totalCommitsCount = payload.dates.length;
    } else if (payload.date) {
      totalCommitsCount = 1;
    } else {
      totalCommitsCount = 1;
    }

    // High conversion rate: 1 credit gives 3 commits (minimum 1 credit)
    const serverCalculatedCredits = Math.max(1, Math.ceil(totalCommitsCount / 3));
    const clientProvidedCredits = Number(payload.creditsRequired) || 0;

    // Prevent payload manipulation: always charge at least what the server calculates
    const requiredCredits = Math.max(serverCalculatedCredits, clientProvidedCredits);

    // First check user's credit balance
    const credits = await checkCredits(username);

    if (credits.error) {
      console.log("Credit check failed:", credits.error);
      return NextResponse.json(
        { error: credits.error, type: "credits" },
        { status: 400 }
      );
    }

    const availableCredits = credits?.credits || 0;

    if (availableCredits < requiredCredits) {
      console.log(`Insufficient credits. Required: ${requiredCredits} for ${totalCommitsCount} commits, Available: ${availableCredits}`);
      return NextResponse.json(
        {
          error: `Insufficient credits. This operation requires ${requiredCredits} credits (₹${requiredCredits}) for ${totalCommitsCount} commits (1 credit = 3 commits = ₹1), but you currently have ${availableCredits} credits.`,
          type: "credits",
          requiredCredits,
          availableCredits,
          totalCommits: totalCommitsCount,
        },
        { status: 400 }
      );
    }

    // Execute Git push via backend service
    const result = await sendSyntheticPush(payload);

    if (result.success) {
      const remainingCredits = availableCredits - requiredCredits;
      await updateUserCredits(username, remainingCredits);

      // Record in user history
      await addPushHistory(username, requiredCredits, {
        mode: payload.mode || "single",
        repo: payload.repo,
        metadata: payload.metadata || {},
      });

      return NextResponse.json({
        success: true,
        message: result.message || "Commits dispatched successfully.",
        remainingCredits,
        commitsCount: result.data?.commitsCount || (payload.commits?.length || 1),
        datesCount: result.data?.datesCount || (payload.dates?.length || 1),
      });
    } else {
      console.log("Push failed:", result.error);
      return NextResponse.json(
        {
          error: result.message || result.error || "Git push failed. Please check repository permissions.",
          type: "push",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error in /api/github/push:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ success: true, service: "SyntheticPush Push API v2" });
}
