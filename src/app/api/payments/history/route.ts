// src/app/api/payments/history/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth/configs/nextauth.config";
import { db } from "@/server/utils/firebase-admin";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.username) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const username = session.user.username.trim();

    const snapshot = await db
      .collection("payment_requests")
      .where("username", "==", username)
      .get();

    const requests = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
        reviewedAt: data.reviewedAt?.toDate ? data.reviewedAt.toDate().toISOString() : data.reviewedAt,
      };
    });

    // Sort descending by createdAt
    requests.sort((a, b) => {
      const timeA = new Date(a.createdAt || 0).getTime();
      const timeB = new Date(b.createdAt || 0).getTime();
      return timeB - timeA;
    });

    return NextResponse.json({ success: true, requests });
  } catch (error) {
    console.error("Error fetching payment history:", error);
    return NextResponse.json(
      { error: "Failed to fetch payment history." },
      { status: 500 }
    );
  }
}
