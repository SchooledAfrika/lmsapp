"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { IoTimeSharp } from "react-icons/io5";
import { RiParentLine } from "react-icons/ri";
import { GiTeacher } from "react-icons/gi";
import { PiStudentBold } from "react-icons/pi";
import { Skeleton } from "@mui/material";
interface ITotal {
  total: number;
}

const getTotalItem = async (link: string) => {
  const response = await fetch(`/api/basic-info/${link}`);
  const result = await response.json();
  return result;
};

// loading component of the home page top
const LoadingFirst = () => {
  return (
    <div className=" mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
      <Skeleton
        className=" rounded-md"
        variant="rectangular"
        animation="wave"
        height={130}
      />
      <Skeleton
        className=" rounded-md"
        variant="rectangular"
        animation="wave"
        height={130}
      />
      <Skeleton
        className=" rounded-md"
        variant="rectangular"
        animation="wave"
        height={130}
      />
      <Skeleton
        className=" rounded-md"
        variant="rectangular"
        animation="wave"
        height={130}
      />
    </div>
  );
};

const TotalCard: React.FC<{
  total: number;
  desc: string;
  Icon: React.FC<{ className?: string }>;
}> = ({ total, desc, Icon }) => {
  return (
    <div className=" w-full shadow-md px-2 py-2 border">
      <div className=" flex items-center justify-between w-full">
        <p className=" font-bold text-[22px]">{total}</p>
        <Icon className=" text-[24px] " />
      </div>
      <div className=" mt-6 text-[14px] text-green-800">
        <p>{desc}</p>
      </div>
    </div>
  );
};

const AdminTopCard = () => {
  // fetch to number of student in the database
  const { data: totalStudent, isLoading: studentLoading } = useQuery<ITotal>({
    queryKey: ["admin-total-student"],
    queryFn: async () => {
      return await getTotalItem("total-student");
    },
  });
  // fetch to number of parents in the database
  const { data: totalparents, isLoading: parentsLoading } = useQuery<ITotal>({
    queryKey: ["admin-total-parents"],
    queryFn: async () => {
      return await getTotalItem("total-parents");
    },
  });
  // fetch to number of teacher  in the database
  const { data: totalTeacher, isLoading: LoadingTeacher } = useQuery<ITotal>({
    queryKey: ["admin-total-teachers"],
    queryFn: async () => {
      return await getTotalItem("total-teacher");
    },
  });
  // fetch to number of Hour in the database
  const { data: totalHour, isLoading: HourLoading } = useQuery<ITotal>({
    queryKey: ["admin-total-hours"],
    queryFn: async () => {
      return await getTotalItem("total-hours");
    },
  });

  if (studentLoading || parentsLoading || LoadingTeacher || HourLoading) {
    return <LoadingFirst />;
  }

  return (
    <div className=" mb-3 mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 ">
      <TotalCard
        Icon={PiStudentBold}
        total={totalStudent?.total!}
        desc="Total number of students"
      />
      <TotalCard
        Icon={GiTeacher}
        total={totalTeacher?.total!}
        desc="Total number of teachers"
      />
      <TotalCard
        Icon={RiParentLine}
        total={totalparents?.total!}
        desc="Total number of parents"
      />
      <TotalCard
        Icon={IoTimeSharp}
        total={totalHour?.total!}
        desc="Total hours by teachers"
      />
    </div>
  );
};

export default AdminTopCard;
