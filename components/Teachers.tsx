import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import TeachersTable from "./TeachersTable";
import DashboardPagination from "./DashboardPagination";

const Teachers = () => {
  return (
    <div className=" ">
      <div className="flex overflow-auto mt-6 justify-end items-center font-header font-semibold text-[14px]">
        <div className="flex ">
          <input
            type="checkbox"
            className="accent-lightGreen text-white mr-1"
          />
          <p className="mr-3">All Status</p>
        </div>
        <div className="flex ">
          <input
            type="checkbox"
            className="accent-lightGreen text-white mr-1"
          />
          <p className="mr-3">Active</p>
        </div>
        <div className="flex ">
          <input
            type="checkbox"
            className="accent-lightGreen text-white mr-1"
          />
          <p className="mr-3">Pending</p>
        </div>
        <Button
          asChild
          className=" bg-lightGreen bg-none rounded-lg hover:bg-green-700  text-white text-[13px]  pl-2 pr-3 w-32  py-2 text-center lg:block"
        >
          <Link href="inline-block">
            <LiaChalkboardTeacherSolid className="inline-block mr-1" />
            Add Teacher
          </Link>
        </Button>
      </div>

      <TeachersTable />

      <DashboardPagination />
    </div>
  );
};

export default Teachers;
