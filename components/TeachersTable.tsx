"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Image from "next/image";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

import { TableSkeleton } from "@/components/TableSkeleton";
import TeacherOptions from "./TeacherOptions";


// const TeachersType = [
//   {
//     id: "1",
//     icon: "/teacher-img.png",
//     name: "Odo Maurice ",
//     mail: "odo@gmail.com",
//     phone: "+2349130893924",
//     subject: "Mathematics, English, Accounting",
//     Grade: "Grade 10, Grade 11, & Grade 12",

//     Added: "April 20, 2024",
//     active: "Active",
//     status: "Teacher",
//     options: "...",
//   },
//   {
//     id: "2",
//     icon: "/tutors.jpg",
//     name: "Augustine David",
//     mail: "odo@gmail.com",
//     phone: "+2349130893924",
//     subject: "Mathematics, English, Accounting",
//     Grade: "Grade 10, Grade 11, & Grade 12",
//     Added: "April 20, 2024",
//     pending: "pending",
//     status: "Teacher",
//     options: "...",
//   },
// ];

const TeachersTable = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["addTeacher"],
    queryFn: async () => {
      const response = await fetch("/api/add-teacher-by-school");
      const result = await response.json();
      return result;
    },
  });
  console.log(data)
  //   if is loading
  if (isLoading) {
    return (
      <div className="">
        <p className="my-4 font-bold">loading...</p>

       
      </div>
    );
  }
  // if is error
  if (isError) {
    return <div className=" flex-1">{error.message}</div>;
  }

  

  return (
    <Table className="bg-white overflow-x-auto    rounded-md mt-12">
      <TableHeader>
        <TableRow>
          <TableHead className="text-[12px]">Name</TableHead>
          <TableHead className=" text-[12px]">Contact</TableHead>
          <TableHead className="text-[12px]">Subject</TableHead>
          <TableHead className="text-[12px]">Grade</TableHead>
          <TableHead className="text-[12px]">Date</TableHead>
          <TableHead className="text-right text-[12px]">Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {Array.isArray(data) &&
      data.map((item: any) => (
          <TableRow key={item.id}   className="">
            <TableCell className="font-bold text-[13px] mt-2 md:mt-0 w-[200px]  flex  mr-1">
              {/* <Image
                src={Teacher.icon}
                alt="icon"
                width={100}
                height={100}
                className="w-[60px] h-[60px] rounded-md mr-1"
              />{" "} */}
              <div className="flex ml-1 flex-col">
                <div></div>
                {/* <div className="flex  mt-2 justify-between">
                    <p
                      className={`${
                       
                          ? "text-[11px] px-[20px]  py-[5px] text-center rounded-md mr-3 bg-lightGreen text-white"
                          : "text-[11px] px-[20px]  py-[5px] text-center rounded-md mr-3 bg-gold text-white"
                      }`}
                    >
                     
                    </p>
                   
                  </div> */}
                
                 
                  
               
              </div>
            </TableCell>
            <TableCell className="">
              <div className="flex flex-col">
                <p className="inline mb-2 text-[12px] font-medium">
                  <FaEnvelope className="inline mr-1 " />
                
                </p>
                <p className="inline text-[12px] font-medium">
                  <FaPhoneAlt className="inline mr-1" />
                  
                </p>
              </div>
            </TableCell>
            <TableCell className="text-[12px]  font-medium"></TableCell>

            <TableCell className="text-[12px]  font-medium"></TableCell>
            <TableCell className="text-[12px]  font-medium"></TableCell>
            <TableCell className="float-right  text-[16px]   text-lightGreen cursor-pointer">
            {/* <TeacherOptions /> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TeachersTable
