"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormMessage,
  FormLabel,
} from "../ui/form";
import { NewPasswordSchema } from "@/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { CheckCircle, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/reset-password";

const ResetPasswordForm = () => {
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof NewPasswordSchema>) => {
    const response = await newPassword(data, token);

    if (!response.success) {
      setGlobalError(response.message);
      setSuccessMessage(null);
    } else {
      form.reset();
      setGlobalError(null);
      setSuccessMessage(response.message);
    }
  };

  if (successMessage) {
    return (
      <div className="flex justify-center items-center flex-col text-center pt-6">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 ">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          {successMessage}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Your password has been successfully updated. You can now sign in with
          your new password.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="pt-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1 mb-4">
              <FormLabel className="text-neutral-700 dark:text-gray-400">
                Password
              </FormLabel>
              <div className="relative mb-4">
                <FormControl>
                  <Input
                    type={`${passwordVisible ? "text" : "password"}`}
                    placeholder="•••••••••••••"
                    className="mt-0 pr-8 h-11 rounded-xl focus-visible:outline-2 focus-visible:outline-violet-300 focus-visible:ring-violet-500 focus-visible:border-transparent "
                    disabled={form.formState.isSubmitting || !token}
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  className="absolute right-3 transform -translate-y-[30px]"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? (
                    <Eye size={18} className="text-gray-500" />
                  ) : (
                    <EyeOff size={18} className="text-gray-500" />
                  )}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-neutral-700 dark:text-gray-400">
                Confirm Password
              </FormLabel>
              <div className="relative mb-4">
                <FormControl>
                  <Input
                    type={`${confirmPasswordVisible ? "text" : "password"}`}
                    placeholder="•••••••••••••"
                    className="mt-0 h-11 rounded-xl focus-visible:outline-2 focus-visible:outline-violet-300 focus-visible:ring-violet-500 focus-visible:border-transparent "
                    disabled={form.formState.isSubmitting || !token}
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  className="absolute right-3 transform -translate-y-[30px]"
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                >
                  {confirmPasswordVisible ? (
                    <Eye size={18} className="text-gray-500" />
                  ) : (
                    <EyeOff size={18} className="text-gray-500" />
                  )}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {!token && (
          <div className="bg-red-100/60 dark:bg-red-950/20 py-2 rounded-md text-center mt-4 px-4">
            <p className="text-sm text-red-500 dark:text-red-400 font-medium">
              Missing reset token. Please request a new password reset
            </p>
          </div>
        )}

        {globalError && (
          <div className="bg-red-100/60 dark:bg-red-950/20 py-2 rounded-md text-center mt-4">
            <p className="text-sm text-red-500 dark:text-red-400 font-medium">
              {globalError}
            </p>
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-80 hover:opacity-100 transition-opacity duration-200 ease-in h-11 rounded-xl text-white mt-4"
          disabled={form.formState.isSubmitting || !token}
        >
          {form.formState.isSubmitting ? (
            <>
              <LoaderCircle className="text-white animate-spin" size={23} />
              <span>Changing password...</span>
            </>
          ) : (
            <span>Change Password</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
