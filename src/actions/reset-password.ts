"use server";

import ResetPasswordTemplate from "@/components/email/reset-password-template";
import {
  generatePasswordResetToken,
  getPasswordResetTokenByToken,
} from "@/lib/utils";
import { z } from "zod";
import { NewPasswordSchema, ResetSchema } from "@/schemas";
import { getUserFromDb } from "./auth";
import { render } from "@react-email/render";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

const domain =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PROD_URL
    : process.env.NEXT_PUBLIC_DEV_URL;

export const resetPassword = async (data: z.infer<typeof ResetSchema>) => {
  const emailSender = process.env.SMTP_USERNAME;
  try {
    const { email } = await ResetSchema.parseAsync(data);

    const existingUser = await getUserFromDb(email);
    if (!existingUser) {
      return { success: false, message: "Email not found!" };
    }

    const passwordResetToken = await generatePasswordResetToken(email);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailSender,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const resetLink = `${domain}/reset-password?token=${passwordResetToken.token}`;

    const emailHtml = await render(
      ResetPasswordTemplate({
        userFirstname: existingUser.name,
        resetPasswordLink: resetLink,
      })
    );

    const mailOptions = {
      from: emailSender,
      to: email,
      subject: "Password Reset Link",
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Check your email for reset link",
    };
  } catch (error) {
    console.error("Error resetting password", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
};

export const newPassword = async (
  data: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  try {
    if (!token) {
      return { success: false, message: "Missing token!" };
    }

    const existingToken = await getPasswordResetTokenByToken(token);
    if (!existingToken) {
      return { success: false, message: "Invalid token" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
      return { success: false, message: "Token has expired" };
    }

    const existingUser = await getUserFromDb(existingToken.email);
    if (!existingUser) {
      return { success: false, message: "Email not found!" };
    }

    const { password } = await NewPasswordSchema.parseAsync(data);
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    });

    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id },
    });

    return {
      success: true,
      message: "Password has been changed!",
    };
  } catch (error) {
    console.error("Error changing password", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
};
