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
    <div className="mt-12  flex md:flex-row flex-col relative  text-[15px] gap-3   md:gap-3 rounded-md">
      <div className="flex md:flex-3    px-3 bg-white rounded-md py-6  flex-col">
        <div className="flex flex-1 justify-between">
          <p className="pl-3 text-[14px] font-semibold text-slate-600">
            Student Attendance Rate
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
              <p className="text-[12px]">Monthly Average</p>
            </div>
            <div className="flex  flex-col">
              <p className="font-bold text-sm">Attendance Report</p>
              <p className="text-[12px]">
                Student attendance increased by{" "}
                <span className="text-lightGreen"> 55% </span> this month over
                the monthly average of 28h 45m.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* second flex */}

      <div className="bg-white  rounded-md flex-2 py-6 px-4 ">
        <div className="flex justify-between">
          <p className="text-slate-500 text-[14px] font-semibold">Job Board</p>
          <Link href="/" className="text-[11.5px] text-lightGreen ">
            View More
          </Link>
        </div>

        <div className="flex mt-6 items-center justify-between space-x-3">
          <div className="flex flex-col space-y-1">
            <p className="text-[13px] inline font-semibold mb-1">Economics</p>
            <p className="text-[12px] inline">
              {" "}
              <FaSchoolFlag className="inline mr-1" /> Brilliant stars college
            </p>
            <p className="text-[12px] inline">
              {" "}
              <FaLocationDot className="inline mr-1" /> Lagos
            </p>
          </div>
          <p className="text-[11px] px-[20px]  py-[5px] text-center rounded-md mr-3 bg-lightGreen text-white">
            Active
          </p>
        </div>
        <hr className="w-full mt-1 font-semibold text-black" />

        <div className="flex mt-3 items-center justify-between space-x-3">
          <div className="flex flex-col space-y-1">
            <p className="text-[13px] inline font-semibold mb-1">
              Writing Tutor
            </p>
            <p className="text-[12px] inline">
              {" "}
              <FaSchoolFlag className="inline mr-1" /> Brilliant stars college
            </p>
            <p className="text-[12px] inline">
              {" "}
              <FaLocationDot className="inline mr-1" /> Lagos
            </p>
          </div>
          <p className="text-[11px] px-[20px]  py-[5px] text-center rounded-md mr-3 bg-dimOrange text-white">
            Expired
          </p>
        </div>
        <hr className="w-full mt-1  font-semibold text-black" />

        <div className="flex mt-3 items-center justify-between space-x-3">
          <div className="flex flex-col space-y-1">
            <p className="text-[13px] inline font-semibold mb-1">
              Assistant Teacher
            </p>
            <p className="text-[12px] inline">
              {" "}
              <FaSchoolFlag className="inline mr-1" /> Brilliant stars college
            </p>
            <p className="text-[12px] inline">
              {" "}
              <FaLocationDot className="inline mr-1" /> Lagos
            </p>
          </div>
          <p className="text-[11px] px-[20px]  py-[5px] text-center rounded-md mr-3 bg-dimOrange text-white">
            Expired
          </p>
        </div>
      </div>

      {/* third flex */}
      <div className="bg-white  rounded-md flex-2 py-6 px-4 ">
        <div className="flex justify-between">
          <p className="text-slate-500 text-[14px] font-semibold">Schedule</p>
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
          <div className="flex flex-col space-y-2">
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
    </div>
  );
};

export default Chart;
