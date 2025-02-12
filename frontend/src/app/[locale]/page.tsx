import Navbar from "@/components/custom/Navbar/Navbar";
import UsersTable from "@/components/custom/UsersTable/UsersTable";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="px-4 my-4 sm:px-32 sm:py-12 sm:my-0 h-screen">
        <UsersTable />
      </div>
    </>
  );
}
