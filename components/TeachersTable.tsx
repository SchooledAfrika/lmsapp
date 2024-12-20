"use client";
import React from "react";
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
