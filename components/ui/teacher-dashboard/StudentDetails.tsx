import React from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import SingleStudentTable from "./SingleStudentTable";
import Link from "next/link";

const StudentDetails = () => {
  return (
    <div className="  md:flex md:flex-row grid grid-cols-1 items-center  text-[15px] gap-3   md:gap-2 rounded-md">
      <div className="flex md:flex-5 overflow-x-auto    rounded-md   flex-col">
        <SingleStudentTable />
      </div>
      <div className="flex md:mb-0 mb-6 py-6 px-3 rounded-md  bg-white flex-3">
        <div className="w-full">
          <h3 className="text-slate-600 font-bold">Session Details</h3>
          <div className="flex justify-between  mt-4">
            <p className="text-[13px]">Start Date</p>
            <div className="flex ">
              <p className="font-semibold text-[13px]">April 24, 2024</p>
            </div>
          </div>

          <div className="flex justify-between  mt-4">
            <p className="text-[13px]">End of Session</p>
            <div className="flex ">
              <p className="font-semibold text-[13px]">May 24, 2024</p>
            </div>
          </div>
          <p className="underline mx-auto my-2 font-semibold text-center text-[13px] text-lightGreen">
            <Link href="/" className="">
              View Class Schedule
            </Link>
          </p>

          <div className="flex font-subtext  flex-col">
            <p className="my-3 font-bold">Transaction Details</p>
            <div className="flex justify-between  mt-4">
              <p className="text-[13px]">Transaction ID</p>
              <div className="flex ">
                <p className="font-semibold text-dimOrange text-[13px]">
                  SA099DEF
                </p>
              </div>
            </div>
          </div>

          <div className="flex font-subtext  flex-col">
            <div className="flex justify-between  mt-4">
              <p className="text-[13px]">Subject</p>
              <div className="flex ">
                <Image
                  src="/maths.png"
                  alt="maths"
                  width={100}
                  height={100}
                  className="w-[30px] h-[30px] mr-1"
                />
                <p className="font-bold mt-1  text-[13px]">Mathematics</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
