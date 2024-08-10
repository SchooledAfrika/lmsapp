import React from "react";
import CourseTable from "../../CourseTable";
import DashboardPagination from "@/components/DashboardPagination";
import AddCourseCategory from "../addCourseCategory/addCourseCategory";

const courseDescription = () => {
  return (
    <div className="mt-[80px] md:mt-6">
      <div className="flex justify-between items-center">
        <p className="px-3 py-4 font-bold text-[20px]">Courses</p>
        <AddCourseCategory />
      </div>
      <CourseTable />
      <DashboardPagination />
    </div>
  );
};

export default courseDescription;
