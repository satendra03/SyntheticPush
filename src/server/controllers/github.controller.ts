// src/server/controllers/github.controller.ts

import { SyntheticPushPayload } from "@/types";

export async function sendSyntheticPush(
  payload: SyntheticPushPayload
): Promise<{
  success: boolean;
  error: any;
  message: string;
}> {
  try {
    const res = await fetch("http://localhost:5000/api/github/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return {
      success: res.ok,
      error: null,
      message: data.message || "No message returned",
    };
  } catch (error: any) {
    console.error("Frontend fetch error:", error);
    return {
      success: false,
      error: error,
      message: error.message || "Unknown error",
    };
  }
}
