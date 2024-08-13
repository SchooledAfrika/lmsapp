// CourseTable.js
"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdminCourseInfo from "./AdminCourseInfo";
import Link from "next/link";
import Image from "next/image";

const CourseTable = () => {
  const data = [
    {
      id: "m5gr84i9",
      courseImg: "/avatar-1.jpg",
      courseName: "Responsive Design",
      category: "Web Development",
      instructor: "David Augustine",
      lesson: "0",
      status: "Active",
      price: "$30",
      options: "...",
    },
    {
      id: "3u1reuv4",
      courseImg: "/avatar-1.jpg",
      courseName: "Responsive Design",
      category: "Web Development",
      instructor: "David Augustine",
      lesson: "0",
      status: "Active",
      price: "$30",
      options: "...",
    },
    {
      id: "derv1ws0",
      courseImg: "/avatar-1.jpg",
      courseName: "Responsive Design",
      category: "Web Development",
      instructor: "David Augustine",
      lesson: "14",
      status: "Pending",
      price: "$30",
      options: "...",
    },
    {
      id: "5kma53ae",
      courseImg: "/avatar-1.jpg",
      courseName: "Responsive Design",
      category: "Web Development",
      instructor: "David Augustine",
      lesson: "22",
      status: "Active",
      price: "$30",
      options: "",
    },
    {
      id: "dewe10",
      courseImg: "/avatar-1.jpg",
      courseName: "Responsive Design",
      category: "Cybersecurity",
      instructor: "Maurice Odo",
      lesson: "12",
      status: "Active",
      price: "$30",
      options: "...",
    },
    {
      id: "de10",
      courseImg: "/avatar-1.jpg",
      courseName: "Responsive Design",
      category: "Data Analysis",
      instructor: "Augustine Peterson",
      lesson: "4",
      status: "Pending",
      price: "$400",
      options: "...",
    },
    {
      id: "dewe",
      courseImg: "/avatar-1.jpg",
      courseName: "Responsive Design",
      category: "Web Development",
      instructor: "David Augustine",
      lesson: "0",
      status: "Active",
      price: "$40",
      options: "...",
    },
    {
      id: "5kma53ae",
      courseImg: "/avatar-1.jpg",
      courseName: "Responsive Design",
      category: "Web Development",
      instructor: "David Augustine",
      lesson: "53",
      status: "Pending",
      price: "$30",
      options: "",
    },
  ];

  return (
    <Table className="bg-white overflow-x-auto rounded-md my-6">
      <TableHeader>
        <TableRow className="text-[13px]">
          <TableHead>Course Name</TableHead>
          <TableHead className="">Category</TableHead>
          <TableHead className="">Instructor</TableHead>
          <TableHead className="">Lesson</TableHead>
          <TableHead className="">Status</TableHead>
          <TableHead className="">Price</TableHead>
          <TableHead className="">Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((course, index) => (
          <TableRow key={index} className="">
            <TableCell className="flex items-center gap-4 font-bold text-[15px]">
              <Image
                src={course.courseImg}
                alt="Apple"
                width={50}
                height={10}
                className="rounded h-[50px]"
              />
              {course.courseName}
            </TableCell>
            <TableCell className="text-[12px] font-semibold">
              {course.category}
            </TableCell>
            <TableCell className="text-[12px] font-semibold">
              {course.instructor}
            </TableCell>
            <TableCell className="text-[12px] font-semibold">
              Total Lesson: {course.lesson}
            </TableCell>
            <TableCell
              className={`${
                course.status === "Active" ? "text-green-500 " : "text-red-500"
              } text-[12px] font-semibold`}
            >
              {course.status}
            </TableCell>
            <TableCell className="text-[12px] font-semibold">
              {course.price}
            </TableCell>
            <TableCell className="text-[16px] text-lightGreen cursor-pointer text-center p-2">
              <AdminCourseInfo />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CourseTable;
