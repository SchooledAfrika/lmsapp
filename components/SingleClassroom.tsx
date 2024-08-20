"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { SiGoogleclassroom } from "react-icons/si";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsBroadcast } from "react-icons/bs";
import SingleClassTable from "./SingleClassTable";
import { useParams } from "next/navigation";
import Backwards from "./ui/Backwards";
import { PiBookFill } from "react-icons/pi";
import { useConversion } from "@/data-access/conversion";
import { AssignDialog, IgetTeachers } from "./AssignDialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

// information about teachers here
const TeachersInfo: React.FC<{ teachers: IouterPart[] }> = ({ teachers }) => {
  const mappedTeacher = teachers.map((teacher) => teacher.teacher);
  return (
    <div className=" bg-white px-5 py-3 rounded-md">
      <p className=" text-slate-400 font-semibold text-[12px] mt-3">Teachers</p>
      <div className=" mt-4 flex flex-col gap-3">
        {mappedTeacher.map((item, index) => (
          <div key={index} className=" flex flex-col gap-2">
            <div className=" flex items-center gap-3">
              <Image
                className=" w-[35px] aspect-square rounded-sm"
                src={item.profilePhoto}
                alt=""
                width={200}
                height={200}
              />
              <div className=" flex flex-col">
                <p className=" text-[12px] font-bold">{item.name}</p>
                <p className=" text-[10px]">{item.email}</p>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

// information about the meetings
const MeetingInfo = () => {
  return (
    <div className=" bg-white px-5 py-3 rounded-md">
      <p className=" text-slate-400 font-semibold text-[12px] mt-3">
        Invite Students
      </p>
      <div className=" flex flex-col gap-2 mt-2">
        <p className=" font-bold text-[14px]">
          use this link to invite students to join your live class
        </p>
        <p className=" text-blue-400 underline">
          http://web.schoolafrika09=kidv
        </p>
        <div className=" flex flex-col gap-2">
          <p className=" text-[14px] font-bold">Login ID for students</p>
          <p className=" text-green-700 text-[14px] font-bold">209112</p>
        </div>
        <div className=" border border-green-700 py-3 rounded-md flex items-center justify-center text-[14px] text-green-700">
          <p>Invite student</p>
        </div>
      </div>
    </div>
  );
};

const NoTeacher: React.FC<{ item: IsingleClass }> = ({ item }) => {
  const [showDialog, setShowdialog] = useState<boolean>(false);
  const { data: allTeachers, isPending } = useQuery({
    queryKey: ["get-school-teacher-class"],
    queryFn: async () => {
      const response = await fetch("/api/class-teacher");
      const result = await response.json();
      return result;
    },
  });
  if (isPending) {
    return <div>loading</div>;
  }
  const onlyTeachers: IgetTeachers[] = allTeachers.map(
    (teacher: IouterPart) => teacher.teacher
  );
  const classTeacher: IgetTeachers[] = item.SchoolClassTeacher.map(
    (teacher: IouterPart) => teacher.teacher
  );
  return (
    <div className=" w-full h-full flex items-center justify-center bg-white flex-col gap-2 max-ss:h-[150px]">
      <p className=" text-black">no teacher, assign</p>
      <div className=" cursor-pointer" onClick={() => setShowdialog(true)}>
        <AssignDialog
          setShowdialog={setShowdialog}
          subject={item?.subject}
          classId={item?.id}
          SchoolClassTeacher={classTeacher}
          id={item?.id}
          showDialog={showDialog}
          onlyTeachers={onlyTeachers}
          title="Assign"
        />
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

const SingleClassroom = () => {
  const { id } = useParams();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["get-one-school-class"],
    queryFn: async () => {
      const response = await fetch(`/api/class-action/single-class?id=${id}`);
      const result = await response.json();
      return result;
    },
  });

  //   if is loading
  if (isLoading) {
    return (
      <div className=" mt-5">
        <SingleClassSkeleton />
      </div>
    );
  }
  // if is error
  if (isError) {
    return <div className=" flex-1">{error.message}</div>;
  }
  console.log(data);
  const classData: IsingleClass = data;
  return (
    <div className=" mt-6 max-md:mt-[100px]">
      <div className=" w-full flex items-center justify-between">
        <p className=" font-bold">Details</p>
        <Backwards />
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3">
        <ClassInfo info={classData} />
        {classData.SchoolClassTeacher.length === 0 ? (
          <NoTeacher item={classData} />
        ) : (
          <TeachersInfo teachers={classData.SchoolClassTeacher} />
        )}
        <MeetingInfo />
      </div>
      <div>
        {classData.SchoolClassStudent.length === 0 ? (
          <div className=" mt-5 font-bold">
            <p>No student in this class</p>
          </div>
        ) : (
          <SingleClassTable students={classData.SchoolClassStudent} />
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default SingleClassroom;
