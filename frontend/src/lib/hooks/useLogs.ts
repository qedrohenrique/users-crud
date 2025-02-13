import { useQuery } from "@tanstack/react-query";
import { UseQueryResult } from "@tanstack/react-query";
import { Page } from "../common-types/page";
import { Log } from "../common-types/log";

const API_ROUTE = "http://localhost:8080";

const getLogsRequest = async (selectedPage: number, size: number) => {
  const { token } = await fetch("/api/get-cookie").then((res) => res.json());

  const response = await fetch(`${API_ROUTE}/logs/list?page=${selectedPage}&size=${size}`, {
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

export const useGetLogs = (selectedPage: number, size: number): UseQueryResult<Page<Log>, Error> => {
  return useQuery({
    queryKey: ["getLogs", selectedPage],
    queryFn: () => getLogsRequest(selectedPage, size),
  });
};
