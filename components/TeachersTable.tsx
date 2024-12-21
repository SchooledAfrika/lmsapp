"use client";
import React from "react";
import { Skeleton } from "@mui/material";
import Image from "next/image";
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
