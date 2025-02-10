"use client";

import { AuthContext } from "@/lib/providers/auth-provider";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { redirect, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

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

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      setToken(data.token);
      fetch("/api/set-cookie", {
        method: "POST",
        body: JSON.stringify({ token: data.token }),
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        redirect({ href: "/", locale: locale });
      });
    },
  });
};
