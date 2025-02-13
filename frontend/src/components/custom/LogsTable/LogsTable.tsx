'use client'

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import { useGetLogs } from "@/lib/hooks/useLogs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const LogsTable = () => {
  const [selectedPage, setSelectedPage] = useState(0)

  const { data, isLoading } = useGetLogs(selectedPage, 10)
  const logs = data?.content

  const onPageChange = (page: number) => {
    setSelectedPage(page)
  }

  return (
    <div className="space-y-4 flex flex-col justify-between h-72">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-primary-foreground">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Username</TableHead>
            <TableHead className='w-80'>Body</TableHead>
            <TableHead>Path</TableHead>
            <TableHead className='w-[10rem]'>Created at</TableHead>
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
                <TableCell colSpan={4}>
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
          Previous
        </Button>
        <span>Page {selectedPage + 1} of {data?.totalPages}</span>
        <Button
          variant='outline'
          disabled={data?.last}
          onClick={() => onPageChange(selectedPage + 1)}
        >
          Next
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