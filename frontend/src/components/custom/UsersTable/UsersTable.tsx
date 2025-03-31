'use client'

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetUsers } from "@/lib/hooks/useUsers";
import { useDictionary } from "@/lib/providers/dictionary-provider";
import { useEffect, useState } from "react";
import { CreateUserDialog } from "../CreateUserDialog/CreateUserDialog";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import { User } from "@/lib/common-types/user";
import { RefreshCcw } from "lucide-react";
import { DeleteUserDialog } from "../DeleteUserDialog/DeleteUserDialog";

const UsersTable = () => {
  const dictionary = useDictionary();
  const [selectedPage, setSelectedPage] = useState(0)
  const [users, setUsers] = useState<User[]>([])

  const { data, isLoading, refetch } = useGetUsers(selectedPage, 10)

  const onPageChange = (page: number) => {
    setSelectedPage(page)
  }

  useEffect(() => {
    setUsers(data?.content || [])
  }, [data])

  return (
    <div className="space-y-4 flex flex-col justify-between h-72" data-testid="users-table">
      <div className='flex flex-row justify-between items-center w-full'>
        <div className='flex flex-row gap-4'>
          <CreateUserDialog refetch={refetch} />
          <DeleteUserDialog users={users} refetch={refetch} />
        </div>
        <Button onClick={() => refetch()}><RefreshCcw/></Button>
      </div>
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-primary-foreground">
          <TableRow>
            <TableHead>{dictionary.HomePage.usersTable.columns.id}</TableHead>
            <TableHead>{dictionary.HomePage.usersTable.columns.username}</TableHead>
            <TableHead>{dictionary.HomePage.usersTable.columns.email}</TableHead>
            <TableHead>{dictionary.HomePage.usersTable.columns.role}</TableHead>
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

export default UsersTable;