"use server";

import ResetPasswordTemplate from "@/components/email/reset-password-template";
import { generatePasswordResetToken } from "@/lib/utils";
import { z } from "zod";
import { ResetSchema } from "@/schemas";
import { getUserFromDb } from "./auth";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";

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

    // const response = await resend.emails.send({
    //   from: "Acme <onboarding@resend.dev>",
    //   to: email,
    //   subject: "Hello world",
    //   react: ResetPasswordTemplate({
    //     userFirstname: existingUser.name,
    //     resetPasswordLink: `${domain}/reset-password?token=${passwordResetToken.token}`,
    //   }),
    // });

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
