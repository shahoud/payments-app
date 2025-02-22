import prisma from "@/prisma/client";
import { User } from "@prisma/client";
import isUUID from "validator/es/lib/isUUID";
import isEmail from "validator/lib/isEmail";
/**
 * Fetches a user by ID.
 * @param id - The user's unique ID (UUID format).
 * @returns The user object if found, otherwise null.
 */

export const dbGetUserById = async (id: string): Promise<User | null> => {
  if (!isUUID(id)) {
    console.error("Invalid user ID: " + id);
    return null;
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user from database:", error);
    return null;
  }
};

//Fetch a user by email
export const dbGetUserByEmail = async (email: string): Promise<User | null> => {
  if (!isEmail(email)) {
    console.error("Invalid email address: " + email);
    return null;
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user from database:", error);
    return null;
  }
};

////Fetch a user by name
export const dbGetUserByName = async (name: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        name,
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user from database:", error);
    return null;
  }
};
