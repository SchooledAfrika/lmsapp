"use client";
import React from "react";
import Image from "next/image";
import { SiGoogleclassroom } from "react-icons/si";
import { BsBroadcast } from "react-icons/bs";
import { PiBookFill } from "react-icons/pi";
import { useConversion } from "@/data-access/conversion";
import { Skeleton } from "@mui/material";

interface InnerTeacher {
  name: string;
  email: string;
  profilePhoto: string;
  id: string;
}
export interface IouterPart {
  teacher: InnerTeacher;
}
interface InnerStudent {
  name: string;
  email: string;
  profilePhoto: string;
  id: string;
}
export interface IouterStudent {
  createdAt: string;
  student: InnerStudent;
}
export interface Iannoucement {
  id: string;
  title: string;
  desc: string;
}

export interface IsingleClass {
  id: string;
  grade: string;
  name: string;
  subject: string;
  time: string;
  createdAt: string;
  SchoolClassExam: [];
  resourcesIds: [];
  SchoolClassTeacher: IouterPart[];
  SchoolClassStudent: IouterStudent[];
  school: {
    banner: string;
  };
  AnnouncementBySchoolClass: Iannoucement[];
}

// information about the class
export const ClassInfo: React.FC<{ info: IsingleClass }> = ({ info }) => {
  const { handleDate } = useConversion();
  return (
    <div className=" bg-white w-full rounded-md px-5 py-3 flex flex-col gap-4">
      {/* first part */}
      <div className=" flex items-center justify-between">
        <p className=" text-slate-400 font-semibold text-[12px]">Overview</p>
        <div className=" text-white w-[40px] aspect-square rounded-md flex items-center justify-center bg-green-700">
          <PiBookFill />
        </div>
      </div>
      {/* second part */}
      <div className=" flex flex-col gap-3">
        <div className=" flex  items-center gap-4">
          <Image
            className=" w-[110px] h-[90px] aspect-square rounded-md"
            src={info.school.banner}
            alt=""
            width={200}
            height={200}
          />
          <div className=" flex flex-col gap-1">
            <div className=" flex items-center gap-1 font-bold">
              <SiGoogleclassroom className=" text-[14px]" />
              <p className=" text-[12px]">{info.name}</p>
            </div>
            <p className=" text-[12px]">{info.grade}</p>
          </div>
        </div>
        <p className=" text-[12px] font-semibold ">Duration: {info.time}</p>
      </div>
      {/* last part */}
      <div className=" flex flex-col gap-2">
        <p className=" text-[12px] text-slate-600">
          Date created: {handleDate(info.createdAt)}
        </p>
        <div className=" flex items-center gap-2 px-4 py-2 bg-orange-500 rounded-md w-fit text-white text-[12px] font-bold">
          <BsBroadcast />
          <p>Join Session</p>
        </div>
      </div>
    </div>
  );
};
// the loading indicators for the single classroom
export const SingleClassSkeleton = () => {
  return (
    <div className=" w-full flex flex-col gap-4">
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <Skeleton
          className=" w-full rounded-md"
          height={220}
          variant="rectangular"
          animation="wave"
        />
        <Skeleton
          className=" w-full rounded-md"
          height={220}
          variant="rectangular"
          animation="wave"
        />
        <Skeleton
          className=" w-full rounded-md"
          height={220}
          variant="rectangular"
          animation="wave"
        />
      </div>
      <div>
        <Skeleton
          className=" w-full rounded-md"
          height={300}
          variant="rectangular"
          animation="wave"
        />
      </div>
    </div>
  );
};
