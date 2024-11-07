"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useConversion } from "@/data-access/conversion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { IoWarning } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Skeleton } from "@mui/material";
import { Noitem } from "@/components/ApplicantsTable";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";

export interface StudentTeacherInfo {
  id: string;
  name: string;
  profilePhoto: string | null;
  email: string;
  rating?: number;
}
export interface IOffers {
  id: string;
  studentId: string;
  oneOnOneSectionId: string;
  merged: boolean;
  grade: string;
  curriculum: string;
  hoursperday: number;
  sectionType: string;
  duration: string;
  subject: string[];
  specialNeed: string[];
  learningDays: string[];
  learningGoal: string;
  startTime: string;
  createdAt: string;
  amt: number;
  student: StudentTeacherInfo;
  sectionInfo: {
    sesionId: string;
    teacher: StudentTeacherInfo;
  };
}

// component to return first subject and more if more than 1
const TotalAndMore: React.FC<{ item: string[] }> = ({ item }) => {
  // return only one item without more if one item in the array
  if (item.length === 1) {
    return (
      <div>
        <p className=" text-[14px]">{item[0].toLowerCase()}</p>
      </div>
    );
  }
  // return item and more
  return (
    <div className=" flex items-center text-[14px] gap-2">
      <p>{item[0].toLowerCase()}</p>
      <div className=" flex items-center text-green-700 font-semibold ">
        <FiPlus />
        <p>{item.length - 1}</p>
      </div>
    </div>
  );
};
export const Noprofile = () => {
  return (
    <div className=" w-[40px] aspect-square rounded-full border flex items-center justify-center text-[20px]">
      <CgProfile />
    </div>
  );
};
export const ModifiedNoProfile: React.FC<{ userImage: string | null }> = ({
  userImage,
}) => {
  return (
    <div>
      {userImage === null ? (
        <Noprofile />
      ) : (
        <Image
          alt=""
          src={userImage}
          width={200}
          height={200}
          className=" w-[40px] aspect-square rounded-full"
          priority
        />
      )}
    </div>
  );
};
const OfferCard: React.FC<{ item: IOffers }> = ({ item }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/admin-dashboard/sessions/single-sessions/${item.id}`);
  };
  return (
    <div className=" bg-white p-3 flex flex-col gap-5 shadow-md">
      <div className=" flex items-center gap-2">
        <ModifiedNoProfile userImage={item.student.profilePhoto} />
        <div>
          <p className=" text-[12px]">{item.student.email}</p>
          <p className=" text-[14px] font-semibold">{item.student.name}</p>
        </div>
      </div>
      <div className=" border border-gray-500 rounded-md flex flex-col w-full p-1">
        <div className=" flex items-center gap-1 ">
          <p className=" font-semibold">type:</p>
          <p className=" text-[14px]">{item.sectionType}</p>
        </div>
        <div className=" flex items-center gap-1 ">
          <p className=" font-semibold">Curruculum:</p>
          <p className=" text-[14px]">{item.curriculum}</p>
        </div>
        <div className=" flex items-center gap-1 ">
          <p className=" font-semibold">Subjects:</p>
          <TotalAndMore item={item.subject} />
        </div>
        <div className=" flex items-center gap-1 ">
          <p className=" font-semibold">Days:</p>
          <TotalAndMore item={item.learningDays} />
        </div>
      </div>
      <div>
        <button
          onClick={handleClick}
          className=" w-full py-2 text-[14px] transition-all ease-in-out duration-500 hover:bg-green-800 bg-green-700 text-white font-bold rounded-md flex items-center justify-center"
        >
          Show Details
        </button>
      </div>
    </div>
  );
};

export const ShowSkeleton = () => {
  const myArray = new Array(6).fill(" ");
  return (
    <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {myArray.map((item, index) => (
        <Skeleton
          key={index}
          className=" w-full rounded-md"
          height={250}
          variant="rectangular"
          animation="wave"
        />
      ))}
    </div>
  );
};

const Sessions = () => {
  // making use of react query to get all the offers
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-sessions"],
    queryFn: async () => {
      const response = await fetch("/api/session-view");
      const result = await response.json();
      return result;
    },
  });
  console.log(data);

  if (isLoading) {
    return <ShowSkeleton />;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <section>
      <div className="max-w-full">
        <div className=" w-full flex items-center justify-center">
          <p className=" mb-4 text-black font-bold text-[24px]">
            List of unmerged sessions
          </p>
        </div>
        {Array.isArray(data) && (
          <div>
            {data.length === 0 ? (
              <div className=" w-full">
                <Noitem desc="No new session" />
              </div>
            ) : (
              <div className="grid  grid-cols-2 gap-3  md:grid-cols-4">
                {data.map((item: IOffers, index) => (
                  <OfferCard item={item} key={index} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default Sessions;
