import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import DashboardPagination from "./DashboardPagination";
import StudentsTable from "./StudentsTable";

const Students = () => {
  return (
    <div className=" ">
      <StudentsTable />
    </div>
  );
};

export default Students;
