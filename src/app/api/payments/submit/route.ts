// src/app/api/payments/submit/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth/configs/nextauth.config";
import { db } from "@/server/utils/firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.username) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in to submit payment details." },
        { status: 401 }
      );
    }

    const username = session.user.username.trim();
    const userEmail = session.user.email || "";

    const body = await req.json();
    const { amount, transactionId, paymentDate, notes } = body;

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount < 1) {
      return NextResponse.json(
        { error: "Please enter a valid payment amount (minimum ₹1)." },
        { status: 400 }
      );
    }

    const cleanTxId = (transactionId || "").trim();
    if (!cleanTxId || cleanTxId.length < 4) {
      return NextResponse.json(
        { error: "Please provide a valid UPI Transaction ID / UTR." },
        { status: 400 }
      );
    }

    // Check if this transaction ID was already submitted
    const existingTx = await db
      .collection("payment_requests")
      .where("transactionId", "==", cleanTxId)
      .limit(1)
      .get();

    if (!existingTx.empty) {
      return NextResponse.json(
        {
          error:
            "This Transaction ID / UTR has already been submitted for verification.",
        },
        { status: 400 }
      );
    }

    const docRef = db.collection("payment_requests").doc();
    const creditsRequested = Math.floor(numAmount); // ₹1 = 1 Credit

    const newPaymentRequest = {
      id: docRef.id,
      username,
      userEmail,
      amount: numAmount,
      creditsRequested,
      transactionId: cleanTxId,
      paymentDate: paymentDate || new Date().toISOString(),
      paymentMethod: "GPay",
      notes: notes || "",
      status: "pending", // "pending" | "approved" | "rejected"
      createdAt: Timestamp.fromDate(new Date()),
      reviewedAt: null,
      reviewedBy: null,
      rejectionReason: null,
    };

    await docRef.set(newPaymentRequest);

    return NextResponse.json({
      success: true,
      message:
        "Payment details submitted successfully! Credits will be approved shortly.",
      request: newPaymentRequest,
    });
  } catch (error) {
    console.error("Error submitting payment:", error);
    return NextResponse.json(
      { error: "Failed to submit payment details. Please try again." },
      { status: 500 }
    );
  }
}
