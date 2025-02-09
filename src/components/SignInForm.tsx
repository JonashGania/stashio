"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormItem, FormField, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { login } from "@/actions/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

const SignInForm = () => {
  const [globalError, setGlobalError] = useState<string | null>(null);

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

    if (response?.error) {
      setGlobalError(response.error);
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@email.com"
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
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-violet-500 hover:bg-violet-500"
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
              <span>Sign in</span>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SignInForm;
