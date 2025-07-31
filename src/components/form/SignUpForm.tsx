"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { RegisterSchema } from "@/schemas";
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
import { register } from "@/actions/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, Eye, EyeOff } from "lucide-react";

const SignUpForm = () => {
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    const response = await register(data);

    if (!response.success) {
      setGlobalError(response.message);
    } else {
      router.push("/sign-in");
      form.reset();
      setGlobalError(null);
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
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1 mb-4">
                <FormLabel className="text-neutral-700">Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    autoComplete="off"
                    className="mt-0 h-11 rounded-xl focus-visible:outline-2 focus-visible:outline-violet-300 focus-visible:ring-violet-500 focus-visible:border-transparent"
                    disabled={form.formState.isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1 mb-4">
                <FormLabel className="text-neutral-700">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="youremail@example.com"
                    className="mt-0 h-11 rounded-xl focus-visible:outline-2 focus-visible:outline-violet-300 focus-visible:ring-violet-500 focus-visible:border-transparent"
                    disabled={form.formState.isSubmitting}
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
                <FormLabel className="text-neutral-700">Password</FormLabel>
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
              <span className="text-white">Create account</span>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SignUpForm;
