import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SiGoogleclassroom } from "react-icons/si";
import Tables from "@/components/Tables";
import DashboardPagination from "./DashboardPagination";

const Classroom = () => {
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
          className=" bg-lightGreen bg-none rounded-lg hover:bg-green-700  text-white text-[13px]  pl-2 pr-3 w-32  py-2 text-start lg:block"
        >
          <Link href="inline-block">
            <SiGoogleclassroom className="inline-block mr-1" />
            Add Classroom
          </Link>
        </Button>
      </div>

      <Tables />

      <DashboardPagination />
    </div>
  );
};

export default Classroom;
