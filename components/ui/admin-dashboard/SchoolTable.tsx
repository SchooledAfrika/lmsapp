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
import SchoolPopover from "./schools/SchoolPopover";
import Image from "next/image";

const SchoolTable = () => {
  const data = [
    {
      id: "m5gr84i9",
      schoolImg: "/card-img.jpg",
      schoolName: "Maurice Secondary School, Jos Plateau State.",
      noOfStudent: "12",
      noOfTeachers: "33",
      noOfSubjects: "33",
      options: "",
    },
    {
      id: "3u1reuv4",
      schoolImg: "/card-img.jpg",
      schoolName: "Maurice Secondary School, Jos Plateau State.",
      noOfStudent: "12",
      noOfTeachers: "33",
      noOfSubjects: "33",
      options: "",
    },
    {
      id: "derv1ws0",
      schoolImg: "/card-img.jpg",
      schoolName: "Maurice Secondary School, Jos Plateau State.",
      noOfStudent: "12",
      noOfTeachers: "33",
      noOfSubjects: "33",
      options: "",
    },
    {
      id: "5kma53ae",
      schoolImg: "/card-img.jpg",
      schoolName: "Maurice Secondary School, Jos Plateau State.",
      noOfStudent: "12",
      noOfTeachers: "33",
      noOfSubjects: "33",
      options: "",
    },
    {
      id: "dewe10",
      schoolImg: "/card-img.jpg",
      schoolName: "Maurice Secondary School, Jos Plateau State.",
      noOfStudent: "12",
      noOfTeachers: "33",
      noOfSubjects: "33",
      options: "",
    },
    {
      id: "de10",
      schoolImg: "/card-img.jpg",
      schoolName: "Maurice Secondary School, Jos Plateau State.",
      noOfStudent: "12",
      noOfTeachers: "33",
      noOfSubjects: "33",
      options: "",
    },
    {
      id: "dewe",
      schoolImg: "/card-img.jpg",
      schoolName: "Maurice Secondary School, Jos Plateau State.",
      noOfStudent: "12",
      noOfTeachers: "33",
      noOfSubjects: "33",
      options: "",
    },
    {
      id: "5kma53ae",
      schoolImg: "/card-img.jpg",
      schoolName: "Maurice Secondary School, Jos Plateau State.",
      noOfStudent: "12",
      noOfTeachers: "33",
      noOfSubjects: "3",
      options: "",
    },
  ];

  return (
    <Table className="bg-white overflow-x-auto rounded-md my-6">
      <TableHeader>
        <TableRow className="text-[13px]">
          <TableHead>School Name</TableHead>
          <TableHead className="">Number of Students</TableHead>
          <TableHead className="">Number of Teachers</TableHead>
          <TableHead className="">Number of Subjects</TableHead>
          <TableHead className="">Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((school, index) => (
          <TableRow key={index} className="">
            <TableCell className="font-bold text-[15px]">
              <Link
                className="flex items-center gap-4"
                href={`/admin-dashboard/schools/details`}
              >
                <Image
                  src={school.schoolImg}
                  alt="Student Image"
                  width={50}
                  height={10}
                  className="rounded h-[50px]"
                />
                {school.schoolName}
              </Link>
            </TableCell>
            <TableCell className="text-[12px] font-semibold">
              {school.noOfStudent}
            </TableCell>
            <TableCell className="text-[12px] font-semibold">
              {school.noOfTeachers}
            </TableCell>
            <TableCell className="text-[12px] font-semibold">
              {school.noOfSubjects}
            </TableCell>
            <TableCell className="text-[16px] text-lightGreen cursor-pointer text-center p-2">
              <SchoolPopover />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SchoolTable;
