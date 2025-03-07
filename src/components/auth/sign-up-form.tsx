"use client";
import { LogIn } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { LoadingButton } from "../shared/loading-button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import { PasswordInput } from "../shared/password-input";

const SignUpFormSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

type SignUpFormSchemaType = z.infer<typeof SignUpFormSchema>;

export function SignUpForm() {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const form = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: SignUpFormSchemaType) {
    console.log(data);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3"
        aria-live="polite"
      >
        {/* Errors go here */}
        <div className="flex flex-col gap-y-2">
          {error && (
            <p className="text-center text-sm text-red-500" role="alert">
              {error}
            </p>
          )}

          {/* Username Field */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your username"
                    type="text"
                    {...field}
                    className="h-12"
                    aria-label="Username"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="text"
                    {...field}
                    className="h-12"
                    aria-label="Email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    dir="ltr"
                    placeholder="Enter your password"
                    {...field}
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <LoadingButton
            loading={isPending}
            type="submit"
            className="w-full select-none"
          >
            Sign Up
            <LogIn className="ml-2 h-5 w-5" />
          </LoadingButton>
        </div>
      </form>
    </FormProvider>
  );
}
