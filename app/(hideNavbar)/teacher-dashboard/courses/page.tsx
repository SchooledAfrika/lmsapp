import DashboardPagination from "@/components/DashboardPagination";
import Courses from "@/components/ui/teacher-dashboard/Courses";
import React from "react";




const page = () => {
  return (
    <div >
      <div className="flex overflow-auto md:mt-6 mt-[100px] justify-end items-center font-header font-semibold text-[13px]">
        <div className="flex ">
          <input
            type="checkbox"
            className="accent-lightGreen text-white mr-1"
          />
          <p className="mr-3">All Courses</p>
        </div>
        <div className="flex ">
          <input
            type="checkbox"
            className="accent-lightGreen text-white mr-1"
          />
          <p className="mr-3">Watched</p>
        </div>
        <div className="flex ">
          <input
            type="checkbox"
            className="accent-lightGreen text-white mr-1"
          />
          <p className="mr-3">Un-Watched</p>
        </div>
      </div>
      <Courses/>
      <DashboardPagination/>
    </div>
  );
};

export default page;

