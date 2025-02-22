import prisma from "@/prisma/client";
import { User } from "@prisma/client";

export const dbCreateUser = async (
  name: string,
  email: string,
  googleId: string | "",
  githubId: string | "",
  image: string | ""
): Promise<User | null> => {
  try {
    const user = { name, email, googleId, githubId, image };
    const createdUser = await prisma.user.create({ data: user });
    return createdUser;
  } catch (error) {
    console.error("Unable to create user");
    return null;
  }
};
