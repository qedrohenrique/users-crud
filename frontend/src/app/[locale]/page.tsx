import LogsTable from "@/components/custom/LogsTable/LogsTable";
import Navbar from "@/components/custom/Navbar/Navbar";
import UsersTable from "@/components/custom/UsersTable/UsersTable";
import { Separator } from "@/components/ui/separator";

export default function Home() {
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
