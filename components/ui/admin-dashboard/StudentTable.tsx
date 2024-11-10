// StudentTable.js
"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StudentPopover from "./students/studentPopover";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { TableSkeleton } from "@/components/TableSkeleton";
import { Noprofile } from "./sessions/Sessions";

const StudentTable = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["Students"],
    queryFn: async () => {
      const response = await fetch("/api/students");
      const result = await response.json();
      return result;
    },
  });
  console.log(data);

  if (isLoading) {
    return (
      <div className="">
        <p className="my-4 font-bold">loading...</p>
        <TableSkeleton />
      </div>
    );
  }

  if (isError) {
    return <div className="flex-1">{error.message}</div>;
  }
  console.log(data);
  return (
    <Table className="bg-white overflow-x-auto rounded-md my-6">
      <TableHeader>
        <TableRow className="text-[14px] p-0">
          <TableHead className="!pl-10">User</TableHead>
          <TableHead className="">Phone</TableHead>
          <TableHead className="">Country</TableHead>
          {/* <TableHead className="">Payment</TableHead> */}
          <TableHead className="">Status</TableHead>
          <TableHead className="pl-3">Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((student: any) => (
          <TableRow key={student.id} className="">
            <TableCell className="font-bold !pl-9 text-[15px]">
              <Link
                className="flex items-center gap-4"
                href={`/admin-dashboard/students/${student.id}`}
              >
                {student.profilePhoto ? (
                  <Image
                    src={student.profilePhoto}
                    alt="Student Image"
                    width={50}
                    height={10}
                    className="rounded-[100%] h-[50px]"
                  />
                ) : (
                  <Noprofile />
                )}

                <div className="leading-none">
                  {student.name} <br />
                  <span className="text-[12px] text-gray-400">
                    {student.email}
                  </span>
                </div>
              </Link>
            </TableCell>

            <TableCell className="text-[12px] font-semibold">
              {student.phoneNo}
            </TableCell>
            <TableCell className="text-[12px] font-semibold">
              {student.country}
            </TableCell>
            {/* <TableCell
              className={`${
                student.payment === "Paid"
                  ? "text-green-500"
                  : student.payment === "Due"
                  ? "text-yellow-500"
                  : "text-red-500"
              } text-[12px] font-semibold`}
            >
              {student.payment}
            </TableCell> */}
            <TableCell
              className={`${
                student.status === "Active"
                  ? "text-green-500"
                  : student.status === "Inactive"
                  ? "text-yellow-500"
                  : "text-red-500"
              } text-[12px] font-semibold`}
            >
              {student.status}
            </TableCell>
            <TableCell className="text-[16px] text-lightGreen cursor-pointer text-center p-2">
              <StudentPopover studentId={student.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StudentTable;
