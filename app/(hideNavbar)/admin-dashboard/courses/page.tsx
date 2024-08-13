import React from "react";
import DashboardPagination from "@/components/DashboardPagination";
import AddCourseCategory from "@/components/ui/admin-dashboard/courses/addCourseCategory/addCourseCategory";
import Courses from "@/components/ui/admin-dashboard/courses/courses";

const page = () => {
  return (
    <div className="mt-[80px] md:mt-6">
      <div className="flex justify-end my-6">
        <AddCourseCategory />
      </div>
      <Courses />
      <DashboardPagination />
    </div>
  );
};

export default page;
