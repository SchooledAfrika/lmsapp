import React from "react";



import DashboardPagination from "@/components/DashboardPagination";
import StudentsTable from "./StudentsTable";

const Students = () => {
  return (
    <div className=" ">
      

      <StudentsTable/>

      <DashboardPagination />
    </div>
  );
};

export default Students;
