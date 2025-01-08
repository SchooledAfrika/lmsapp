"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useConversion } from "@/data-access/conversion";
import { useWardId } from "@/data-access/conversion";
import PieCharts from "@/components/PieChart";

import { TiArrowSortedDown } from "react-icons/ti";
import { GoDotFill } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import PiechartParents from "@/components/PiechartParents";

interface ScheduleBlockProps {
  name?: string;
  profilePhoto?: string;
  status?: string;
  className?: string;
  classTime?: string;
  classStarts?: string;
  grade: string;
  classStart?: string;
  startTime?: string;
  sectionType?: string;
  time?: string;
  subject?: string | string[];
  subjects?: string | string[];
  borderColor: string;
}

const fetchSessions = async (endpoint: string) => {
  const response = await fetch(endpoint);
  const result = await response.json();
  return result;
};

const ScheduleBlock: React.FC<ScheduleBlockProps> = ({
  name,
  profilePhoto,
  status,
  classTime,
  time,
  className,
  startTime,
  grade,
  sectionType,
  subject,
  subjects,
  borderColor,
}) => {
  const { handleTime, getInitials } = useConversion();
  return (
    <div className="flex my-4 space-x-4">
      <div className="flex items-center">
        {profilePhoto ? (
          <Image
            src={profilePhoto}
            alt={name || "No picture"}
            width={50}
            height={50}
            className="w-[40px] h-[40px] rounded-full"
          />
        ) : (
          <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-gray-300 text-black font-bold">
            {getInitials(name || "No name")}{" "}
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <p className="text-[13px] font-semibold">
          {subject} {subjects}
        </p>

        <p className="text-[12px] font-semibold">{className}</p>
        <p className="text-[12px] font-semibold">{sectionType}</p>
      </div>
      {/* <div className={`border-2 ${borderColor} rounded-full`}></div> */}
      <div className="flex flex-col space-y-2">
        <p className="text-[12px] font-semibold">
          {status ? status : ""} {handleTime(startTime || "")} {time}
        </p>

        <p className="text-slate-500 text-[12.5px]">{grade}</p>
      </div>
    </div>
  );
};

const LastInfos = () => {
  const { wardId } = useWardId();
  // Fetch data for each session type
  const { data: classesParents, isLoading: loadingClassesParents } = useQuery({
    queryKey: ["classesOverviewParents", wardId],
    queryFn: () =>
      fetchSessions(`/api/parents-gets-wards-teachers?childId=${wardId}`),
  });

  const {
    data: privateSessionsParents,
    isLoading: loadingPrivateSessionsParents,
  } = useQuery({
    queryKey: ["privateSessionsOverviewParents", wardId],
    queryFn: () =>
      fetchSessions(`/api/parents-gets-ward-sessions?childId=${wardId}`),
  });

  const {
    data: specialRequestsParents,
    isLoading: loadingSpecialRequestsParents,
  } = useQuery({
    queryKey: ["specialRequestsOverviewParents", wardId],
    queryFn: () =>
      fetchSessions(`/api/parents-gets-ward-sessions?childId=${wardId}`),
  });

  // Loading and Error Handling
  if (
    loadingClassesParents ||
    loadingPrivateSessionsParents ||
    loadingSpecialRequestsParents
  ) {
    return <div></div>;
  }

  // Extract last item from each session
  const lastClassParents = classesParents?.[classesParents.length - 1];
  const lastPrivateSessionParents =
    privateSessionsParents?.[privateSessionsParents.length - 1];
  const lastSpecialRequestParents =
    specialRequestsParents?.[specialRequestsParents.length - 2];

  const subject =
    lastPrivateSessionParents?.subject &&
    lastPrivateSessionParents.subject.length > 0
      ? lastPrivateSessionParents.subject.join(", ")
      : "Unknown Subject";
  return (
    <div className="bg-white h-fit  rounded-md flex-2 pt-6 pb-3 px-4 ">
      <div className="flex  justify-between">
        <p className="text-slate-500 text-[14px] font-semibold">
          Ward's Schedule
        </p>
        <Link
          href="/parents-dashboard/sessions"
          className="text-[11.5px] text-lightGreen "
        >
          View More
        </Link>
      </div>

      {/* 1st Div */}

      {lastClassParents && (
        <ScheduleBlock
          profilePhoto={lastClassParents.teacher.profilePhoto}
          name={lastClassParents.teacher.name}
          className={lastClassParents.className}
          status={lastClassParents.teacher.status}
          subject={lastClassParents.subject}
          grade={lastClassParents.grade}
          borderColor="border-lightGreen"
        />
      )}
      <hr className=" p-[0.5px] rounded-full" />

      {/* 2nd Div */}
      {lastSpecialRequestParents && (
        <ScheduleBlock
          profilePhoto={
            lastPrivateSessionParents.sectionOwner.teacher.profilePhoto
          }
          name={lastPrivateSessionParents.sectionOwner.teacher.name}
          startTime={lastPrivateSessionParents.startTime}
          sectionType={lastPrivateSessionParents.sectionType}
          subject={lastSpecialRequestParents.subject}
          grade={lastSpecialRequestParents.grade}
          borderColor="border-amber-500"
        />
      )}
      <hr className=" p-[0.5px] rounded-full" />

      {/* 3rd Div */}

      {lastPrivateSessionParents && (
        <ScheduleBlock
          profilePhoto={
            lastPrivateSessionParents.sectionOwner.teacher.profilePhoto
          }
          name={lastPrivateSessionParents.sectionOwner.teacher.name}
          startTime={lastPrivateSessionParents.startTime}
          sectionType={lastPrivateSessionParents.sectionType}
          subject={subject}
          grade={lastPrivateSessionParents.grade}
          borderColor="border-orange-500"
        />
      )}
      <hr className=" p-[0.5px] rounded-full" />
    </div>
  );
};

const Chart = () => {
  const [visibleItems, setVisibleItems] = useState(3); // State to manage visible items
  const [isExpanded, setIsExpanded] = useState(false); // To toggle between show more/less
  const { wardId } = useWardId();

  const { getInitials } = useConversion();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["getWardStatus"],
    queryFn: async () => {
      const response = await fetch("/api/more-wards");
      const result = await response.json();
      return result;
    },
  });

  //console.log(data);

  const handleShowMore = () => {
    setVisibleItems(data.length); // Show all items
    setIsExpanded(true); // Toggle expanded state to true
  };

  const handleShowLess = () => {
    setVisibleItems(3); // Show only the initial 3 items
    setIsExpanded(false); // Toggle expanded state to false
  };

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="my-6 flex md:flex-row flex-col relative  text-[15px] gap-3   md:gap-3 rounded-md">
      <div className="flex md:flex-3 justify-center font-subtext h-fit  gap-3  px-3 bg-white rounded-md pt-6 pb-3 flex-col">
        <div className="flex flex-1 justify-between">
          <p className="pl-3 text-[14px] font-semibold text-slate-600">
            Ward's basic info
          </p>
          <div className="flex justify-end">
            <p className="inline justify-end font-subtext text-lightGreen text-[13px]">
              Yearly
              <TiArrowSortedDown className="inline text-xl text-lightGreen" />
            </p>
          </div>
        </div>
        <PiechartParents />
      </div>
      {/* second flex */}
      <LastInfos />
      {/* third flex */}
      <div className="bg-white  rounded-md flex-2 py-6 px-4 ">
        <div className="flex justify-between">
          <p className="text-slate-500 text-[14px] font-semibold">
            Ward's Status
          </p>
          {/* <Link href="/" className="text-[11.5px] text-lightGreen ">
            View More
          </Link> */}
        </div>
        <div
          className={`ward-status-container ${
            isExpanded ? "ward-status-expanded" : ""
          }`}
        >
          <div className="flex flex-col">
            {Array.isArray(data) &&
              data.slice(0, visibleItems).map(
                (
                  item: any // Show only the visible items
                ) => (
                  <div key={item.id} className="py-3 flex space-x-3">
                    {item.profilePhoto ? (
                      <Image
                        src={item.profilePhoto}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="w-[50px] h-[50px] border-2 border-lightGreen rounded-full"
                      />
                    ) : (
                      <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center border-2 border-lightGreen bg-gray-300 text-black font-bold">
                        {getInitials(item.name)}{" "}
                        {/* Render initials when no photo */}
                      </div>
                    )}
                    <div className="flex flex-col space-y-1">
                      <p className="font-bold  text-[13px]">{item.name}</p>
                      <p className="py-[5px] rounded-md bg-lightGreen text-center text-[11px] text-white">
                        {item.status || "Active"}
                      </p>
                    </div>
                  </div>
                )
              )}

            <div className="flex justify-center mt-4">
              {isExpanded ? (
                <button
                  onClick={handleShowLess}
                  className="text-white w-full rounded-md p-2 text-[14px] bg-lightGreen font-semibold"
                >
                  Show Less Wards
                </button>
              ) : (
                <button
                  onClick={handleShowMore}
                  className="text-white w-full rounded-md p-2 text-[14px] bg-lightGreen font-semibold"
                >
                  Show More Wards
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
