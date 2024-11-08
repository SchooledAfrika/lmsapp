"use client";
import PieCharts from "@/components/PieChart";
import React from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { GoDotFill } from "react-icons/go";
import ChartDetails from "@/components/ChartDetails";
import RecentlyAdded from "@/components/RecentlyAdded";

const Chart = () => {
  return (
    <div className="mt-12  flex md:flex-row flex-col relative  text-[15px] gap-3   md:gap-3 rounded-md">
      <div className="flex md:flex-4 h-full   px-3 bg-white rounded-md py-6  flex-col">
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
          <div className="flex flex-col pl-6 flex-1 py-3">
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
            <div className="flex pl-3 flex-col py-4">
              <p className="font-bold">28h 45m</p>
              <p className="text-[12px]">Monthly Average</p>
            </div>
            <div className="flex pl-3 flex-col">
              <p className="font-bold text-sm">Attendance Report</p>
              <p className="text-[12px]">
                Student attendance increased by{" "}
                <span className="text-lightGreen"> 55% </span> this month over
                the monthly average of 28h 45m.
              </p>
            </div>
          </div>
        </div>

        <RecentlyAdded />
      </div>

      <div className="flex md:flex-5 mb-6  bg-white rounded-md py-4 px-2 flex-col">
        <div className="flex pl-3 justify-between">
          <p className="text-[14px] text-slate-500 font-semibold">
            Student Perfomance
          </p>
          <div className="flex text-[13px] text-lightGreen font-subtext justify-end">
            <p className="inline justify-end ">
              Monthly
              <TiArrowSortedDown className="inline text-xl text-lightGreen" />
            </p>
          </div>
        </div>
        <div className="flex pl-3 my-3 text-[12px] font-bold">
          <p className="inline mr-2">
            <GoDotFill className="inline text-green-600" />
            Excellent
          </p>
          <p className="inline mr-2">
            <GoDotFill className="inline text-rose-400" />
            Average
          </p>
          <p className="inline mr-2">
            <GoDotFill className="inline text-dimYellow" />
            Below Average
          </p>
          <p className="inline">
            <GoDotFill className="inline text-red-700" />
            Fail
          </p>
        </div>
        <p className="font-bold text-center">Weeks (7) Days</p>
        <hr className="my-3" />
        <p className="text-slate-600 px-4 font-semibold">Chart Details</p>
        <ChartDetails />
      </div>
    </div>
  );
};

export default Chart;
