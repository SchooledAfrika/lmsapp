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

const StudentTable = () => {
  const data = [
    {
      id: "m5gr84i9",
      studentImg: "/avatar-1.jpg",
      user: "Maurice Augustine",
      enrolledCourse: "Web Development",
      phone: "+9373473873",
      country: "Uganda",
      payment: "Cancelled",
      status: "Inactive",
      options: "...",
    },
    {
      id: "3u1reuv4",
      studentImg: "/avatar-1.jpg",
      user: "Maurice Augustine",
      enrolledCourse: "Web Development",
      phone: "+9373473873",
      country: "Uganda",
      payment: "Due",
      status: "Active",
      options: "...",
    },
    {
      id: "derv1ws0",
      studentImg: "/avatar-1.jpg",
      user: "Maurice Augustine",
      enrolledCourse: "Web Development",
      phone: "+9373473873",
      country: "Uganda",
      payment: "Paid",
      status: "Suspend",
      options: "...",
    },
    {
      id: "5kma53ae",
      studentImg: "/avatar-1.jpg",
      user: "Maurice Augustine",
      enrolledCourse: "Web Development",
      phone: "+9373473873",
      country: "Uganda",
      payment: "Due",
      status: "Inactive",
      options: "",
    },
    {
      id: "dewe10",
      studentImg: "/avatar-1.jpg",
      user: "Maurice Augustine",
      enrolledCourse: "Web Development",
      phone: "+9373473873",
      country: "Uganda",
      payment: "Paid",
      status: "Active",
      options: "",
    },
    {
      id: "de10",
      studentImg: "/avatar-1.jpg",
      user: "Maurice Augustine",
      enrolledCourse: "Web Development",
      phone: "+9373473873",
      country: "Uganda",
      payment: "Cancelled",
      status: "Suspend",
      options: "",
    },
    {
      id: "dewe",
      studentImg: "/avatar-1.jpg",
      user: "Maurice Augustine",
      enrolledCourse: "Web Development",
      phone: "+9373473873",
      country: "Uganda",
      payment: "Due",
      status: "Active",
      options: "",
    },
    {
      id: "5kma53ae",
      studentImg: "/avatar-1.jpg",
      user: "Maurice Augustine",
      enrolledCourse: "Web Development",
      phone: "+9373473873",
      country: "Uganda",
      payment: "Paid",
      status: "Inactive",
      options: "",
    },
  ];

  return (
    <Table className="bg-white overflow-x-auto rounded-md my-6">
      <TableHeader>
        <TableRow className="text-[14px]">
          <TableHead className="">User</TableHead>
          <TableHead className="">Enrolled Course</TableHead>
          <TableHead className="">Phone</TableHead>
          <TableHead className="">Country</TableHead>
          <TableHead className="">Payment</TableHead>
          <TableHead className="">Status</TableHead>
          <TableHead className="">Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((student, index) => (
          <TableRow key={index} className="">
            <TableCell className="font-bold text-[15px]">
              <Link
                className="flex items-center gap-4"
                href={"/admin-dashboard/students/details"}
              >
                <Image
                  src={student.studentImg}
                  alt="Student Image"
                  width={50}
                  height={10}
                  className="rounded-[100%] h-[50px]"
                />
                <div className="leading-none">
                  {student.user} <br />
                  <span className="text-[12px] text-gray-400">
                    mauriceodo@gmail.com
                  </span>
                </div>
              </Link>
            </TableCell>

            <TableCell className="text-[12px] font-semibold">
              {student.enrolledCourse}
            </TableCell>
            <TableCell className="text-[12px] font-semibold">
              {student.phone}
            </TableCell>
            <TableCell className="text-[12px] font-semibold">
              {student.country}
            </TableCell>
            <TableCell
              className={`${
                student.payment === "Paid"
                  ? "text-green-500"
                  : student.payment === "Due"
                  ? "text-yellow-500"
                  : "text-red-500"
              } text-[12px] font-semibold`}
            >
              {student.payment}
            </TableCell>
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
              <StudentPopover />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StudentTable;
