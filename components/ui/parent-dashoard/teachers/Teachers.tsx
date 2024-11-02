"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import TeachersTable from "./TeachersTable";
import DashboardPagination from "@/components/DashboardPagination";

const Teachers = () => {
  return (
    <div className=" ">
      <TeachersTable />
    </div>
  );
};

export default Teachers;
