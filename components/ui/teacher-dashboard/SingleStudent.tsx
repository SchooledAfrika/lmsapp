
"use client";
import React from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import { SiGoogleclassroom } from "react-icons/si";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsBroadcast } from "react-icons/bs";
import StudentDetails from "./StudentDetails";
import { CiMail } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { useParams } from "next/navigation";

interface ISingularStudentProps {
  classIds: string[];
}

const SingleStudent = ({classIds}:ISingularStudentProps) => {
  const { id } = useParams();
  console.log(id);

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["add"],
    queryFn: async () => {
      const response = await fetch(`/api/about-student/${id}`);
      const result = await response.json();
      return result;
    },
  });
  console.log(data)

  // getting individual student IDs using parallel query with usequeries

  // const queries = useQueries({
  //   queries: classIds?.map((id: any) => {
  //     console.log(id);
  //     return {
  //       queryKey: ["class", id],
  //       queryFn: async () => {
  //         const response = await fetch(`/api/about-student/${id}`);
  //         const result = await response.json();
  //         return result;
  //       },
  //     };
  //   }),
  // });
  //   if is loading
  if (isLoading) {
    return (
      <div className="">
        <p className="my-4 font-bold">loading...</p>

        {/* <TableSkeleton /> */}
      </div>
    );
  }
  // if is error
  if (isError) {
    return <div className=" flex-1">{error.message}</div>;
  }

  //const arrayOfClass = queries.map((item) => item.data);
  return (
    <div>

   
    {data && (
    <div key={data.id} className="font-header md:mt-12 mt-24">
      <div className="flex justify-between">
        <p className="font-bold text-lg">Details</p>
        <Link href={`/teacher-dashboard/classroom/individual-session/${id}`} className="cursor-pointer">
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
              src={data.profilePhoto}
              alt="profilePhoto"
              width={100}
              height={100}
              className="rounded-md w-[100px] h-[100px]"
            />

            <div className=" ">
              <p className=" text-[13px] font-bold">{data.name}</p>
              <p className="my-3 text-[11.5px] font-semibold">{data.grade}</p>

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

        <div className="bg-white font-header  rounded-md py-6 px-3">
            <div className="flex space-x-4">
            <p className="font-bold text-[15px] ">Attendance</p>
            <div className="">
            <p className="text-[10px] inline"> <GoDotFill className="inline text-lightGreen"/> Class Attended</p>
            <p className="text-[10px] inline"> <GoDotFill className="inline text-red-500"/> Class Attended</p>
            </div>
            </div>
          
             {/* first */}
            <div className="flex  justify-between">
            <div className="flex my-4 space-x-4">
          <div className="flex flex-col space-y-1">
            <p className="text-[12px] font-semibold">9:00am</p>
            <p className="text-[12px] font-semibold">10:00am</p>
          </div>
          <div className=" border-2 border-lightGreen rounded-full "></div>
          <div className="flex flex-col space-y-1">
            <p className="text-[13px] font-semibold">Mathematics Class</p>
            <p className="text-slate-500 text-[12.5px]">Odo Maurice</p>
          </div> 
        </div>
       <GoDotFill className="my-6 text-red-500"/> 

            </div>
            <hr/>
              {/* second */}
            <div className="flex  justify-between">
            <div className="flex my-4 space-x-4">
          <div className="flex flex-col space-y-1">
            <p className="text-[12px] font-semibold">9:00am</p>
            <p className="text-[12px] font-semibold">10:00am</p>
          </div>
          <div className=" border-2 border-dimOrange rounded-full "></div>
          <div className="flex flex-col space-y-1">
            <p className="text-[13px] font-semibold">Chemistry Class</p>
            <p className="text-slate-500 text-[12.5px]">Augustine David</p>
          </div> 
        </div>
       <GoDotFill className="my-6 text-lightGreen"/> 

            </div>
            <hr/>
             {/* third */}
            <div className="flex  justify-between">
            <div className="flex my-4 space-x-4">
          <div className="flex flex-col space-y-1">
            <p className="text-[12px] font-semibold">9:00am</p>
            <p className="text-[12px] font-semibold">10:00am</p>
          </div>
          <div className=" border-2 border-dimYellow rounded-full "></div>
          <div className="flex flex-col space-y-1">
            <p className="text-[13px] font-semibold">Economics Class</p>
            <p className="text-slate-500 text-[12.5px]">Adebayor Sarah</p>
          </div> 
        </div>
       <GoDotFill className="my-6 text-lightGreen"/> 

            </div>
            <hr/>

            <Link href="/" className="text-lightGreen underline font-bold text-[13px] mt-2 flex justify-end">View More Details</Link>
        

         
          
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
      <StudentDetails />
    </div>
     )}
     </div>
     
  );
};

export default SingleStudent;
