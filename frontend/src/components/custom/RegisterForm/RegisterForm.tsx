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
import createUserSchema from "@/components/zod/createUserSchema";
import { useToast } from "@/hooks/use-toast";
import { useCreateUser } from "@/lib/hooks/useUsers";
import { useDictionary } from "@/lib/providers/dictionary-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoadingIcon from "../LoadingIcon/LoadingIcon";

interface RegisterFormProps {
  onBackToLogin: () => void;
}

export const RegisterForm = ({ onBackToLogin }: RegisterFormProps) => {
  const dictionary = useDictionary();
  const { toast } = useToast();

  const onSuccess = () => {
    toast({
      title: dictionary.HomePage.addUserDialog.success,
    });
    onBackToLogin();
  };

  const onError = () => {
    toast({
      title: dictionary.HomePage.addUserDialog.error,
      variant: "destructive",
    });
  };

  const createUserMutation = useCreateUser(onSuccess, onError);

  const handleRegister = (data: z.infer<typeof createUserSchema>) => {
    createUserMutation.mutate({ ...data });
  };

  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    reValidateMode: "onSubmit",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-8" autoComplete="off">
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictionary.HomePage.addUserDialog.email}</FormLabel>
              <FormControl>
                <InputIcon icon={<AtSign />} placeholder={dictionary.HomePage.addUserDialog.email} autoComplete="off" {...field} />
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
          <Button variant="ghost" type="button" onClick={onBackToLogin}>
            {dictionary.AuthPage.loginForm.login}
          </Button>
          <Button type="submit">
            {createUserMutation.isPending ? (
              <LoadingIcon override='text-primary-foreground' />
            ) : (
              dictionary.AuthPage.loginForm.createAccount
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}; 