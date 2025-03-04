"use client";

import { useRouter } from "@/i18n/routing";
import { AuthContext } from "@/lib/providers/auth-provider";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useContext } from "react";

const API_ROUTE = "http://localhost:8080"

const loginRequest = async ({ username, password }: { username: string; password: string }) => {

  const response = await fetch(`${API_ROUTE}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Erro ao fazer login");
  }

  const data = await response.json();
  await fetch("/api/set-cookie", {
    method: "POST",
    body: JSON.stringify({ token: data.token }),
    headers: { "Content-Type": "application/json" },
  })

  return data;
};

const deleteToken = async () => {
  const response = await fetch("/api/del-token", {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Error on delete cookie");
  }

  return response.json();
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth not inside AuthProvider");
  }
  return context;
};

export const useLogin = () => {
  const { setToken } = useAuth();
  const locale = useLocale();
  const router = useRouter();

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      setToken(data.token)
      router.replace("/", { locale: locale });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useDeleteCookie = (): UseMutationResult<string> => {
  const { setToken } = useAuth();
  const locale = useLocale();
  const router = useRouter();

  return useMutation({
    mutationFn: deleteToken,
    onSuccess: (data) => {
      setToken(data.token)
      router.replace("/login", { locale: locale });
    },
    onError: (error) => {
      console.error(error);
    }
  });
};