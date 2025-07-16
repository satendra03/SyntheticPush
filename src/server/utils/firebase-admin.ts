// src/server/utils/firebase-admin.ts

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Validate environment variables
if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  console.error("FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set");
  throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is required");
}

try {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);
  console.log("Firebase service account loaded successfully");
  
  if (!getApps().length) {
    initializeApp({ credential: cert(serviceAccount) });
    console.log("Firebase Admin initialized successfully");
  }
} catch (error) {
  console.error("Error initializing Firebase Admin:", error);
  throw error;
}

export const db = getFirestore();
console.log("Firestore database instance created");