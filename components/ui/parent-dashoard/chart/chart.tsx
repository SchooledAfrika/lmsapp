"use client";
import PieCharts from "@/components/PieChart";
import React from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { GoDotFill } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import { FaLocationDot, FaSchoolFlag } from "react-icons/fa6";
const Chart = () => {
  return (
    <div className="my-6 flex md:flex-row flex-col relative  text-[15px] gap-3   md:gap-3 rounded-md">
      <div className="flex md:flex-3 font-subtext   px-3 bg-white rounded-md pt-6 pb-3 flex-col">
        <div className="flex flex-1 justify-between">
          <p className="pl-3 text-[14px] font-semibold text-slate-600">
            Ward's Attendance Rate
          </p>
          <div className="flex justify-end">
            <p className="inline justify-end font-subtext text-lightGreen text-[13px]">
              Monthly
              <TiArrowSortedDown className="inline text-xl text-lightGreen" />
            </p>
          </div>
        </div>

        <div className="flex mt-[5px]  mb-6 overflow-hidden md:flex-row flex-col  justify-center ">
          <PieCharts />
          <div className="flex flex-col pl-2 flex-1 py-3">
            <div className="flex mt-6 text-[12px] font-bold">
              <p className="inline mr-2">
                <GoDotFill className="inline text-green-600" />
                Present
              </p>
              <p className="inline mr-2">
                <GoDotFill className="inline text-red-600" />
                Absent
              </p>
              <p className="inline">
                <GoDotFill className="inline text-dimYellow" />
                Late
              </p>
            </div>
            <div className="flex  flex-col py-4">
              <p className="font-bold">28h 45m</p>
              <p className="text-[11px]">Monthly Average</p>
            </div>
            <div className="flex  flex-col">
              <p className="font-bold text-sm">Attendance Report</p>
              <p className="text-[12px]">
                Student attendance increased by{" "}
                <span className="text-lightGreen text-[11px]"> 55% </span> this
                month over the monthly average of 28h 45m.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* second flex */}

      <div className="bg-white  rounded-md flex-2 pt-6 pb-3 px-4 ">
        <div className="flex  justify-between">
          <p className="text-slate-500 text-[14px] font-semibold">
            Ward's Schedule
          </p>
          <Link href="/" className="text-[11.5px] text-lightGreen ">
            View More
          </Link>
        </div>
        <div className="flex my-4 space-x-4">
          <div className="flex flex-col space-y-2">
            <p className="text-[12px] font-semibold">9:00am</p>
            <p className="text-[12px] font-semibold">10:00am</p>
          </div>
          <div className=" border-2 border-lightGreen rounded-full "></div>
          <div className="flex flex-col space-y-2">
            <p className="text-[13px] font-semibold">Mathematics</p>
            <p className="text-slate-500 text-[12.5px]">Grade 10</p>
          </div>
        </div>

        <div className="flex my-4 space-x-4">
          <div className="flex flex-col space-y-2">
            <p className="text-[12px] font-semibold">11:30am</p>
            <p className="text-[12px] font-semibold">12:30pm</p>
          </div>
          <div className=" border-2 border-orange-500 rounded-full "></div>
          <div className="flex flex-col space-y-2">
            <p className="text-[13px] font-semibold">Homework Support</p>
            <p className="text-slate-500 text-[12.5px]">Timi Adewuyi</p>
          </div>
        </div>

        <div className="flex my-4 space-x-4">
          <div className="flex flex-col ml-1 space-y-2">
            <p className="text-[12px] font-semibold">2:00pm</p>
            <p className="text-[12px] font-semibold">3:00pm</p>
          </div>
          <div className=" border-2 border-amber-500 rounded-full "></div>
          <div className="flex flex-col space-y-2">
            <p className="text-[13px] font-semibold">Mathematics</p>
            <p className="text-slate-500 text-[12.5px]">Grade 11</p>
          </div>
        </div>
      </div>

      {/* third flex */}
      <div className="bg-white  rounded-md flex-2 py-6 px-4 ">
        <div className="flex justify-between">
          <p className="text-slate-500 text-[14px] font-semibold">
            Ward's Status
          </p>
          {/* <Link href="/" className="text-[11.5px] text-lightGreen ">
            View More
          </Link> */}
        </div>

        <div className="flex flex-col">
          <div className="py-3 flex space-x-3">
            <Image
              src="/tutors.jpg"
              alt="tutor"
              width={100}
              height={100}
              className="w-[50px] h-[50px] rounded-full"
            />
            <div className="flex flex-col space-y-1">
              <p className="font-bold text-[13px]">Boniface Eze</p>
              <p className="py-[5px] rounded-md bg-lightGreen text-center text-[11px] text-white">
                Active
              </p>
            </div>
          </div>
          <div className="py-3 flex space-x-3">
            <Image
              src="/session.png"
              alt="tutor"
              width={100}
              height={100}
              className="w-[50px] h-[50px] rounded-full"
            />
            <div className="flex flex-col space-y-1">
              <p className="font-bold text-[13px]">Ibrahim Sultan</p>
              <p className="py-[5px] rounded-md bg-lightGreen text-center text-[11px] text-white">
                Active
              </p>
            </div>
          </div>
          <div className="py-3 flex space-x-3">
            <Image
              src="/teacher-img.png"
              alt="tutor"
              width={100}
              height={100}
              className="w-[50px] h-[50px] rounded-full"
            />
            <div className="flex flex-col space-y-1">
              <p className="font-bold text-[13px]">Victory Samuel</p>
              <p className="py-[5px] rounded-md bg-lightGreen text-center text-[11px] text-white">
                Active
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
