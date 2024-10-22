"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useConversion } from "@/data-access/conversion";
import PieCharts from "@/components/PieChart";

import { TiArrowSortedDown } from "react-icons/ti";
import { GoDotFill } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";

const Chart = () => {
  const [visibleItems, setVisibleItems] = useState(3); // State to manage visible items
  const [isExpanded, setIsExpanded] = useState(false); // To toggle between show more/less

  const { getInitials } = useConversion();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["getWardStatus"],
    queryFn: async () => {
      const response = await fetch("/api/more-wards");
      const result = await response.json();
      return result;
    },
  });

  console.log(data);

  const handleShowMore = () => {
    setVisibleItems(data.length); // Show all items
    setIsExpanded(true); // Toggle expanded state to true
  };

  const handleShowLess = () => {
    setVisibleItems(3); // Show only the initial 3 items
    setIsExpanded(false); // Toggle expanded state to false
  };

  if (isLoading) {
    return <p>Loading data...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="my-6 flex md:flex-row flex-col relative  text-[15px] gap-3   md:gap-3 rounded-md">
      <div className="flex md:flex-3 justify-center font-subtext   px-3 bg-white rounded-md pt-6 pb-3 flex-col">
        <div className="flex flex-1 justify-between">
          <p className="pl-3 text-[14px] font-semibold text-slate-600">
            Ward's Attendance Rate
          </p>
          <div className="flex justify-end">
            <p className="inline justify-end font-subtext text-lightGreen text-[13px]">
              Monthly
              <TiArrowSortedDown className="inline text-xl text-lightGreen" />
            </p>
          </div>
        </div>

        <div className="  flex grow min-h-[300px] mt-[5px]  mb-6 overflow-hidden md:flex-row flex-col  justify-center ">
          <PieCharts />
          <div className="flex flex-col pl-2 flex-1 py-3">
            <div className="flex mt-6 text-[12px] font-bold">
              <p className="inline mr-2">
                <GoDotFill className="inline text-green-600" />
                Present
              </p>
              <p className="inline mr-2">
                <GoDotFill className="inline text-red-600" />
                Absent
              </p>
              <p className="inline">
                <GoDotFill className="inline text-dimYellow" />
                Late
              </p>
            </div>
            <div className="flex  flex-col py-4">
              <p className="font-bold">28h 45m</p>
              <p className="text-[11px]">Monthly Average</p>
            </div>
            <div className="flex  flex-col">
              <p className="font-bold text-sm">Attendance Report</p>
              <p className="text-[12px]">
                Student attendance increased by{" "}
                <span className="text-lightGreen text-[11px]"> 55% </span> this
                month over the monthly average of 28h 45m.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* second flex */}

      <div className="bg-white  rounded-md flex-2 pt-6 pb-3 px-4 ">
        <div className="flex  justify-between">
          <p className="text-slate-500 text-[14px] font-semibold">
            Ward's Schedule
          </p>
          <Link href="/" className="text-[11.5px] text-lightGreen ">
            View More
          </Link>
        </div>
        <div className="flex my-4 space-x-4">
          <div className="flex flex-col space-y-2">
            <p className="text-[12px] font-semibold">9:00am</p>
            <p className="text-[12px] font-semibold">10:00am</p>
          </div>
          <div className=" border-2 border-lightGreen rounded-full "></div>
          <div className="flex flex-col space-y-2">
            <p className="text-[13px] font-semibold">Mathematics</p>
            <p className="text-slate-500 text-[12.5px]">Grade 10</p>
          </div>
        </div>

        <div className="flex my-4 space-x-4">
          <div className="flex flex-col space-y-2">
            <p className="text-[12px] font-semibold">11:30am</p>
            <p className="text-[12px] font-semibold">12:30pm</p>
          </div>
          <div className=" border-2 border-orange-500 rounded-full "></div>
          <div className="flex flex-col space-y-2">
            <p className="text-[13px] font-semibold">Homework Support</p>
            <p className="text-slate-500 text-[12.5px]">Timi Adewuyi</p>
          </div>
        </div>

        <div className="flex my-4 space-x-4">
          <div className="flex flex-col ml-1 space-y-2">
            <p className="text-[12px] font-semibold">2:00pm</p>
            <p className="text-[12px] font-semibold">3:00pm</p>
          </div>
          <div className=" border-2 border-amber-500 rounded-full "></div>
          <div className="flex flex-col space-y-2">
            <p className="text-[13px] font-semibold">Mathematics</p>
            <p className="text-slate-500 text-[12.5px]">Grade 11</p>
          </div>
        </div>
      </div>

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
