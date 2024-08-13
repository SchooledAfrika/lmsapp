import React from "react";
import Classroom from "@/components/ui/teacher-dashboard/classroom/classroom";
import AddClassroom from "@/components/ui/teacher-dashboard/addClassroom/addClassroom";
import DashboardPagination from "@/components/DashboardPagination";

const page = () => {
  return (
    <div className="mt-[80px] md:mt-6">
      <div className="flex justify-end mt-6">
        <AddClassroom />
      </div>
      <Classroom />
      <DashboardPagination/>
    </div>
  );
};

export default page;
