
import TeachersTable from "@/components/ui/student-dashboard/teachers/TeachersTable";
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
          <p className="mr-3">Active</p>
        </div>
        <div className="flex ">
          <input
            type="checkbox"
            className="accent-lightGreen text-white mr-1"
          />
          <p className="mr-3">Offline</p>
        </div>
       
      </div>
       <TeachersTable/>
    </div>
  );
};

export default page;






