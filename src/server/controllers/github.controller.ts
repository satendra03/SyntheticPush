// src/server/controllers/github.controller.ts

import { SyntheticPushPayload } from "@/types";

export async function sendSyntheticPush(
  payload: SyntheticPushPayload
): Promise<{
  success: boolean;
  error: any;
  message: string;
  data?: any;
}> {
  try {
    let backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/push";

    // Ensure URL points to /api/push endpoint
    if (!backendUrl.endsWith("/api/push") && !backendUrl.endsWith("/api/push/")) {
      backendUrl = `${backendUrl.replace(/\/+$/, "")}/api/push`;
    }

    console.log("[GitHub Controller] Dispatching to backend:", backendUrl);

    const res = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data.error || "Git operation failed",
        message: data.message || data.error || "Failed to execute git dispatch",
        data,
      };
    }

    return {
      success: true,
      error: null,
      message: data.message || "Commits dispatched successfully",
      data,
    };
  } catch (error: any) {
    console.error("[GitHub Controller] Fetch error:", error);
    return {
      success: false,
      error: error.message || error,
      message: error.message || "Unknown network error connecting to Git backend",
    };
  }
}
