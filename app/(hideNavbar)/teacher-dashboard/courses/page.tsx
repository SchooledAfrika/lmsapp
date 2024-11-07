import React from "react";
import HandleAddCourses from "@/components/ui/teacher-dashboard/courses/HandleAddCourses";
import ResourceFeatures from "@/components/ui/teacher-dashboard/ResourceFeatures";

const page = () => {
  return (
    <div className="mt-[80px] md:mt-6">
      <div className="flex justify-end mt-6">
        <HandleAddCourses />
      </div>
      <ResourceFeatures />
    </div>
  );
};

export default page;
