import Classroom from "@/components/Classroom";
import React from "react";
import AddClassroom from "@/components/Addclassroom";



const page = () => {
  return (
    <div className="mt-[100px] overflow-y-hidden bg-stone-100 md:mt-6">
      <div className="flex justify-end mt-4">
        <AddClassroom />
      </div>
      <Classroom />
    </div>
  );
};

export default page;
