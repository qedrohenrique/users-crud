import { useQuery } from "@tanstack/react-query";
import { User } from "../common-types/user";
import { UseQueryResult } from "@tanstack/react-query";
import { Page } from "../common-types/page";

const API_ROUTE = "http://localhost:8080";

const getUsersRequest = async (selectedPage: number) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());

  const response = await fetch(`${API_ROUTE}/users/list?page=${selectedPage}`, {
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

export const useGetUsers = (selectedPage: number): UseQueryResult<Page<User>, Error> => {
  return useQuery({
    queryKey: ["getUsers", selectedPage],
    queryFn: () => getUsersRequest(selectedPage),
  });
};
