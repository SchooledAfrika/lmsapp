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

import { TableSkeleton } from "@/components/TableSkeleton";
import IndividualClass from "./IndividualClass";



const ClassTable = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["add"],
    queryFn: async () => {
      const response = await fetch("/api/class");
      const result = await response.json();
      return result;
    },
  });
  //   if is loading
  if (isLoading) {
    return (
      <div className="">
        <p className="my-4 font-bold">loading...</p>

        <TableSkeleton />
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
          <TableHead className="text-[12px]">Subject</TableHead>
          <TableHead className="md:w-[100px] text-[12px]">Class</TableHead>
          <TableHead className="text-[12px]">Grade</TableHead>
          <TableHead className="text-[12px]">Students</TableHead>
          <TableHead className="text-right text-[12px]">Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.isArray(data) &&
          data.map((item: any) => (
            <TableRow key={item.id} className="">
              <TableCell className="font-bold text-[13px] mr-3">
                {/* <Image
                  src=""
                  alt="icon"
                  width={100}
                  height={100}
                  className="w-[40px] h-[40px] mr-1"
                /> */}
                {item.subject}
              </TableCell>
              <TableCell className="text-[12px]  font-semibold">
                {item.className}
              </TableCell>
              <TableCell className="text-[12px]  font-semibold">
                {item.grade}
              </TableCell>
              {/* <TableCell
                className=""
              >

                   
                <div  className={`${
                      item.publicClass
                        ? "rotate-[45deg] text-[12px] w-[33px] rounded-[5px] py-2 pl-2 pr-6 mx-auto  font-bold  bg-dimOrange"
                        :  "font-bold mx-auto text-[12px]"
                    }`} >
                   {item.publicClass} 
                </div>
               
              </TableCell> */}

              <TableCell className="text-[13px]  font-semibold">
                {item.maxCapacity}
              </TableCell>

              <TableCell className="float-right text-[16px]  text-lightGreen cursor-pointer">
                <IndividualClass dataId={item.id} />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default ClassTable;
