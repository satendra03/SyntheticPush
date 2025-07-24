// src/server/services/user.service.ts

import type { AdapterUser } from "next-auth/adapters";
import type { Account, Profile } from "next-auth";
import { mapToCreateUserDTO } from "@/server/auth/mappers/user.mapper";
import { createUser, findUserByUsername } from "@/server/implementations/user.impl";
import type { UserModel } from "@/server/models/user.model";

/**
 * Fetch user if exists, or create a new one. Always returns user data.
 */
export const fetchOrCreateUser = async ({
  user,
  account,
  profile,
}: {
  user?: AdapterUser;
  account?: Account | null;
  profile?: Profile;
}): Promise<UserModel | null> => {
  try {

    const dto = mapToCreateUserDTO({ user, account, profile });

    if (!dto) {
      console.error("Failed to map user data to DTO");
      return null;
    }

    const existingUser = await findUserByUsername(dto.github.username);
    if (existingUser) {
      return existingUser;
    }

    const newUser = await createUser(dto);
    return newUser;
  } catch (error) {
    console.error("Error in fetchOrCreateUser:", error);
    throw error;
  }
};
