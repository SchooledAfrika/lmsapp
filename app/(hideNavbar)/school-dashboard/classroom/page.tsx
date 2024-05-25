import Classroom from "@/components/Classroom";
import React from "react";
import AddClassroom from "@/components/Addclassroom";

const page = () => {
  return (
    <div className="mt-[80px] md:mt-6">
      <div className="flex justify-end mt-6">
        <AddClassroom />
      </div>
      <Classroom />
    </div>
  );
};

export default page;
