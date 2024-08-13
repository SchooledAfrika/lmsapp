import React from "react";
import DashboardPagination from "@/components/DashboardPagination";
import SchoolTable from "../SchoolTable";

const AdminSchools = () => {
  return (
    <div className="mt-[80px] md:mt-6">
      <SchoolTable />
      <DashboardPagination />
    </div>
  );
};

export default AdminSchools;
