import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MdOutlineMail } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import TeacherDetails from "./TeacherDetails";

const SingleTeacher = () => {
  return (
    <div className="font-header md:mt-12 mt-24">
      <div className="flex justify-between">
        <p className="font-bold text-lg">Details</p>
        <Link href="/parents-dashboard/teachers" className="cursor-pointer">
          <Image
            src="/closeAlt.svg"
            alt="cancel"
            width={100}
            height={100}
            className="w-[20px] h-[20px]"
          />
        </Link>
      </div>

      <div className="grid font-subtext md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 my-6">
        <div className=" flex flex-col space-y-8">
          <div className=" bg-white flex pl-3 pr-4 py-6 rounded-md  space-x-3 pb-2">
            <Image
              src="/tutors.jpg"
              alt=""
              width={100}
              height={100}
              className="rounded-md w-[100px] h-[100px]"
            />

            <div className=" ">
              <p className=" text-[13px] font-bold">Alex Iwobi Samuel</p>
              <p className="my-3 text-[11.5px] font-semibold">Grade 11</p>

              <Link
                href="/"
                className="inline bg-lightGreen hover:bg-green-700 rounded-md text-white text-[13px] mt-3 px-12 py-2      text-center lg:block"
              >
                <MdOutlineMail className="inline mr-1 font-semibold" />
                Contact
              </Link>
            </div>
          </div>
          <div className="bg-white px-6 py-6 rounded-md">
            <h3 className="font-bold py-2 text-[15px]">Parent Information</h3>
            <p className="text-[12px]">Dr Alex Samson</p>
            <Link
              href="/"
              className="inline-flex bg-lightGreen hover:bg-green-700 rounded-md text-white  text-[13px] mt-3 px-6 py-2      text-center lg:block"
            >
              <MdOutlineMail className="inline mr-1 font-semibold" />
              Contact
            </Link>
          </div>
        </div>

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
        <div className="bg-white rounded-md py-6 px-6 ">
          <div className="flex justify-between">
            <p className=" font-bold text-[15px]">Schedule</p>
            <p className="text-[12px] font-semibold my-2">April 24, 2024</p>
          </div>

          <div className="flex items-center space-x-3">
            <Image
              src="/maths.png"
              alt="teacher"
              width={100}
              height={100}
              className="w-[30px]  mt-3 rounded-md h-[30px]"
            />
            <div className="flex flex-col font-header">
              <p className="text-[13px] font-bold">Mathematics Class</p>
              <p className="text-[11.5px]">09:00 - 10:00am</p>
            </div>
          </div>
          <hr className="w-full mt-2 font-semibold text-black" />

          <div className="flex items-center space-x-3">
            <Image
              src="/govt.png"
              alt="teacher"
              width={100}
              height={100}
              className="w-[30px]  mt-3 rounded-md h-[30px]"
            />
            <div className="flex flex-col font-header">
              <p className="text-[13px] font-bold">Government Class</p>
              <p className="text-[11.5px]">09:00 - 10:00am</p>
            </div>
          </div>
          <hr className="w-full my-2 font-semibold text-black" />

          <div className="flex items-center space-x-3">
            <Image
              src="/crs.png"
              alt="teacher"
              width={100}
              height={100}
              className="w-[40px]  mt-3 rounded-md h-[40px]"
            />
            <div className="flex flex-col font-header">
              <p className="text-[13px] font-bold">C.R.S Class</p>
              <p className="text-[11.5px]">09:00 - 10:00am</p>
            </div>
          </div>
          <hr className="w-full my-2 font-semibold text-black" />
          <div className="flex items-center space-x-3">
            <Image
              src="/chem.png"
              alt="teacher"
              width={100}
              height={100}
              className="w-[30px]  mt-3 rounded-md h-[30px]"
            />
            <div className="flex flex-col font-header">
              <p className="text-[13px] font-bold">Chemistry Class</p>
              <p className="text-[11.5px]">09:00 - 10:00am</p>
            </div>
          </div>
          <hr className="w-full my-3 font-semibold text-black" />
        </div>
      </div>
      <TeacherDetails/>
    </div>
  );
};

export default SingleTeacher;
