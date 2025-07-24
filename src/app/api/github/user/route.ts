// src/app/api/github/user/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth/configs/nextauth.config";
import { getUser } from "@/server/services/github.service";

export const GET = async () => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const accessToken = session.user.accessToken;
    const username = session.user.username;
    const user = await getUser(accessToken, username);
    return NextResponse.json(user);
}