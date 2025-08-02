"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormMessage,
  FormLabel,
} from "../ui/form";
import { Button } from "../ui/button";
import { login } from "@/actions/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const SignInForm = () => {
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setGlobalError(null);

    const response = await login(data);

    if (!response?.success) {
      setGlobalError(response.message);
    } else {
      router.push("/");
    }
  };

  return (
    <>
      {globalError && (
        <h3 className="text-red-500 font-medium text-center leading-5 pb-4">
          {globalError}
        </h3>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1 mb-4">
                <FormLabel className="text-neutral-700">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    disabled={form.formState.isSubmitting}
                    placeholder="youremail@example.com"
                    className="mt-0 h-11 rounded-xl focus-visible:outline-2 focus-visible:outline-violet-300 focus-visible:ring-violet-500 focus-visible:border-transparent"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1 mb-6">
                <div className="flex items-center justify-between">
                  <FormLabel className="text-neutral-700">Password</FormLabel>
                  <Link
                    href="/forgot-password"
                    className="text-gray-500 hover:text-neutral-700 text-sm"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="relative">
                  <FormControl>
                    <Input
                      type={`${isPasswordVisible ? "text" : "password"}`}
                      disabled={form.formState.isSubmitting}
                      placeholder="•••••••••••••"
                      className="mt-0 h-11 rounded-xl focus-visible:outline-2 focus-visible:outline-violet-300 focus-visible:ring-violet-500 focus-visible:border-transparent pr-10"
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    className="absolute right-3 transform -translate-y-[30px]"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? (
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
          <Button
            type="submit"
            className="w-full bg-violet-500 hover:bg-violet-600 h-11 rounded-xl"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <LoaderCircle
                size={23}
                color="#ffffff"
                strokeWidth={3}
                className="animate-spin"
              />
            ) : (
              <span className="text-white text-lg">Sign in</span>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SignInForm;
