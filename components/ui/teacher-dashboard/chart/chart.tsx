"use client";
import PieCharts from "@/components/PieChart";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { TiArrowSortedDown } from "react-icons/ti";
import Link from "next/link";
import { useConversion } from "@/data-access/conversion";

interface ScheduleBlockProps {
  classTime?: string;
  classStarts?: string;
  grade: string;
  classStart?: string;
  startTime?: string;
  sectionType?: string;
  time?: string;
  subject: string | string[];
  borderColor: string;
}

const fetchSessions = async (endpoint: string) => {
  const response = await fetch(endpoint);
  const result = await response.json();
  return result;
};

const ScheduleBlock: React.FC<ScheduleBlockProps> = ({
  classStart,
  classStarts,
  classTime,
  time,
  startTime,
  grade,
  sectionType,
  subject,
  borderColor,
}) => {
  const { handleTime } = useConversion();
  return (
    <div className="flex my-4 space-x-4">
      <div className="flex flex-col space-y-2">
        <p className="text-[12px] font-semibold">
          {classTime} {handleTime(startTime || "")} {time}
        </p>
        <p className="text-[12px] font-semibold">{sectionType}</p>
      </div>
      <div className={`border-2 ${borderColor} rounded-full`}></div>
      <div className="flex flex-col space-y-2">
        <p className="text-[13px] font-semibold">{subject}</p>
        <p className="text-slate-500 text-[12.5px]">{grade}</p>
      </div>
    </div>
  );
};

const Chart = () => {
  // Fetch data for each session type
  const { data: classes, isLoading: loadingClasses } = useQuery({
    queryKey: ["classesOverview"],
    queryFn: () => fetchSessions("/api/class"),
  });

  const { data: privateSessions, isLoading: loadingPrivateSessions } = useQuery(
    {
      queryKey: ["privateSessionsOverview"],
      queryFn: () => fetchSessions("api/one-on-one-section"),
    }
  );

  const { data: specialRequests, isLoading: loadingSpecialRequests } = useQuery(
    {
      queryKey: ["specialRequestsOverview"],
      queryFn: () => fetchSessions("/api/teacher-special-request"),
    }
  );

  // Loading and Error Handling
  if (loadingClasses || loadingPrivateSessions || loadingSpecialRequests) {
    return <div></div>;
  }

  // Extract last item from each session
  const lastClass = classes?.[classes.length - 1];
  const lastPrivateSession = privateSessions?.[privateSessions.length - 1];
  const lastSpecialRequest = specialRequests?.[specialRequests.length - 1];

  const subject =
    lastPrivateSession?.subject && lastPrivateSession.subject.length > 0
      ? lastPrivateSession.subject.join(", ")
      : "Unknown Subject";

  return (
    <div className="mt-12  flex md:flex-row flex-col relative  text-[15px] gap-3   md:gap-3 rounded-md">
      <div className="flex md:flex-3    px-3 bg-white rounded-md py-6  flex-col">
        <div className="flex flex-1 justify-between">
          <p className="pl-3 text-[14px] font-semibold text-slate-600">
            Teacher Activity Rate
          </p>
          <div className="flex justify-end">
            <p className="inline justify-end font-subtext text-lightGreen text-[13px]">
              Yearly
              <TiArrowSortedDown className="inline text-xl text-lightGreen" />
            </p>
          </div>
        </div>
        <PieCharts />
      </div>
      {/* second flex */}

      <div className="bg-white  rounded-md flex-2 py-6 px-4 ">
        <div className="flex justify-between">
          <p className="text-slate-500 text-[14px] font-semibold">Job Board</p>
          <Link href="/teacher-dashboard/open-offers" className="text-[11.5px] text-lightGreen ">
            View More
          </Link>
        </div>

        <div className="flex mt-6 items-center justify-between space-x-3"></div>
        <hr className="w-full mt-1 font-semibold text-black" />

        <div className="flex mt-3 items-center justify-between space-x-3"></div>
        <hr className="w-full mt-1  font-semibold text-black" />

        <div className="flex mt-3 items-center justify-between space-x-3"></div>
      </div>

      {/* third flex */}
      <div className="bg-white  rounded-md flex-2 py-6 px-4 ">
        <div className="flex justify-between">
          <p className="text-slate-500 text-[14px] font-semibold">Schedule</p>
          <Link href="/teacher-dashboard/sessions" className="text-[11.5px] text-lightGreen ">
            View More
          </Link>
        </div>

        {/* 1st Div */}

        {lastClass && (
          <ScheduleBlock
            classTime={lastClass.classTime}
            subject={lastClass.subject}
            grade={lastClass.grade}
            borderColor="border-lightGreen"
          />
        )}

        {/* 2nd Div */}
        {lastSpecialRequest && (
          <ScheduleBlock
            time={lastSpecialRequest.time}
            subject={lastSpecialRequest.subject}
            grade={lastSpecialRequest.grade}
            borderColor="border-amber-500"
          />
        )}

        {/* 3rd Div */}

        {lastPrivateSession && (
          <ScheduleBlock
            startTime={lastPrivateSession.startTime}
            sectionType={lastPrivateSession.sectionType}
            subject={subject}
            grade={lastPrivateSession.grade}
            borderColor="border-orange-500"
          />
        )}
      </div>
    </div>
  );
};

export default Chart;
