'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { User } from "@/lib/common-types/user"
import { useDeleteUser } from "@/lib/hooks/useUsers"
import { useDictionary } from "@/lib/providers/dictionary-provider"
import { DialogClose } from "@radix-ui/react-dialog"
import { useState } from "react"

export interface DeleteUserDialogProps {
  users: User[];
  refetch: () => void
}

export function DeleteUserDialog({ users, refetch }: DeleteUserDialogProps) {
  const dictionary = useDictionary();
  const { toast } = useToast();

  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(undefined);

  const onSuccess = () => {
    refetch();
    toast({
      title: dictionary.HomePage.removeUserDialog.success,
    });
  }

  const onError = () => {
    toast({
      title: dictionary.HomePage.removeUserDialog.error,
    });
  }

  const createUserMutation = useDeleteUser(onSuccess, onError);

  const onSubmit = () => {
    setSelectedUserId(undefined);

    if (!selectedUserId) {
      toast({
        title: `${dictionary.HomePage.removeUserDialog.error} - No user selected`,
      });

      return
    }

    createUserMutation.mutate(selectedUserId);
    refetch();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{dictionary.HomePage.usersTable.actions.delete}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{dictionary.HomePage.removeUserDialog.title}</DialogTitle>
          <DialogDescription>
            {dictionary.HomePage.removeUserDialog.description}
          </DialogDescription>
        </DialogHeader>
        <Select onValueChange={setSelectedUserId}>
          <SelectTrigger>
            <SelectValue placeholder={dictionary.HomePage.removeUserDialog.placeholder} />
          </SelectTrigger>
          <SelectContent className="max-h-60 overflow-y-auto">
            {users?.map((user) => (
              <SelectItem key={user.id} value={user.id.toString()} >
                {`${user.id} - ${user.username}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DialogFooter>
          <div className='flex flex-row justify-end space-x-4 mt-2'>
            <DialogClose asChild>
              <Button onClick={() => setSelectedUserId(undefined)} variant='outline'>{dictionary.HomePage.removeUserDialog.cancel}</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button disabled={!selectedUserId} onClick={onSubmit}>{dictionary.HomePage.removeUserDialog.remove}</Button>
            </DialogClose >
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}
