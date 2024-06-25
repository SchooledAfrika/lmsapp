import Classroom from "@/components/ui/student-dashboard/classroom/Classroom";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex overflow-auto md:mt-6 mt-[100px] justify-end items-center font-header font-semibold text-[13px]">
        <div className="flex ">
          <input
            type="checkbox"
            className="accent-lightGreen text-white mr-1"
          />
          <p className="mr-3">All Status</p>
        </div>
        <div className="flex ">
          <input
            type="checkbox"
            className="accent-lightGreen text-white mr-1"
          />
          <p className="mr-3">Newer</p>
        </div>
        <div className="flex ">
          <input
            type="checkbox"
            className="accent-lightGreen text-white mr-1"
          />
          <p className="mr-3">Older</p>
        </div>
       
      </div>
      <Classroom/>
    </div>
  );
};

export default page;





