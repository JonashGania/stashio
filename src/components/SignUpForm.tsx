"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormItem, FormField, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { register } from "@/actions/auth";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const SignUpForm = () => {
  const [globalError, setGlobalError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    const response = await register(data);

    if (!response.success) {
      setGlobalError(response.message);
    } else {
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Name"
                    autoComplete="off"
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
              <ClipLoader size={20} color="#ffffff" />
            ) : (
              <span>Create account</span>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SignUpForm;
