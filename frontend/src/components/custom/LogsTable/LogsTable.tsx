'use client'

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useGetLogs } from "@/lib/hooks/useLogs";
import { useDictionary } from "@/lib/providers/dictionary-provider";
import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import { Log } from "@/lib/common-types/log";

const LogsTable = () => {
  const dictionary = useDictionary();
  const [logs, setLogs] = useState<Log[]>([])

  const [selectedPage, setSelectedPage] = useState(0)

  const { data, isLoading, refetch } = useGetLogs(selectedPage, 10)

  const onPageChange = (page: number) => {
    setSelectedPage(page)
  }

  useEffect(() => {
    setLogs(data?.content || [])
  }, [data])

  return (
    <div className="space-y-4 flex flex-col justify-between h-72" data-testid="logs-table">
      <div className='flex flex-row justify-end items-center w-full'>
        <Button onClick={() => refetch()}><RefreshCcw /></Button>
      </div>
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-primary-foreground">
          <TableRow>
            <TableHead>{dictionary.HomePage.logsTable.columns.id}</TableHead>
            <TableHead>{dictionary.HomePage.logsTable.columns.method}</TableHead>
            <TableHead>{dictionary.HomePage.logsTable.columns.username}</TableHead>
            <TableHead className='w-80'>{dictionary.HomePage.logsTable.columns.body}</TableHead>
            <TableHead>{dictionary.HomePage.logsTable.columns.path}</TableHead>
            <TableHead className='w-[10rem]'>{dictionary.HomePage.logsTable.columns.createdAt}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading ?
            logs?.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.id}</TableCell>
                <TableCell>{log.method}</TableCell>
                <TableCell>{log.username || '-'}</TableCell>
                <TableCell>{
                  log.body ? (
                    <Tooltip>
                      <TooltipTrigger className="truncate max-w-64 overflow-hidden">{log.body}</TooltipTrigger>
                      <TooltipContent>
                        {log.body}
                      </TooltipContent>
                    </Tooltip>
                  )
                    : '-'}</TableCell>
                <TableCell>{log.path}</TableCell>
                <TableCell>{formatTimestamp(log.createdAt)}</TableCell>
              </TableRow>
            ))
            : (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className='w-full my-4 flex flex-row justify-center items-center'>
                    <LoadingIcon />
                  </div>
                </TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
      <div className="flex justify-between">
        <Button
          variant='outline'
          disabled={data?.first}
          onClick={() => onPageChange(selectedPage - 1)}
        >
          {dictionary.HomePage.usersTable.actions.previous}
        </Button>
        <span>{dictionary.HomePage.usersTable.page} {selectedPage + 1} {dictionary.HomePage.usersTable.of} {data?.totalPages}</span>
        <Button
          variant='outline'
          disabled={data?.last}
          onClick={() => onPageChange(selectedPage + 1)}
        >
          {dictionary.HomePage.usersTable.actions.next}
        </Button>
      </div>
    </div>
  )
}

const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);

  const pad = (num: number) => num.toString().padStart(2, '0');

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${day}/${month}/${year} - ${hours}:${minutes}`;
};

export default LogsTable;