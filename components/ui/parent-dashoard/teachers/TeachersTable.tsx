"use client";
import React, { useState, useEffect } from "react";
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
import { useWardId } from "@/data-access/conversion";
import { LoadingTable } from "@/components/TeachersTable";
import { Noitem } from "@/components/ApplicantsTable";

// Define types for teachers
interface Teacher {
  name: string;
  profilePhoto: string;
  status: string;
}

interface TeacherInfo {
  className: string;
  grade: string;
  subject: string;
  teacher: Teacher;
}

const TeachersTable = () => {
  const { wardId } = useWardId();

  // Fetch teachers data, only run query if wardId exists
  const { isLoading, isError, error, data } = useQuery<TeacherInfo[]>({
    queryKey: ["getTeachersForWard", wardId],
    queryFn: async () => {
      if (!wardId) return [];
      const response = await fetch(
        `/api/parents-gets-wards-teachers?childId=${wardId}`
      );
      if (!response.ok) throw new Error("Failed to fetch teachers");
      return response.json();
    },
    enabled: !!wardId, // The query will only run if wardId exists
  });

  if (isLoading) {
    return (
      <div>
        <LoadingTable />
      </div>
    );
  }

  if (isError) {
    return <p>Error: {error?.message}</p>;
  }

  if (!data || data.length === 0) {
    return (
      <div>
        <Noitem desc="No teacher yet" />
      </div>
    );
  }

  return (
    <Table className="bg-white text-black overflow-x-auto rounded-md mt-12">
      <TableHeader>
        <TableRow className="text-[12px]">
          <TableHead>Name</TableHead>
          <TableHead>Class</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Grade</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow
            className="text-[12px] w-[100px] font-semibold"
            key={item.teacher.name}
          >
            {" "}
            {/* Use a unique key, maybe teacher's name */}
            <TableCell className="flex items-center  mr-3">
              <Image
                src={item.teacher.profilePhoto}
                alt="icon"
                width={100}
                height={100}
                className="w-[40px] h-[40px] rounded-md mr-2"
              />{" "}
              {item.teacher.name}
            </TableCell>
            <TableCell>{item.className}</TableCell>
            <TableCell>{item.subject}</TableCell>
            <TableCell>{item.teacher.status}</TableCell>
            <TableCell>{item.grade}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TeachersTable;
