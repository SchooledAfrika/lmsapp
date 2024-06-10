"use client";
import PieCharts from "@/components/PieChart";
import React from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { GoDotFill } from "react-icons/go";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { BsBroadcast } from "react-icons/bs";
const UnderCard = () => {
  return (
    <div className="mt-12  flex md:flex-row flex-col relative   text-[15px] gap-3   md:gap-3 rounded-md">
      <div className="flex md:flex-4     px-3 bg-white rounded-md py-6  flex-col">
        <p className="font-bold text-slate-400 text-[14px]">Ongoing Session</p>
        <div className="relative">
           <Image
           src="/tutors.jpg"
           alt="teacher"
           width={200}
           height={200}
           className="rounded-md  mt-3 w-96 object-top h-52 object-cover "
        
        /> 
         <Button
            asChild
            className=" bg-dimOrange hover:bg-dimYellow absolute bottom-4 right-4 rounded-md text-white text-[13px] mt-3  ml-3 md:w-32 w-full mx-auto   py-2 text-center lg:block"
          >
            <Link href="/" className="inline"><BsBroadcast className="inline mr-1" />Join Session</Link>
          </Button>
        </div>
        <p className="py-2 text-[14px] font-bold">Mathematics Class, Grade 10</p>
        
        

       
      </div>
      {/* second flex */}

      <div className="bg-white  rounded-md flex-3 py-6  px-4 ">
        <div className="flex justify-between ">
          <p className="text-slate-500 text-[14px] font-semibold">Schedule</p>
          <Link href="/" className="text-[11.5px] text-lightGreen ">
            View More
          </Link>
        </div>
        <div className="flex my-4 space-x-6 py-2 ">
          <div className="flex flex-col space-y-2">
            <p className="text-[12px] font-semibold">9:00am</p>
            <p className="text-[12px] font-semibold">10:00am</p>
          </div>
          <div className=" border-2 border-lightGreen rounded-full "></div>
          <div className="flex flex-col space-y-2">
            <p className="text-[13px] font-semibold">Mathematics Class</p>
            <p className="text-slate-500 text-[12.5px]">Grade 10</p>
          </div>
        </div>

        <div className="flex my-4 space-x-6 py-2">
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

        <div className="flex my-4 space-x-6">
          <div className="flex flex-col space-y-2 ml-1">
            <p className="text-[12px] font-semibold">2:00pm</p>
            <p className="text-[12px] font-semibold">3:00pm</p>
          </div>
          <div className=" border-2 border-amber-500 rounded-full "></div>
          <div className="flex flex-col space-y-2">
            <p className="text-[13px] font-semibold">Mathematics Class</p>
            <p className="text-slate-500 text-[12.5px]">Grade 11</p>
          </div>
        </div>
      </div>

      

      {/* third flex */}
      <div className="bg-white flex-3 rounded-md py-6 px-6 pb-1 ">
            <p className="text-slate-500 text-[14px] mb-3 font-semibold">Announcements</p>
            <div className="flex items-center space-x-3">
                
                <div className="flex flex-col">
                    <p className="text-[13px] font-bold">All Students</p>
                    <p className="text-[12px]">Lorem ipsum dolor sit amet, consectetuer adipiscing elLorem ipsum dolor sit amet, consectetuer adipiscing</p> 
                   
                </div>
               
            </div> 
            <hr className="w-full mt-3 font-semibold text-black"/>

            <div className="flex items-center space-x-3">
                
                <div className="flex flex-col">
                    <p className="text-[13px] font-bold">All Students</p>
                    <p className="text-[12px]">Lorem ipsum dolor sit amet, consectetuer adipiscing elLorem ipsum dolor sit amet, consectetuer adipiscing</p> 
                   
                </div>
               
            </div> 
            <hr className="w-full my-3 font-semibold text-black"/>
            <div className="flex items-center space-x-3">
                
                <div className="flex flex-col">
                    <p className="text-[13px] font-bold">All Students</p>
                    <p className="text-[12px]">Lorem ipsum dolor sit amet, consectetuer adipiscing elLorem ipsum dolor sit amet, consectetuer adipiscing</p> 
                   
                </div>
               
            </div> 
            <hr className="w-full my-3 font-semibold text-black"/>
            </div>
      
    </div>
  );
};

export default UnderCard;
