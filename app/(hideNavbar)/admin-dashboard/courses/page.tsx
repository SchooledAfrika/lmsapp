import React from "react";
import DashboardPagination from "@/components/DashboardPagination";
import CoursesAdmin from "@/components/ui/admin-dashboard/courses/courses";
import HandleAddCourses from "@/components/ui/admin-dashboard/courses/HandleAddCourses";

const page = () => {
  return (
    <div className="mt-[80px] md:mt-6">
      <div className="flex justify-end mt-6">
        <HandleAddCourses />
      </div>
      <CoursesAdmin />
      <DashboardPagination />
    </div>
  );
};

export default page;
