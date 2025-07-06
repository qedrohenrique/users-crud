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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import InputIcon from "@/components/ui/input-icon"
import InputPassword from "@/components/ui/input-password"
import createUserSchema from "@/components/zod/createUserSchema"
import { useToast } from "@/hooks/use-toast"
import { useCreateUser } from "@/lib/hooks/useUsers"
import { useDictionary } from "@/lib/providers/dictionary-provider"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogClose } from "@radix-ui/react-dialog"
import { AtSign, User } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export interface CreateUserDialogProps {
  refetch: () => void
}

export function CreateUserDialog({ refetch }: CreateUserDialogProps) {
  const dictionary = useDictionary();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSuccess = () => {
    form.reset({
      username: "",
      email: "",
      password: "",
    }, { keepErrors: false, keepDirty: false, keepTouched: false });
    toast({
      title: dictionary.HomePage.addUserDialog.success,
    })
  }

  const onError = () => {
    form.reset({
      username: "",
      email: "",
      password: "",
    }, { keepErrors: false, keepDirty: false, keepTouched: false });
    toast({
      title: dictionary.HomePage.addUserDialog.error,
      variant: 'destructive'
    })
  }

  const createUserMutation = useCreateUser(onSuccess, onError);

  const onSubmit = ({ username, email, password }: z.infer<typeof createUserSchema>) => {
    createUserMutation.mutate({ username, email, password });
    refetch();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{dictionary.HomePage.usersTable.actions.add}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{dictionary.HomePage.addUserDialog.title}</DialogTitle>
          <DialogDescription>
            {dictionary.HomePage.addUserDialog.description}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dictionary.HomePage.addUserDialog.username}</FormLabel>
                  <FormControl>
                    <InputIcon icon={<User />} placeholder={dictionary.HomePage.addUserDialog.username} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dictionary.HomePage.addUserDialog.email}</FormLabel>
                  <FormControl>
                    <InputIcon icon={<AtSign />}  {...field} placeholder={dictionary.HomePage.addUserDialog.email} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dictionary.HomePage.addUserDialog.password}</FormLabel>
                  <FormControl>
                    <InputPassword {...field} id="password" placeholder={dictionary.HomePage.addUserDialog.password}  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <div className='flex flex-row justify-end space-x-4 mt-2'>
                <DialogClose asChild>
                  <Button variant='outline' onClick={() => form.reset()}>{dictionary.HomePage.addUserDialog.cancel}</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="submit" disabled={!form.formState.isValid}>{dictionary.HomePage.addUserDialog.add}</Button>
                </DialogClose >
              </div>
            </DialogFooter>
          </form>
        </Form>


      </DialogContent>
    </Dialog >
  )
}
