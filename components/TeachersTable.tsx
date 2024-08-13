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
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import TeacherOptions from "./TeacherOptions";
import { useConversion } from "@/data-access/conversion";
import { Skeleton } from "@mui/material";
interface ITeacherInfo {
  profilePhoto: string;
  name: string;
  phoneNo: string;
  email: string;
  id: string;
}
export interface ISchoolTeacher {
  id: string;
  schoolId: string;
  teacherId: string;
  status: string;
  createdAt: string;
  teacher: ITeacherInfo;
  grades: string[];
  subjects: string[];
}

export const LoadingTable = () => {
  const dummyArray = new Array(5).fill("");
  return (
    <div>
      <div className=" w-full px-4 py-2 bg-white rounded-md flex flex-col gap-2">
        {dummyArray.map((item, index) => (
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={50}
            className="w-full"
            key={index}
          />
        ))}
      </div>
      <div className=" w-full flex items-center justify-center mt-4">
        <p>Loading...</p>
      </div>
    </div>
  );
};

export const NoItem: React.FC<{ itemName: string }> = ({ itemName }) => {
  return (
    <div className=" mt-4 md:mt-20 w-full flex flex-col items-center justify-center gap-2">
      <Image
        src="/noitem.avif"
        alt="no-item"
        width={200}
        height={200}
        className=" w-[300px]"
      />
      <div className=" px-4 py-2 border border-green-700 rounded-md">
        <p>
          No {itemName}, add {itemName}
        </p>
      </div>
    </div>
  );
};

const Teachers = ({ item }: { item: ISchoolTeacher }) => {
  const { handleDate, joinByComma } = useConversion();
  return (
    <TableRow key={item.id} className="">
      <TableCell className="flex items-center gap-2">
        <Image
          src={item?.teacher.profilePhoto}
          alt="profile"
          width={200}
          height={200}
          className=" w-[50px] h-[50px] rounded-md"
        />
        <div className=" flex flex-col">
          <p className=" font-bold text-black text-[12px]">
            {item.teacher.name}
          </p>
          <div
            className={` px-2 w-fit py-1 rounded-md ${
              item.status == "PENDING"
                ? " bg-yellow-500 text-white"
                : item.status == "ACTIVE"
                ? "bg-green-700 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            <p className=" text-[8px]">{item.status}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="">
        <div className="flex flex-col">
          <div className="text-[12px] flex items-center gap-2  font-medium">
            <FaEnvelope className="text-[10px" />
            <p className="text-[10px">{item?.teacher.email}</p>
          </div>
          <div className="text-[12px] flex items-center gap-2  font-medium">
            <FaPhoneAlt className="" />
            <p className="text-[10px]">{item?.teacher.phoneNo}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-[12px]  font-medium max-w-[140px]">
        {item.subjects.length === 0 ? (
          <p>N/A</p>
        ) : (
          <small>{joinByComma(item.subjects)}</small>
        )}
      </TableCell>

      <TableCell className="text-[12px]  font-medium max-w-[140px]">
        {item.grades.length === 0 ? (
          <p>N/A</p>
        ) : (
          <small>{joinByComma(item.grades)}</small>
        )}
      </TableCell>
      <TableCell className="text-[12px]  font-medium">
        <p className=" text-[10px]">{handleDate(item.createdAt)}</p>
      </TableCell>
      <TableCell className="float-right  text-[16px]   text-lightGreen cursor-pointer">
        <TeacherOptions offerId={item?.id} />
      </TableCell>
    </TableRow>
  );
};

const TeachersTable = () => {
  const { handleDate } = useConversion();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["addTeacher"],
    queryFn: async () => {
      const response = await fetch("/api/add-teacher-by-school");
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
  console.log(data);
  // if is error
  if (isError) {
    return <div className=" flex-1">{error.message}</div>;
  }
  return (
    <div>
      {Array.isArray(data) && (
        <div>
          {data.length === 0 ? (
            <NoItem itemName="Teacher" />
          ) : (
            <Table className="bg-white overflow-x-auto    rounded-md mt-12">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[12px]">Name</TableHead>
                  <TableHead className=" text-[12px]">Contact</TableHead>
                  <TableHead className="text-[12px]">Subject</TableHead>
                  <TableHead className="text-[12px]">Grade</TableHead>
                  <TableHead className="text-[12px]">Date</TableHead>
                  <TableHead className="text-right text-[12px]">
                    Options
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item: ISchoolTeacher, index) => (
                  <Teachers key={index} item={item} />
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      )}
    </div>
  );
};

export default TeachersTable;
