import DashboardPagination from "@/components/DashboardPagination";
import  Teachers  from "@/components/ui/admin-dashboard/teachers/teachers";
import React from "react";

const page = () => {
  return (
  <div className="mt-[80px]">
      <Teachers/>
      <DashboardPagination/>
  </div>

  )
};

export default page;
