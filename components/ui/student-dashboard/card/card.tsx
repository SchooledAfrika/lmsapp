"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsBroadcast } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import {
  TotalClasses as Iclasses,
  TotalAssessments,
  TotalTeachers as Iteachers,
} from "../../parent-dashoard/card/card";
import { useSession } from "next-auth/react";

interface ISessions {
  totalSession: number;
}

// total classes a student have below here
const TotalClasses = () => {
  const { data } = useSession();
  const {
    data: totalClassesData = { classNo: 0 },
    isLoading: loadingClasses,
    isError: errorClasses,
  } = useQuery<Iclasses>({
    queryKey: ["totalClasses-student"],
    queryFn: async () => {
      const response = await fetch(
        `/api/parent-info/parents-child-overview/total-classes?childId=${data?.user.id}`
      );
      return response.json();
    },
  });
  return (
    <div className="flex flex-1   text-sm  p-3  justify-between space-x-2  bg-white rounded-md">
      <div className="flex flex-col  justify-evenly">
        <h3 className="font-bold text-lg pb-3">{totalClassesData.classNo}</h3>

        <p className="font-semibold pb-2 ">Total Classes</p>
      </div>

      <Image
        src="/book.png"
        alt="card-img"
        width={50}
        height={50}
        className="w-[30px] h-[30px] justify-end mt-5 items-center"
      />
    </div>
  );
};

// total one on one session of the student below here
const TotalSessions = () => {
  // fetching information about the sessions below;
  const { data: AllSessions = { totalSession: 0 } } = useQuery<ISessions>({
    queryKey: ["allsessions-student"],
    queryFn: async () => {
      const response = await fetch("/api/basic-details/all-sessions");
      const result = await response.json();
      return result;
    },
  });
  return (
    <div className="flex flex-1  text-sm  p-3  justify-between space-x-2  bg-white rounded-md">
      <div className="flex flex-col  justify-evenly">
        <h3 className="font-bold text-lg pb-3">{AllSessions.totalSession}</h3>

        <p className="font-semibold pb-2 ">1 on 1 Sessions</p>
      </div>

      <Image
        src="/private.png"
        alt="card-img"
        width={50}
        height={50}
        className="w-[30px] h-[30px] justify-end mt-5 items-center"
      />
    </div>
  );
};

// below here is for total teachers
const TotalTeachers = () => {
  const { data } = useSession();
  const {
    data: totalTeachersData = { teachersNo: 0 },
    isLoading: loadingTeachers,
    isError: errorTeachers,
  } = useQuery<Iteachers>({
    queryKey: ["totalTeachers-student"],
    queryFn: async () => {
      const response = await fetch(
        `/api/parent-info/parents-child-overview/total-teacher?childId=${data?.user.id}`
      );
      if (!response.ok) throw new Error("Failed to fetch total teachers");
      return response.json();
    },
  });
  return (
    <div className="flex flex-1  text-sm  p-3  justify-between space-x-2  bg-white rounded-md">
      <div className="flex flex-col  justify-evenly">
        <h3 className="font-bold text-lg pb-3">
          {totalTeachersData.teachersNo}
        </h3>
        <p className="font-semibold pb-2 ">Total Teachers</p>
      </div>
      <Image
        src="/teach.png"
        alt="card-img"
        width={50}
        height={50}
        className="w-[30px] h-[30px] justify-end mt-5 items-center"
      />
    </div>
  );
};

const TotalResources = () => {
  const { data } = useSession();
  const {
    data: totalAssessmentsData = { totalExams: 0 },
    isLoading: loadingAssessments,
    isError: errorAssessments,
  } = useQuery<TotalAssessments>({
    queryKey: ["totalAssessments-student"],
    queryFn: async () => {
      const response = await fetch(
        `/api/parent-info/parents-child-overview/total-exams?childId=${data?.user.id}`
      );
      if (!response.ok) throw new Error("Failed to fetch total assessments");
      return response.json();
    },
  });
  return (
    <div className="flex flex-1  text-sm  p-3  justify-between space-x-2  bg-white rounded-md">
      <div className="flex flex-col  justify-evenly">
        <h3 className="font-bold text-lg pb-3">
          {totalAssessmentsData.totalExams}
        </h3>

        <p className="font-semibold pb-2 ">Test & Resources</p>
      </div>

      <Image
        src="/resources.png"
        alt="card-img"
        width={50}
        height={50}
        className="w-[30px] h-[30px] justify-end mt-5 items-center"
      />
    </div>
  );
};

const Card = () => {
  return (
    <div className="w-full bg-stone-100">
      {/* Card section */}
      <div className="md:flex md:flex-row  gap grid grid-cols-1 justify-between  items-center gap-3">
        <TotalClasses />
        <TotalSessions />
        <TotalTeachers />
        <TotalResources />
        {/* Go Live */}
        <div className="flex flex-col space-y-3 flex-1 ">
          <Button
            asChild
            className=" bg-dimOrange hover:bg-dimYellow rounded-md text-white text-[14px] mt-3  ml-3 md:w-32 w-full mx-auto   py-2 text-center lg:block"
          >
            <Link href="/" className="inline">
              <BsBroadcast className="inline mr-1" />
              Join Session
            </Link>
          </Button>
          <p className="text-[12.5px] text-center  font-normal">
            Join a live session now!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
