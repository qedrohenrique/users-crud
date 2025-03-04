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
import loginSchema from "@/components/zod/loginSchema";
import { useLogin } from "@/lib/hooks/useAuthenticate";
import { useDictionary } from "@/lib/providers/dictionary-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import InputPassword from "@/components/ui/input-password";
import InputIcon from "@/components/ui/input-icon";
import { User } from "lucide-react";

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
                <InputIcon icon={<User />} placeholder={dictionary.AuthPage.loginForm.username} {...field} />
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
                <InputPassword placeholder={dictionary.AuthPage.loginForm.password} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {loginMutation.isPending ?
            <LoadingIcon override='text-primary-foreground' />
            : dictionary.AuthPage.loginForm.login}
        </Button>
      </form>
    </Form>
  )
};

