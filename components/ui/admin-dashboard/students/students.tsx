import React from "react";
import StudentTable from "../StudentTable";
import DashboardPagination from "@/components/DashboardPagination";
import AddStudent from "@/components/ui/admin-dashboard/students/addStudent/addStudent";

const students = () => {
  return (
    <div className="mt-[80px] md:mt-6">
      <div className=" text-[24px] flex items-center justify-center font-bold">
        <p>List of all the student</p>
      </div>
      <StudentTable />
      <DashboardPagination />
    </div>
  );
};

export default students;
