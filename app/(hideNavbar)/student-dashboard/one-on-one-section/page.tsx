import PrivateSession from "@/components/ui/student-dashboard/private-session/PrivateSession";
import React from "react";

const page = () => {
  return <div>
    <div>
      <div className="flex overflow-auto mt-6 justify-end items-center font-header font-semibold text-[13px]">
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
       <PrivateSession/>
    </div>
   
  </div>;
};

export default page;
