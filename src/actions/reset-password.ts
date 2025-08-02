"use server";

import { Resend } from "resend";
import ResetPasswordTemplate from "@/components/email/reset-password-template";
import { generatePasswordResetToken } from "@/lib/utils";
import { z } from "zod";
import { ResetSchema } from "@/schemas";
import { getUserFromDb } from "./auth";

const domain =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PROD_URL
    : process.env.NEXT_PUBLIC_DEV_URL;

const resend = new Resend(process.env.RESEND_API_KEY);

export const resetPassword = async (data: z.infer<typeof ResetSchema>) => {
  try {
    const { email } = await ResetSchema.parseAsync(data);

    const existingUser = await getUserFromDb(email);
    if (!existingUser) {
      return { success: false, message: "Email not found!" };
    }

    const passwordResetToken = await generatePasswordResetToken(email);

    const response = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Hello world",
      react: ResetPasswordTemplate({
        userFirstname: existingUser.name,
        resetPasswordLink: `${domain}/reset-password?token=${passwordResetToken.token}`,
      }),
    });

    console.log(response);

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
