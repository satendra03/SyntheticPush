// src/server/controllers/user.controller.ts

import { NextRequest, NextResponse } from "next/server";
import { createUserIfNotExists, findUserByUsername } from "@/server/implementations/user.impl";
import { CreateUserDTO } from "@/server/dtos/user.dto";
import { db } from "../utils/firebase-admin";

export const handleUserCreate = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as CreateUserDTO;
    const result = await createUserIfNotExists(body);
    return NextResponse.json(result);
  } catch (err) {
    console.error("User creation error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

export const checkCredits = async (username: string) => {
  const user = await findUserByUsername(username);
  if (!user) {
    return { error: "User not found" };
  }
  return { credits: user.credits };
};


export const addPushHistory = async (
  username: string,
  creditsUsed: number = 1,
  metadata?: Record<string, any>
) => {
  const user = await findUserByUsername(username);
  if (!user) {
    return { error: "User not found" };
  }
  const history = user.history || [];
  history.push({
    type: "push",
    value: creditsUsed,
    createdAt: new Date(),
    ...(metadata || {}),
  });
  await db.collection("users").doc(username).update({ history });
  return { success: true };
};

