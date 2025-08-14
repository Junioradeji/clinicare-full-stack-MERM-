import Sidebar from "@/components/Sidebar"
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";
import MobileNav from "@/components/MobileNav";
import { useAuth } from "@/contextstore";

export default function DashboardLayout() {
  const { user } = useAuth();

  return (
    <div className="min-h-[100dvh] bg-slate-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-[200px] flex-1">
        <Navbar user={user} />
        <MobileNav user={user} />
        <Outlet />
      </div>
 </div>
);
}