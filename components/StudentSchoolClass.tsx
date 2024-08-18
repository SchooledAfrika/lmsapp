"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Backwards from "./ui/Backwards";
import { useParams } from "next/navigation";
import { SingleClassSkeleton } from "./SingleClassroom";
import {
  IsingleClass,
  ClassInfo,
  Iannoucement,
  IouterPart,
} from "./SingleClassroom";
import { info } from "console";
import Image from "next/image";

// component for announcements
const Announcement: React.FC<{
  info: Iannoucement[];
}> = ({ info }) => {
  return (
    <div className=" bg-white rounded-md py-5 px-5">
      {info.length === 0 ? (
        <div className=" w-full h-full relative flex max-xs:h-[150px] ">
          <p className="text-slate-400 font-semibold text-[12px]">
            Announcement
          </p>
          <p className=" text-green-600 font-bold text-[12px]  absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2">
            No announcement yet
          </p>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

// component for displaying class details
const ClassDetails: React.FC<{
  info: IsingleClass;
}> = ({ info }) => {
  const flattendTeacher = info.SchoolClassTeacher.map((teacher) => teacher);
  return (
    <div className=" bg-white p-5 flex flex-col gap-4">
      <p className="text-slate-400 font-semibold text-[12px]">Class Details</p>
      <div>
        <p>Subject</p>
        <div>
          <Image
            className=" w-[110px] h-[90px] aspect-square rounded-md"
            src={`/${info?.subject.toLowerCase()}.png`}
            alt=""
            width={200}
            height={200}
          />
          <p>{info.subject}</p>
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
};
// our component base starts here
const StudentSchoolClass = () => {
  const { id } = useParams();
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["school-student-class"],
    queryFn: async () => {
      const response = await fetch(`/api/class-action/single-class?id=${id}`);
      const result = await response.json();
      return result;
    },
  });
  //   checking if loading is true
  if (isFetching) {
    return (
      <div className=" mt-6">
        <SingleClassSkeleton />;
      </div>
    );
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  const items: IsingleClass = data;
  return (
    <div className=" mt-6 flex flex-col gap-3">
      <div className=" w-full flex items-center justify-between">
        <p className=" font-bold text-black">Details</p>
        <Backwards />
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3">
        <ClassInfo info={items} />
        <Announcement info={items.AnnouncementBySchoolClass} />
        <ClassDetails info={items} />
      </div>
      <div></div>
    </div>
  );
};

export default StudentSchoolClass;
