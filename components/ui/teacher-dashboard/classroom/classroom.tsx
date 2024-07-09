import React from "react";

import DashboardPagination from "@/components/DashboardPagination";
import ClassTable from "../classTable";


const Classroom = () => {
  return (
    <div className=" ">
      
      
        <ClassTable dataId=""/>

      <DashboardPagination />
    </div>
  );
};

export default Classroom;
