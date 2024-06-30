
import { Button } from "@/components/ui/button";
import Teachers from "@/components/ui/parent-dashoard/teachers/Teachers";
import Link from "next/link";
import React from "react";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";


const page = () => {
  return (
    <div>
      <div className="flex w-full overflow-x-auto md:mt-6 mt-[100px] md:justify-end justify-between  items-center font-header font-semibold text-[13px]">
        <div className="flex ">
          <input
            type="checkbox"
            className="accent-lightGreen text-white mr-1"
          />
          <p className="mr-3">All <span className="md:inline hidden">Status</span> </p>
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
        <Button asChild className="bg-lightGreen bg-none font-subtext border-none rounded-lg hover:bg-green-700  text-white text-[14px]  px-3 font-bold   py-2 text-start lg:block">
          <Link href="/parents-dashboard/teachers/request-teacher"><LiaChalkboardTeacherSolid className="sm:inline-block text-xl hidden mr-1" />
          Request Special Teacher</Link>
          
          
        </Button>
      </div>
      <Teachers/>
    </div>
  );
};

export default page;

