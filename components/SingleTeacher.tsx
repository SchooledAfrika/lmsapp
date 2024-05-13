import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { CiMail } from "react-icons/ci";
import SingleTeacherTable from "./SingleTeacherTable";



const SingleTeacher = () => {
  return (
    <div className="font-header md:mt-12 mt-24">
        <div className="flex justify-between">
            <p className="font-bold text-lg">Details</p>
            <Link href="/school-dashboard/teachers" className="cursor-pointer"> 
            <Image src="/closeAlt.svg" alt="cancel" width={100} height={100} className="w-[20px] h-[20px]"  />
            </Link>
           
           
        </div>
      
      <div className="grid font-subtext grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-3 my-6">
        <div className=" flex flex-col space-y-4">
        <div className=" bg-white flex pl-3 pr-4 py-6 rounded-md  space-x-3 pb-2">
            <Image src="/tutors.jpg" alt="" width={100} height={100} className="rounded-md w-[120px] h-[140px]"/>
           
            <div className="items-center mt-8">
                <p className=" text-[14px] font-semibold">Alex Iwobi Samuel</p>
                <p className="mt-3 text-[13px]">Grade 11</p>
                <Button
            asChild
            className=" bg-lightGreen hover:bg-green-700 rounded-md text-white text-[14px] mt-3 px-3 w-32  py-2 text-center lg:block"
          >
            <Link href="/" className="inline"><CiMail className="inline mr-1 font-semibold" />Contact</Link>
          </Button>
            </div>
           
          </div>
            <div className="bg-white px-6 py-6 rounded-md">
                <h3 className="font-bold py-2 text-[16px]">About Teacher</h3>
                <p className="text-[13px]">Lorem ipsum dolor sit amet, consectetuer adipiscing eliLorem ipsum dolor sit amet, consectetuer adipiscing eliLorem ipsum dolor sit amet, consectetuer adipiscing eli Lorem ipsum dolor sit amet, consectetuer adipiscing eliLorem ipsum dolor sit amet, consectetuer adipiscing eliLorem ipsum dolor sit amet, consectetuer adipiscing eli</p>
            </div>
            
         
        </div>
        
        <div className="bg-white rounded-md py-6 px-6">
            <p className="text-slate-500 mt-3">Attendance</p>
           
        </div>
        <div className="bg-white rounded-md py-6 px-6 ">
            <div className="flex justify-between">
            <p className=" font-semibold">Schedule</p>
            <p className="text-[13px] my-3">April 24, 2024</p>

            </div>
           
            <div className="flex items-center space-x-3">
                <Image src="/maths.png" alt="teacher" width={100} height={100} className="w-[40px]  mt-3 rounded-md h-[40px]"/>
                <div className="flex flex-col">
                    <p className="text-[14px] font-semibold">Mathematics Class</p>
                    <p className="text-[13px]">09:00 - 10:00am</p> 
                   
                </div>
               
            </div> 
            <hr className="w-full mt-3 font-semibold text-black"/>

            <div className="flex items-center space-x-3">
            <Image src="/govt.png" alt="teacher" width={100} height={100} className="w-[40px]  mt-3 rounded-md h-[40px]"/>
                <div className="flex flex-col">
                    <p className="text-[14px] font-semibold">Government Class</p>
                    <p className="text-[13px]">09:00 - 10:00am</p> 
                   
                </div>
               
            </div> 
            <hr className="w-full my-3 font-semibold text-black"/>

            <div className="flex items-center space-x-3">
            <Image src="/crs.png" alt="teacher" width={100} height={100} className="w-[40px]  mt-3 rounded-md h-[40px]"/>
                <div className="flex flex-col">
                    <p className="text-[14px] font-semibold">C.R.S Class</p>
                    <p className="text-[13px]">09:00 - 10:00am</p> 
                   
                </div>
               
            </div> 
            <hr className="w-full my-3 font-semibold text-black"/>
            <div className="flex items-center space-x-3">
            <Image src="/chem.png" alt="teacher" width={100} height={100} className="w-[40px]  mt-3 rounded-md h-[40px]"/>
                <div className="flex flex-col">
                    <p className="text-[14px] font-semibold">Chemistry Class</p>
                    <p className="text-[13px]">09:00 - 10:00am</p> 
                   
                </div>
               
            </div> 
            <hr className="w-full my-3 font-semibold text-black"/>
        </div>
        
      </div>
      <SingleTeacherTable/>
    </div>
  );
};

export default SingleTeacher;
