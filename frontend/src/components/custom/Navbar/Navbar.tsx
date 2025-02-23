'use client'

import { Button } from "@/components/ui/button";
import { useDeleteCookie } from "@/lib/hooks/useAuthenticate";
import { LogOut } from "lucide-react";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import LocaleToggle from "../LocaleToggle/LocaleToggle";
import Logo from "../Logo/Logo";
import ModeToggle from "../ModeToggle/ModeToggle";

const Navbar = () => {
  const deleteMutation = useDeleteCookie();

  const onLogoutClick = () => {
    deleteMutation.mutate({});
  };

  return (
    <nav className="sticky top-0 bg-white dark:bg-black z-[50] shadow-md dark:shadow-sm dark:shadow-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="text-xl font-bold">
          <Logo />
        </a>
        <div className="flex space-x-4 ">
          <LocaleToggle />
          <ModeToggle />
          <Button onClick={onLogoutClick} variant='outline' className="px-0 size-9">
            {deleteMutation.isPending ? <LoadingIcon /> : <LogOut />}
          </Button>
        </div>
      </div >
    </nav >
  );
};

export default Navbar;
