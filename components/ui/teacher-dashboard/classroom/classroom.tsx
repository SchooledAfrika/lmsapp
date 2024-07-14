import React from "react";

import DashboardPagination from "@/components/DashboardPagination";
import ClassTable from "../classTable";


const Classroom = () => {
  return (
    <div className=" ">
      
      
        <ClassTable  />

      <DashboardPagination />
    </div>
  );
};

export default Classroom;
