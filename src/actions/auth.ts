"use server";

import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { LoginSchema, RegisterSchema } from "@/schemas";
import { z, ZodError } from "zod";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

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

export const login = async (data: z.infer<typeof LoginSchema>) => {
  try {
    const { email, password } = await LoginSchema.parseAsync(data);

    const user = await getUserFromDb(email);
    if (!user || !user.password) {
      return { success: false, message: "This email does not exist." };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { success: false, message: "Password is incorrect" };
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true, message: "Login successful" };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { success: false, message: "Invalid credentials" };
      } else {
        return {
          success: false,
          message: "An unexpected error occured. Please try again later.",
        };
      }
    }

    return {
      success: false,
      message: "An unexpected error occured. Please try again later.",
    };
  }
};
