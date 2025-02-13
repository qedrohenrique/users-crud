'use client'

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetUsers } from "@/lib/hooks/useUsers";
import { useState } from "react";
import LoadingIcon from "../LoadingIcon/LoadingIcon";

const UsersTable = () => {
  const [selectedPage, setSelectedPage] = useState(0)

  const { data, isLoading } = useGetUsers(selectedPage, 10)
  const users = data?.content

  const onPageChange = (page: number) => {
    setSelectedPage(page)
  }

  return (
    <div className="space-y-4 flex flex-col justify-between h-72">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-primary-foreground">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading ?
            users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
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

export default UsersTable;