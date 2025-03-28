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
import InputIcon from "@/components/ui/input-icon";
import InputPassword from "@/components/ui/input-password";
import loginSchema from "@/components/zod/loginSchema";
import { useLogin } from "@/lib/hooks/useAuthenticate";
import { useDictionary } from "@/lib/providers/dictionary-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoadingIcon from "../LoadingIcon/LoadingIcon";

interface LoginFormProps {
  onBackToRegister: () => void;
}

export const LoginForm = ({ onBackToRegister }: LoginFormProps) => {
  const dictionary = useDictionary();
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" autoComplete="off">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictionary.AuthPage.loginForm.username}</FormLabel>
              <FormControl>
                <InputIcon icon={<User />} placeholder={dictionary.AuthPage.loginForm.username} autoComplete="off" {...field} />
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
                <InputPassword placeholder={dictionary.AuthPage.loginForm.password} autoComplete="new-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row justify-end gap-4">
          <Button variant="ghost" type="button" onClick={onBackToRegister}>
            {dictionary.AuthPage.loginForm.createAccount}
          </Button>
          <Button type="submit" data-testid="login-button" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? (
              <LoadingIcon override='text-primary-foreground' />
            ) : (
              dictionary.AuthPage.loginForm.login
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

