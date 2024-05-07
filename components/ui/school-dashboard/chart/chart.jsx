"use client";
import ChartDialog from "@/components/ChartDialog";
import PieCharts from "@/components/PieChart";
import React from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { GoDotFill } from "react-icons/go";
import RecentlyAdded from "@/components/RecentlyAdded";
import ChartDetails from "@/components/ChartDetails";
import Image from "next/image";

const Chart = () => {
  return (
    <div className="mt-12 flex md:flex-row flex-col relative  text-[15px] gap-3   md:gap-3 rounded-md">
      <div className="flex md:flex-4 h-full overflow-hidden  px-3 bg-white rounded-md py-8  flex-col">
        <div className="flex flex-1 justify-between">
          <p className="pl-3">Student Attendance Rate</p>
          <div className="flex justify-end">
            <p className="inline justify-end text-sm">
              Monthly
              <TiArrowSortedDown className="inline text-xl text-lightGreen" />
            </p>
          </div>
        </div>

        <div className="flex  justify-center ">
          <PieCharts />
          <div className="flex flex-col pl-6 flex-1 py-4">
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
        <div className='mt-6 block md:hidden overflow-hidden px-3 bg-white  text-[15px] py-6 rounded-md'>
        <h3 className='text-slate-600 font-bold'>Recently Added</h3>
        <div className='flex space-x-2 mt-3'>
            <Image src="/green-book.png" alt="" width={100} height={100} className='w-[30px] h-[30px]'/>
            <div className='flex flex-col'>
               <p className='font-bold'>How Europe Underdeveloped Africa</p>
               <p className='text-[13px] pt-2'>Walter Rodney</p>
               <p className='text-rose-500 text-[14px] pt-2'>Grade 12</p>
               <p className='font-bold pt-2 inline'>Government<Image src="/govt.png" alt="" width={100} height={100} className='w-[30px] h-[30px] inline-block'/>  </p>
            </div>

        </div>
        
          
    </div>
       
      </div>

      <div className="flex md:flex-5 mb-6 overflow-hidden bg-white rounded-md py-6 px-2 flex-col">
        <div className="flex pl-3 justify-between">
          <p>Student Perfomance</p>
          <div className="flex justify-end">
            <p className="inline justify-end text-sm">
              Monthly
              <TiArrowSortedDown className="inline text-xl text-lightGreen" />
            </p>
          </div>
        </div>
        <div className="flex pl-3 my-6 text-[12px] font-bold">
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
        <ChartDialog />
        <p className="font-bold text-center">Weeks (7) Days</p>
        <hr className="my-6"/>
        <p className="text-slate-600 font-semibold">Chart Details</p>
        <ChartDetails/>
      </div>
    </div>
  );
};

export default Chart;
