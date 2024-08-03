import React from "react";
import Navbar from "@/components/ui/admin-dashboard/navbar";
import Sidebar from "@/components/ui/admin-dashboard/sidebar";
import CommonDashboardContext from "@/providers/Statecontext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CommonDashboardContext>
      <div className="flex h-screen">
        <div className="hidden sm:block sm:w-1/4 md:w-1/6 bg-white h-full sticky top-0 overflow-auto">
          <Sidebar />
        </div>

        <div className="flex-1 sm:w-3/4 md:w-5/6 h-full overflow-auto px-4 md:px-8">
          <Navbar />
          {children}
        </div>
      </div>
    </CommonDashboardContext>
  );
};

export default Layout;
