import React from "react";
import DashboardPagination from "@/components/DashboardPagination";
import HandleAddCourses from "@/components/ui/teacher-dashboard/courses/HandleAddCourses";
import Courses from "@/components/ui/teacher-dashboard/courses/courses";

const page = () => {
  return (
    <div className="mt-[80px] md:mt-6">
      <div className="flex justify-end mt-6">
        <HandleAddCourses />
      </div>
      <Courses />
    </div>
  );
};

export default page;
