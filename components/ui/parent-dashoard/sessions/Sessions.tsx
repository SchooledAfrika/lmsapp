"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProgressBar } from "@/components/ProgressBar";
import { BsThreeDots } from "react-icons/bs";
import { useConversion } from "@/data-access/conversion";
import Cookies from "js-cookie";
import { RxAvatar } from "react-icons/rx";
import { useWardId } from "@/data-access/conversion";

// Define types for sessions
export interface Teacher {
  name: string;
  profilePhoto?: string;
  email: string;
}

interface SessionInfo {
  id: string;
  duration: string;
  grade: string;
  hoursperday: number;
  sectionType: string;
  startTime: string;
  subject: string[];
  sectionOwner: {
    teacher: Teacher;
  };
}

const NoProfile = () => {
  return (
    <div className=" w-[35] aspect-square rounded-full border border-black flex items-center justify-center">
      <RxAvatar />
    </div>
  );
};

const SessionCard = ({ item }: { item: SessionInfo }) => {
  const { handleDate, makeSubstring } = useConversion();
  // Safely access teacher and provide defaults if needed
  const subjects =
    item.subject && item.subject.length > 0
      ? item.subject.join(", ")
      : "Unknown Subject";

  return (
    <div className="">
      {/* Desktop screens */}
      <div className="w-full py-3 px-3 md:my-3 my-12 bg-white shadow-md  overflow-x-auto     font-header rounded-lg md:flex flex-col hidden   gap-6">
        <div className="flex justify-between  ">
          <div className="flex space-x-3 ">
            <div className="border-l-4 rounded-full leading-[100px] border-l-lightGreen"></div>
            <div className="py-3 flex flex-col">
              <div className="flex space-x-2 mb-2">
                {item.sectionType === "Private Session" ? (
                  <Image
                    src="/private2.png"
                    alt="course"
                    width={100}
                    height={100}
                    className="w-[30px] h-[30px]"
                  />
                ) : (
                  <Image
                    src="/homework2.jpg"
                    alt="course"
                    width={100}
                    height={100}
                    className="w-[30px] h-[30px]"
                  />
                )}
                <p className="font-bold">{subjects}</p>
              </div>
              <p className="text-[13px] font-semibold">
                <span className="text-[11px]">Initiated on:</span>{" "}
                {handleDate(item.startTime)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 ">
            <p className="text-[12px] px-3  w-full text-center py-2 rounded-md bg-[rgba(0,0,0,0.6)] text-white font-semibold">
              {item.sectionType}
            </p>
            <p className="text-[12px] px-4  w-full text-center py-2 rounded-md bg-[rgba(0,0,0,0.6)] text-white font-semibold">
              {item.grade}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {item.sectionOwner.teacher.profilePhoto ? (
              <Image
                src={item.sectionOwner.teacher.profilePhoto}
                alt="teacher"
                width={100}
                height={100}
                className="w-[35px] h-[35px] rounded-full"
              />
            ) : (
              <NoProfile />
            )}
            <p className="text-[13px] font-semibold">
              {makeSubstring(item.sectionOwner.teacher.name, 20)}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile screens */}

      <div className="w-full md:hidden border-2  py-6 px-3 mt-6  overflow-hidden      font-header rounded-lg card flex flex-col justify-center gap-6 hover:-translate-y-2 transition-transform duration-300 group">
        <div className="flex flex-col justify-between mx-auto    ">
          <div className="flex space-x-3 mb-2 ">
            <div className="py-3 flex flex-col">
              <div className="flex space-x-24  mb-2">
                <p className="font-bold inline text-[15px]">
                  <Image
                    src={`/${subjects.toLowerCase()}.png`}
                    alt="course"
                    width={100}
                    height={100}
                    className="w-[40px] inline h-[40px]"
                  />{" "}
                  {subjects}
                </p>
              </div>
              <p className="text-[13px] font-semibold">
                {handleDate(item.startTime)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 ">
            <p className="text-[12px] px-3  w-full text-center py-2 rounded-md bg-[rgba(0,0,0,0.6)] text-white font-semibold">
              {item.sectionType}
            </p>
            <p className="text-[12px] px-4  w-full text-center py-2 rounded-md bg-[rgba(0,0,0,0.6)] text-white font-semibold">
              {item.grade}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {item.sectionOwner.teacher.profilePhoto ? (
              <Image
                src={item.sectionOwner.teacher.profilePhoto}
                alt="teacher"
                width={100}
                height={100}
                className="w-[35px] h-[35px] rounded-full"
              />
            ) : (
              <NoProfile />
            )}
            <p className="text-[13px] font-semibold">
              {makeSubstring(item.sectionOwner.teacher.name, 20)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Sessions = () => {
  //The wardId is already stored in the localStorage and so we initialize a state for it
  const { wardId } = useWardId();

  // Fetch teachers data, only run query if wardId exists
  const { isLoading, isError, error, data } = useQuery<SessionInfo[]>({
    queryKey: ["getSessionsForWard", wardId],
    queryFn: async () => {
      if (!wardId) return [];
      const response = await fetch(
        `/api/parents-gets-ward-sessions?childId=${wardId}`
      );
      if (!response.ok) throw new Error("Failed to fetch sessions");
      const responseData = await response.json();
      console.log("API Response:", responseData); // Log the API response
      return responseData;
    },
    enabled: !!wardId, // The query will only run if wardId exists
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    // console.error(error); // Log the error to see what went wrong
    return <p>Error: {error?.message}</p>;
  }

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  console.log(data);
  return (
    <div className="max-w-full md:mt-6 mt-12  mx-auto px-4  py-3">
      <div className="grid grid-cols-1 items-center   gap-6 ">
        {Array.isArray(data) &&
          data.map((item: SessionInfo, index) => (
            <SessionCard key={index} item={item} />
          ))}
      </div>
    </div>
  );
};

export default Sessions;
