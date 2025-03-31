'use client';

import LogsTable from "@/components/custom/LogsTable/LogsTable";
import Navbar from "@/components/custom/Navbar/Navbar";
import UsersTable from "@/components/custom/UsersTable/UsersTable";
import { Separator } from "@/components/ui/separator";
import { useGetJwtCookie } from "@/lib/hooks/useAuthenticate";

export default function Home() {
  const token = useGetJwtCookie();

  if (!token || token.role !== "ADMIN") {
    return (
      <div>
        <Navbar />
        <div className="px-4 my-4 sm:px-32 sm:py-12 sm:my-0 h-screen">
          <h1>You are not authorized to access this page</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-32">
      <Navbar />
      <div className="px-4 my-4 sm:px-32 sm:py-12 sm:my-0 h-screen">
        <UsersTable />
        <Separator className='my-8' />
        <LogsTable />
      </div>
    </div>
  );
}
