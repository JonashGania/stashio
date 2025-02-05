"use server";

import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/schemas";
import { z, ZodError } from "zod";
import bcrypt from "bcryptjs";

export const getUserFromDb = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
};

export const googleSignIn = async () => {
  await signIn("google", { redirectTo: "/" });
};

export const signOutUser = async () => {
  await signOut({ redirectTo: "/sign-in" });
};

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  try {
    const validatedData = RegisterSchema.parse(data);

    const { email, password, name } = validatedData;

    const userExist = await prisma.user.findFirst({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (userExist) {
      return {
        success: false,
        message: "This email already exists.",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name: name,
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "User registered successfully",
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        message: "validation error",
        errors: error.errors,
      };
    }

    return {
      success: false,
      message: "An unexpected error occured. Please try again later.",
    };
  }
};
