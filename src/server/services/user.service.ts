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
    console.log("fetchOrCreateUser called");
    console.log("User data:", { name: user?.name, email: user?.email });
    console.log("Account data:", { provider: account?.provider, type: account?.type });
    console.log("Profile data:", { name: profile?.name, email: profile?.email });

    const dto = mapToCreateUserDTO({ user, account, profile });
    console.log("Mapped DTO:", dto);

    if (!dto) {
      console.error("Failed to map user data to DTO");
      return null;
    }

    let existingUser = await findUserByUsername(dto.github.username);
    if (existingUser) {
      console.log("Returning existing user:", existingUser.github.username);
      return existingUser;
    }

    console.log("Creating new user:", dto.github.username);
    const newUser = await createUser(dto);
    console.log("New user created successfully:", newUser.github.username);
    return newUser;
  } catch (error) {
    console.error("Error in fetchOrCreateUser:", error);
    throw error;
  }
};
