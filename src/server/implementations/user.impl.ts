// src/server/implementations/user.impl.ts

import { db } from "@/server/utils/firebase-admin";
import type { CreateUserDTO } from "@/server/dtos/user.dto";
import type { UserModel } from "@/server/models/user.model";
import { Timestamp } from "firebase-admin/firestore";

/**
 * Find a user by GitHub username in Firestore.
 */
export const findUserByUsername = async (
  username: string
): Promise<UserModel | null> => {
  try {
    const ref = db.collection("users").doc(username);
    const doc = await ref.get();

    if (doc.exists) {
      return doc.data() as UserModel;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error finding user ${username}:`, error);
    throw error;
  }
};

/**
 * Create a new user in Firestore with default credits and signup history.
 */
export const createUser = async (dto: CreateUserDTO): Promise<UserModel> => {
  try {
    const ref = db.collection("users").doc(dto.github.username);
    const now = Timestamp.fromDate(new Date());

    const userData: UserModel = {
      github: dto.github,
      twitter: dto.twitter || null,
      credits: 10,
      joinedAt: now,
      history: [
        {
          type: "signup",
          value: 10,
          createdAt: now,
        },
      ],
    };

    await ref.set(userData);
    return userData;
  } catch (error) {
    console.error(`Error creating user ${dto.github.username}:`, error);
    throw error;
  }
};

/**
 * Create user if not exists, or return existing user.
 */
export const createUserIfNotExists = async (dto: CreateUserDTO): Promise<UserModel> => {
  try {
    const existingUser = await findUserByUsername(dto.github.username);
    
    if (existingUser) {
      return existingUser;
    }

    return await createUser(dto);
  } catch (error) {
    console.error(`Error in createUserIfNotExists for ${dto.github.username}:`, error);
    throw error;
  }
};


export const updateUserCredits = async (username: string, credits: number) => {
  const user = await findUserByUsername(username);
  if (!user) {
    return { error: "User not found" };
  }
  await db.collection("users").doc(username).update({ credits });
  return { success: true, credits };
};






