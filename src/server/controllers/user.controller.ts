// src/server/controllers/user.controller.ts

import { NextRequest, NextResponse } from "next/server";
import { createUserIfNotExists } from "@/server/implementations/user.impl";
import { CreateUserDTO } from "@/server/dtos/user.dto";

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
