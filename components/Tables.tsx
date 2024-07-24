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

interface schoolTableProps {
  subject: string;
}

const Tables: React.FC<schoolTableProps> = ({subject}) => {

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["addSchool"],
    queryFn: async () => {
      const response = await fetch("/api/class-action");
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
            <TableCell className="font-bold  w-[230px] text-[12px]  mr-3">
              {/* <Image
                src={Class.icon}
                alt="icon"
                width={100}
                height={100}
                className="w-[50px] h-[50px] mr-1"
              /> */}
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
