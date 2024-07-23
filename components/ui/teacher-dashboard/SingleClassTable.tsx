"use client";
import React from "react";

import { useQuery, useQueries } from "@tanstack/react-query";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useParams } from "next/navigation";
// import Image from "next/image";
// import IndividualClass from "./IndividualClass";
// import SingleClassroom from "./SingleClassroom";
import { TableSkeleton } from "@/components/TableSkeleton";
import Image from "next/image";

interface ISingular {
  dataId: string;
  studentIds: string[];
}

const SingleClassTable: React.FC<ISingular> = ({ studentIds, dataId }) => {
  console.log(studentIds);

  // getting individual student IDs using parallel query with usequeries

  const queries = useQueries({
    queries: studentIds?.map((id: any) => {
      console.log(id);
      return {
        queryKey: ["student", id],
        queryFn: async () => {
          const response = await fetch(`/api/about-student/${id}`);
          const result = await response.json();
          return result;
        },
      };
    }),
  });

  const arrayOfStudent = queries.map((item) => item.data);

  return (
    <Table className="bg-white overflow-x-auto    rounded-md my-6">
      <TableHeader>
        <p className="px-3 py-4 font-bold text-[15px]">Students</p>

        <TableRow className="text-[13px]">
          <TableHead>Name</TableHead>
          <TableHead className="">Start Date</TableHead>
          <TableHead className="">Sessions Attended</TableHead>
          {/* <TableHead className="text-right">Options</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {arrayOfStudent.map((student: any, index) => (
          <TableRow key={index} className="">
            <TableCell className="font-bold text-[13px] mr-3">
              <Image
                src={student?.profilePhoto}
                alt="icon"
                width={100}
                height={100}
                className="w-[40px] h-[40px] mr-1"
              />
              {student?.name}
            </TableCell>
            <TableCell className="text-[12px]  font-semibold">
              {student?.createdAt}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default SingleClassTable;
