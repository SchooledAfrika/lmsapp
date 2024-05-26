import Image from "next/image";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { SiGoogleclassroom } from "react-icons/si";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { BsBroadcast } from "react-icons/bs";
import AllTeachDeals from "./AllTeachDeals";




const MultipleClassroom = () => {
  return (
    <div className="font-header md:mt-12 mt-24">
        <div className="flex justify-between">
            <p className="font-bold text-lg">Details</p>
            <Link href="/teacher-dashboard/classroom" className="cursor-pointer"> 
            <Image src="/closeAlt.svg" alt="cancel" width={100} height={100} className="w-[20px] h-[20px]"  />
            </Link>
           
           
        </div>
      
      <div className="grid font-subtext md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 mt-6 mb-2">
        <div className="bg-white py-6 rounded-md">
          <div className="flex justify-between px-6 py-2  pb-1">
            <p className="text-slate-500 text-[14px] mb-3 font-semibold">Overview</p>
             
           
          </div>
          <div className="px-6 flex  space-x-2 pb-2">
            <Image src="/teacher1.jpg" alt="" width={100} height={100} className="rounded-md w-[100px] h-[100px]"/>
           
            <div className="">
            
            <p className="inline text-[13px] font-semibold"><SiGoogleclassroom className="inline w-[15px] mr-1 h-[15px]"/>Alpha</p>
            <p className="mt-3 text-[12.5px]">Grade 12</p>
            </div>
           
          </div>
          <div className="flex px-6 flex-col justify-between">
            <p className="text-[13px] font-semibold">Duration : 60 Minutes</p>
            <p className="text-[13px] my-3 font-semibold">Date Created : April 10th, 2024.</p>

            <Button
            asChild
            className=" bg-dimOrange hover:bg-gold rounded-md text-white text-[14px] mt-3 px-3   py-2 w-32 text-center lg:block"
          >
            <Link href="/" className="inline"><BsBroadcast className="inline mr-1" />Start Session</Link>
          </Button>
           </div>
        </div>
        <div className="bg-white rounded-md py-6 px-6 pb-1 ">
            <p className="text-slate-500 text-[14px] mb-3 font-semibold">Announcements</p>
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

            <div className="flex items-center space-x-3">
               
                <div className="flex flex-col">
                    <p className="text-[13px] font-bold">All Students</p>
                    <p className="text-[12px]">Lorem ipsum dolor sit amet, consectetuer adipiscing elLorem ipsum dolor sit amet, consectetuer adipiscing</p> 
                   
                </div>
               
            </div> 
            <hr className="w-full my-3 font-semibold text-black"/>
        </div>
        <div className="bg-white rounded-md py-6 px-6">
            <p className="text-slate-500 text-[14px] mb-3 font-semibold">Invite students</p>
            <p className="my-3 text-[14px] font-semibold">Use this link to invite students to join your live class.</p>
           <p className="text-blue-400 text-[14px] font-semibold underline">http://web.schooledafrika09=ab/live</p>
           <p className="text-[16px] font-semibold my-3">Login ID for students:</p>
           <p className="text-[20px] font-semibold text-lightGreen my-3">209112</p>
           <Button variant="outline" className="w-full font-bold border-lightGreen text-lightGreen hover:text-lightGreen">Invite Student</Button>
        </div>
      </div>
      <AllTeachDeals/>
    </div>
  );
};

export default MultipleClassroom;
