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
import Link from "next/link";
import EditStudentCourse from "./students/editStudentCourse/editStudentCourse";

const AdminCoursesList = () => {
  const data = [
    {
      id: "m5gr84i9",
      list: "1",
      courseList: "Learning Andriod Development with project",
      status: "Active",
      options: "Delete",
    },
    {
      id: "3u1reuv4",
      list: "2",
      courseList: "Learning Andriod Development with project",
      status: "Pending",
      options: "Delete",
    },
    {
      id: "derv1ws0",
      list: "3",
      courseList: "Learning Andriod Development with project",
      status: "Canceled",
      options: "Delete",
    },
    {
      id: "5kma53ae",
      list: "4",
      courseList: "Learning Andriod Development with project",
      status: "Active",
      options: "Delete",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold text-[25px]">Enrolled Courses</p>
          <span>Here are the courses the student registered</span>
        </div>
        <EditStudentCourse />
      </div>
      <>
        <p className="mt-5 bg-gray-200 text-[14px] p-2 rounded">Basics</p>
      </>

      <Table className="bg-white overflow-x-auto rounded-md my-6">
        <TableHeader>
          <TableRow className="text-[13px]">
            <TableHead>#</TableHead>
            <TableHead className="">Courses List</TableHead>
            <TableHead className="">Status</TableHead>
            <TableHead className=""></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((courselist, index) => (
            <TableRow key={index} className="">
              <TableCell className="font-bold text-[15px]">
                <Link href={`/admin-dashboard/students/details`}>
                  {courselist.list}
                </Link>
              </TableCell>
              <TableCell className="text-[12px] font-semibold">
                {courselist.courseList}
              </TableCell>
              <TableCell
                className={`${
                  courselist.status === "Active"
                    ? "text-green-500"
                    : courselist.status === "Pending"
                    ? "text-yellow-500"
                    : "text-red-500"
                }text-[12px] font-semibold`}
              >
                {courselist.status}
              </TableCell>
              <TableCell className="text-[12px] cursor-pointer text-red-500 font-semibold">
                {courselist.options}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminCoursesList;
