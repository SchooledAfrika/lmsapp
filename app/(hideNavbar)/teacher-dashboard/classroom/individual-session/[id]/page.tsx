import SingleClassroom from "@/components/ui/teacher-dashboard/SingleClassroom";
import React from "react";
import { useParams } from "next/navigation";

const page = () => {
  return (
    <div>
      <SingleClassroom isTeacher={true} />
    </div>
  );
};

export default page;
