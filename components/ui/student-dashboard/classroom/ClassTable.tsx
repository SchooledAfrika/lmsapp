"use client";

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
import { ClassOptions } from "../ClassOptions";
import { useQuery } from "@tanstack/react-query";
import { LoadingTable } from "@/components/TeachersTable";
import React from "react";
import { Noitem } from "@/components/ApplicantsTable";

interface IStudentClass {
  id: string;
  name: string;
  subjects: string;
  grade: string;
  createdAt: string;
  type: string;
}

// each class row
const EachClass: React.FC<{ item: IStudentClass }> = ({ item }) => {
  return (
    <TableRow key={item.id} className="">
      <TableCell className="text-[12px] font-bold">
        <div className=" flex items-center gap-1">
          <Image
            src={`/${item?.subjects.toLowerCase()}.png`}
            alt="icon"
            width={25}
            height={25}
            className="w-[30px] h-[30px] mr-1"
          />
          <p>{item.subjects}</p>
        </div>
      </TableCell>
      <TableCell className="text-[12px]  font-semibold">{item.name}</TableCell>
      <TableCell className="text-[12px]   font-semibold">
        {item.grade}{" "}
      </TableCell>
      <TableCell className="border-lightGreen   cursor-pointer text-[11px]  font-bold">
        {item.type}
      </TableCell>
      <TableCell className="text-[12px]  font-semibold">
        <Link href={"/"}>view more</Link>
      </TableCell>
    </TableRow>
  );
};
export default function ClassTable() {
  const { data, isFetching, error, isError } = useQuery({
    queryKey: ["class-for-student"],
    queryFn: async () => {
      const response = await fetch("/api/all-classes");
      const result = await response.json();
      return result;
    },
  });
  if (isFetching) {
    return (
      <div className=" mt-5">
        <LoadingTable />
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );
  }
  const details: IStudentClass[] = data;
  return (
    <div>
      {Array.isArray(details) && (
        <div>
          {details.length === 0 ? (
            <div>
              <Noitem desc="no class, pay for a class" />
            </div>
          ) : (
            <Table className="bg-white overflow-x-auto rounded-md mt-12">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[12px]">Subject</TableHead>
                  <TableHead className=" text-[12px]">Class Name</TableHead>
                  <TableHead className="text-[12px]">Grade</TableHead>
                  <TableHead className="text-[12px]">Class type</TableHead>
                  <TableHead className="text-[12px]">action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {details.map((item: IStudentClass, index) => (
                  <EachClass key={index} item={item} />
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      )}
    </div>
  );
}
