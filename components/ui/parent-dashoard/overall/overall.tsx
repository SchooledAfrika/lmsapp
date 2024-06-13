"use client";
import ChartDialog from "@/components/ChartDialog";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { TiArrowSortedDown } from "react-icons/ti";
import Link from "next/link";


const Overall = () => {
  
  return (
    <div className="my-6 flex  md:flex-row justify-between flex-col  text-[15px] gap-3   md:gap-3 rounded-md">
      <div className="flex md:flex-4 h-full    px-3 bg-white rounded-md py-6  flex-col">
        <div className="flex pl-4 py-2 justify-between">
          <p className="text-[14px] text-slate-500 font-semibold">
           Ward's Overall Perfomance
          </p>
          <div className="flex text-[13px] text-lightGreen font-subtext justify-end">
            <p className="inline justify-end ">
              Monthly
              <TiArrowSortedDown className="inline text-xl text-lightGreen" />
            </p>
          </div>
        </div>
        <ChartDialog />
      </div>

      <div className="flex flex-col flex-3 bg-white md:mb-0 mb-6 py-6 px-3  rounded-md ">
        
        <div className="flex  justify-between">
          <p className="text-slate-500 text-[14px] font-semibold">Ward's  Assessment</p>
          <Link href="/" className="text-[11.5px] text-lightGreen  ">
            View More
          </Link>
        </div>

        <div className="flex justify-between my-3 pr-2">
            <div className="flex space-x-3">
                <Image src="/maths.png" alt="maths" width={100} height={100} className="w-[30px] h-[30px]"/>
                <div className="flex flex-col space-y-1">
                    <p className="text-[13px] font-bold">Mathematics</p>
                    <p className="text-[12px] font-semibold">Grade 11 <span className="border border-l mx-2 border-l-slate-500"></span> Module 1 Test</p>
                </div>

            </div>
            <div className="flex items-center">
                <p className="font-bold text-lightGreen">80%</p>
            </div>
        </div>

        {/* Second */}

        <div className="flex justify-between my-3 pr-2">
            <div className="flex space-x-3">
                <Image src="/maths.png" alt="maths" width={100} height={100} className="w-[30px] h-[30px]"/>
                <div className="flex flex-col space-y-1">
                    <p className="text-[13px] font-bold">Mathematics</p>
                    <p className="text-[12px] font-semibold">Grade 11 <span className="border border-l mx-2 border-l-slate-500"></span> Module 1 Test</p>
                </div>

            </div>
            <div className="flex items-center">
                <p className="font-bold text-red-500">66%</p>
            </div>
        </div>

        {/* third */}

        <div className="flex justify-between my-3 pr-2">
            <div className="flex space-x-3">
                <Image src="/english.png" alt="english" width={100} height={100} className="w-[30px] h-[30px]"/>
                <div className="flex flex-col space-y-1">
                    <p className="text-[13px] font-bold">English</p>
                    <p className="text-[12px] font-semibold">Grade 11 <span className="border border-l mx-2 border-l-slate-500"></span> Module 1 Test</p>
                </div>

            </div>
            <div className="flex items-center">
                <p className="font-bold text-lightGreen">95%</p>
            </div>
        </div>

        {/* fourth */}

        <div className="flex justify-between my-3 pr-2">
            <div className="flex space-x-3">
                <Image src="/bio.png" alt="biology" width={100} height={100} className="w-[30px] h-[30px]"/>
                <div className="flex flex-col space-y-1">
                    <p className="text-[13px] font-bold">Biology</p>
                    <p className="text-[12px] font-semibold">Grade 11 <span className="border border-l mx-2 border-l-slate-500"></span> Module 1 Test</p>
                </div>

            </div>
            <div className="flex items-center">
                <p className="font-bold text-lightGreen">100%</p>
            </div>
        </div>
         
         
      </div>
    </div>
  );
};

export default Overall;
