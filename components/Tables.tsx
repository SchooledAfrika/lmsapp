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
import Link from "next/link";
import { TableSkeleton } from "@/components/TableSkeleton";
import { AssignDialog } from "./AssignDialog";
import OptionsDialog from "./OptionsDialog";



const Tables = () => {

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["addSchool"],
    queryFn: async () => {
      const response = await fetch("/api/class-action");
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
          <TableHead className=" text-[12px]">Name</TableHead>
          <TableHead className="text-[12px] w-[150px]">Grade</TableHead>
          <TableHead className="text-[12px]">Teacher</TableHead>
          {/* <TableHead className="text-[12px]">Students</TableHead> */}
          <TableHead className="text-right text-[12px]">Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {Array.isArray(data) &&
          data.map((item: any) => (
          <TableRow key={item.id} className="">
            <TableCell className="text-[12px] font-bold px-2 py-1 flex  gap-2">
              <Image
                src={`/${item?.subject.toLowerCase()}.png`}
                alt="icon"
                width={25}
                height={25}
                className="w-[30px] h-[30px] mr-1"
              />
              {item.subject}
            </TableCell>
            <TableCell className="text-[12px]  font-semibold">{item.name}</TableCell>
            <TableCell className="text-[12px] w-[150px]   font-semibold">{item.grade}</TableCell>
            <TableCell
              className="border-lightGreen   cursor-pointer text-[11px]  font-bold text-lightGreen rounded-xl"
              
            >
              <AssignDialog subject={item.subject}/>
            </TableCell>

            {/* <TableCell className="text-[13px]  font-semibold">{Class.students}</TableCell> */}
            <TableCell className="  text-[16px] float-right pr-3  text-lightGreen cursor-pointer">
             <OptionsDialog classId={item.id}/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default Tables
