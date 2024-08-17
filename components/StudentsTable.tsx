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
import { TableSkeleton } from "./TableSkeleton";
import StudentOptions from "./StudentOptions";
import { NoItem, LoadingTable } from "./TeachersTable";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { useConversion } from "@/data-access/conversion";

interface IstudentInfo {
  name: string;
  profilePhoto: string;
  email: string;
  phoneNo: string;
}

interface IstudentSchool {
  id: string;
  status: string;
  createdAt: string;
  student: IstudentInfo;
  classes: string[];
}

// the part showing information about the table for students
const StudentInfo: React.FC<{ student: IstudentSchool }> = ({ student }) => {
  const { joinByComma } = useConversion();
  return (
    <TableRow className="">
      <TableCell className="font-semibold w-[200px] text-[14px]  flex  items-center gap-2">
        <Image
          src={student?.student.profilePhoto}
          alt="studentimage"
          width={200}
          height={200}
          className=" w-[45px] h-[45px] rounded-md"
        />
        <div className=" flex flex-col gap-1">
          <p className="font-bold text-black text-[12px]">
            {student?.student.name}
          </p>
          <div
            className={` px-2 w-fit py-1 rounded-md ${
              student?.status == "PENDING"
                ? " bg-yellow-500 text-white"
                : student?.status == "ACTIVE"
                ? "bg-green-700 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            <p className=" text-[8px]">{student?.status}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-[12.5px] font-semibold">
        <div className="flex flex-col">
          <div className="text-[12px] flex items-center gap-2  font-medium">
            <FaEnvelope className="text-[10px" />
            <p className="text-[10px">{student.student.email}</p>
          </div>
          <div className="text-[12px] flex items-center gap-2  font-medium">
            <FaPhoneAlt className="" />
            <p className="text-[10px]">{student.student.phoneNo}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-[12.5px] font-semibold max-w-[150px] ">
        {student.classes.length === 0 ? (
          <p>N/A</p>
        ) : (
          <small>{joinByComma(student.classes)}</small>
        )}
      </TableCell>

      <TableCell className="float-right text-[16px]  text-lightGreen cursor-pointer">
        <StudentOptions offerId={student.id} />
      </TableCell>
    </TableRow>
  );
};

// the main component for showing students in school
export default function StudentsTable() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["addStudent"],
    queryFn: async () => {
      const response = await fetch("/api/add-student-by-school");
      const result = await response.json();
      return result;
    },
  });
  //   if is loading
  if (isLoading) {
    return (
      <div className=" mt-10">
        <LoadingTable />
      </div>
    );
  }
  // if is error
  if (isError) {
    return <div className=" flex-1">{error.message}</div>;
  }
  return (
    <div>
      {Array.isArray(data) && (
        <div>
          {data.length === 0 ? (
            <NoItem itemName="Student" />
          ) : (
            <Table className="bg-white overflow-x-auto    rounded-md mt-12">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[12px]">Name</TableHead>
                  <TableHead className="text-[12px]">Contacts</TableHead>
                  <TableHead className="text-[12px]">Classrooms</TableHead>
                  <TableHead className="text-right text-[12px]">
                    Options
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((student: IstudentSchool, index) => (
                  <StudentInfo key={index} student={student} />
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      )}
    </div>
  );
}
