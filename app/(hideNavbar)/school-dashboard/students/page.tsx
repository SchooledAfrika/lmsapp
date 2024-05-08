import Students from "@/components/Students";
import React from "react";
import { AddStudent } from "./add/page";

const page = () => {
<<<<<<< HEAD
  return <div>
    <div className="flex overflow-auto mt-6 justify-end items-center font-header font-semibold text-[14px]">
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
          <p className="mr-3">Pending</p>
        </div>
        <AddStudent/>
      </div>
    <Students/>
  </div>;
=======
  return (
    <div className="mt-[80px] md:mt-6">
      <Students />
    </div>
  );
>>>>>>> 84cbb2dff81b2e64d3fa94fe6b885dcb4afc8b6c
};

export default page;
