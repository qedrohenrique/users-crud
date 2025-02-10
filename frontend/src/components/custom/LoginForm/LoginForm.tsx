"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import loginSchema from "@/components/zod/loginSchema";
import { redirect } from "@/i18n/routing";
import { useAuth, useLogin } from "@/lib/hooks/useAuthenticate";
import { useDictionary } from "@/lib/providers/dictionary-provider";
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react";
import { useLocale } from "next-intl";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const LoginForm = () => {
  const dictionary = useDictionary()
  const loginMutation = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = ({ username, password }: z.infer<typeof loginSchema>) => {
    loginMutation.mutate({ username, password });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-1/2">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictionary.AuthPage.loginForm.username}</FormLabel>
              <FormControl>
                <Input placeholder={dictionary.AuthPage.loginForm.username} {...field} />
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
              <FormLabel>{dictionary.AuthPage.loginForm.password}</FormLabel>
              <FormControl>
                <Input placeholder={dictionary.AuthPage.loginForm.password} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {loginMutation.isPending ?
            <LoaderCircle
              color="black"
              className="animate-spin"
              size={16}
              strokeWidth={2}
              role="status"
              aria-label="Loading..."
            /> : dictionary.AuthPage.loginForm.login}
        </Button>
      </form>
    </Form>
  )
};

