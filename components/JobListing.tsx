"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import Container from "./Container";
import { FaGraduationCap } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { GoDash } from "react-icons/go";
import { Skeleton } from "@mui/material";
import { NoItem } from "./TeachersTable";
import { useConversion } from "@/data-access/conversion";

interface IJoblist {
  id: string;
  level: string;
  location: string;
  role: string;
  description: string;
  responsibility: string[];
  qualifications: string[];
  minSalary: string;
  maxSalary: string;
  jobTitle: string;
  state: string;
  createdAt: string;
  VacancyTeacher: any[];
}

export const LoadingCard = () => {
  const loadingArray = new Array(6).fill("");
  return (
    <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {loadingArray.map((item, index) => (
        <Skeleton
          height={200}
          className=" w-full rounded-md"
          variant="rectangular"
          animation="wave"
          key={index}
        />
      ))}
    </div>
  );
};

// component for each job listing below here
const OneJobListing: React.FC<{ item: IJoblist }> = ({ item }) => {
  const { convertMoney, handleDate } = useConversion();
  return (
    <div className=" flex flex-col p-6 rounded-md gap-4 border shadow-md">
      {/* first part */}
      <div className=" flex flex-col gap-1 ">
        <p className="font-bold mb-1 text-[18px]">{item?.jobTitle}</p>
        <div className=" flex items-center gap-2 font-semibold text-[12px]">
          <div className=" flex items-center gap-1">
            <FaGraduationCap />
            <p>{item?.level}</p>
          </div>
          <div className=" flex items-center gap-1">
            <IoLocationSharp />
            <p>{item?.location}</p>
          </div>
        </div>
      </div>
      {/* second part */}
      <div className=" flex items-center gap-2 text-[12px] font-semibold">
        <p>{item?.role == "FULLTIME" ? "Full-time" : "Part-time"}</p>
        <div className=" h-[20px] border border-slate-800"></div>
        <div className=" flex items-center">
          <p>&#8358;{convertMoney(Number(item?.minSalary))}</p> <GoDash />{" "}
          <p>&#8358;{convertMoney(Number(item?.maxSalary))}</p>
        </div>
      </div>
      {/* the third part */}
      <div className=" flex gap-5 items-center text-[12px] font-semibold">
        <div className=" flex flex-col gap-2 justify-center items-center">
          <p>Applicants</p>
          <p>{item?.VacancyTeacher.length}</p>
        </div>
        <div className=" flex flex-col gap-2 justify-center items-center">
          <p>Created</p>
          <p>{handleDate(item?.createdAt)}</p>
        </div>
      </div>
      {/* the last part */}
      <div className=" flex items-center gap-3 text-[10px] font-semibold">
        <Link
          href={""}
          className=" px-4 py-3 rounded-md border border-red-600 text-red-600"
        >
          Edit Listing
        </Link>
        <Link
          href={`/admin-dashboard/job-listing/applicants/${item.id}`}
          className=" px-4 py-3 rounded-md border  bg-green-700 text-white"
        >
          View Applicants
        </Link>
      </div>
    </div>
  );
};

const JobListing = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["add"],
    queryFn: async () => {
      const response = await fetch("/api/advertise");
      const result = await response.json();
      return result;
    },
  });

  // If loading
  if (isLoading) {
    return <LoadingCard />;
  }

  // If error
  if (isError) {
    return <div className="flex-1">{error.message}</div>;
  }

  return (
    <section className="my-[80px] md:my-4">
      <div>
        <div className="flex justify-end mb-2">
          <Link href={"/admin-dashboard/job-listing/add-new-listing"}>
            <Button className="bg-secondary text-white text-[12px] py-5 my-3 mr-0 md:mr-6">
              <Image
                src="/svgs/new-list.svg"
                width={20}
                height={20}
                className="mr-2"
                alt="New Job Listing"
              />
              New Listing
            </Button>
          </Link>
        </div>
        {Array.isArray(data) && (
          <div>
            {data.length === 0 ? (
              <NoItem itemName="job listing" />
            ) : (
              <div className="  w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {data.map((item: IJoblist, index) => (
                  <OneJobListing key={index} item={item} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListing;
