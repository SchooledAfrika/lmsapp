import React from "react";
import DashboardPagination from "@/components/DashboardPagination";
import AddCourses from "@/components/ui/admin-dashboard/courses/AddCourses";
import Courses from "@/components/ui/admin-dashboard/courses/Courses";

const page = () => {
  return (
    <div className="mt-[80px] md:mt-6">
      <div className="flex justify-end mt-6">
        <AddCourses />
      </div>
      <Courses />
      <DashboardPagination/>
    </div>
  );
};

export default page;
