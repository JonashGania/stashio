"use client";

import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormMessage,
  FormLabel,
} from "../ui/form";
import { ResetSchema } from "@/schemas";
import { resetPassword } from "@/actions/reset-password";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Input } from "../ui/input";
import { Mail, LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";

const ForgotPasswordForm = () => {
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ResetSchema>) => {
    const response = await resetPassword(data);

    if (!response.success) {
      setGlobalError(response.message);
      setSuccessMessage(null);
    } else {
      form.reset();
      setGlobalError(null);
      setSuccessMessage(response.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-700 dark:text-gray-400">
                Email address
              </FormLabel>
              <div className="relative mb-4">
                <FormControl>
                  <Input
                    type="email"
                    placeholder="youremail@example.com"
                    className="mt-0 h-11 rounded-xl focus-visible:outline-2 focus-visible:outline-violet-300 focus-visible:ring-violet-500 focus-visible:border-transparent pl-10"
                    disabled={form.formState.isSubmitting}
                    {...field}
                  />
                </FormControl>
                <div className="absolute transform -translate-y-[30px] left-3">
                  <Mail size={18} className="text-gray-400" />
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {successMessage && (
          <div className="bg-green-100 dark:bg-green-950/30 py-2 rounded-md text-center mt-4">
            <p className="text-sm text-green-500 dark:text-green-400 font-medium">
              {successMessage}
            </p>
          </div>
        )}
        {globalError && (
          <div className="bg-red-100 dark:bg-red-950/20 py-2 rounded-md text-center mt-4">
            <p className="text-sm text-red-500 dark:text-red-400 font-medium">
              {globalError}
            </p>
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-80 hover:opacity-100 transition-opacity duration-200 ease-in h-11 rounded-xl text-white mt-4"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <LoaderCircle className="text-white animate-spin" size={23} />
              <span>Sending...</span>
            </>
          ) : (
            <span>Send reset link</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
