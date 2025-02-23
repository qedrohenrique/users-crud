import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { Page } from "../common-types/page";
import { User } from "../common-types/user";

const API_ROUTE = "http://localhost:8080";

const createUserRequest = async ({ username, email, password }: { username: string, email: string, password: string }) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());

  const response = await fetch(`${API_ROUTE}/users/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password, email }),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar usuário");
  }

  return response.json();
}

const getUsersRequest = async (selectedPage: number, size: number) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());

  const response = await fetch(`${API_ROUTE}/users/list?page=${selectedPage}&size=${size}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar usuários");
  }

  return response.json();
};

const deleteUsersRequest = async (id: string) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());

  const response = await fetch(`${API_ROUTE}/users/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar usuário");
  }

  return { "status": response.status};
};

export const useGetUsers = (selectedPage: number, size: number): UseQueryResult<Page<User>, Error> => {
  return useQuery({
    queryKey: ["getUsers", selectedPage],
    queryFn: () => getUsersRequest(selectedPage, size),
  });
};


export const useCreateUser = (onSuccess: () => void, onError: () => void) => {
  return useMutation({
    mutationFn: createUserRequest,
    onSuccess: onSuccess,
    onError: onError,
  });
}

export const useDeleteUser = (onSuccess?: () => void, onError?: () => void) => {
  return useMutation({
    mutationFn: (id: string) => deleteUsersRequest(id),
    onSuccess: onSuccess,
    onError: onError,
  });
}