"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import DashboardPagination from "./DashboardPagination";
import Container from "./Container";


const JobListing = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["add"],
    queryFn: async () => {
      const response = await fetch("/api/advertise");
      const result = await response.json();
      return result;
    },
  });
  console.log(data)

  // If loading
  if (isLoading) {
    return (
      <div className="">
        <p className="my-4 font-bold">loading...</p>
       
      </div>
    );
  }

  // If error
  if (isError) {
    return <div className="flex-1">{error.message}</div>;
  }

  return (
    <section className="my-[80px] md:my-4">
      <Container>
        <div className="flex justify-end mb-2">
          <Link href={"/school-dashboard/job-listing/new"}>
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

        <div className="flex flex-wrap gap-3 justify-center md:justify-start ">
        {Array.isArray(data) &&
          data.map((item: any) => (
            <div
              key={item.id}
              className="w-full lg:w-fit bg-[#FFFFFF] py-[17px] shadow-lg pl-6 pr-[60px] rounded-[10px]"
            >
              <p className="font-bold text-[18px] pb-2"></p>
              <div className="flex gap-6">
                <div className="flex gap-3 font-medium text-[12px]">
                  <Image
                    src="/svgs/grade.svg"
                    width={20}
                    height={20}
                    alt="Grade"
                  />
                  <span>{item.grade}</span>
                </div>
                <div className="flex gap-3 font-medium text-[12px]">
                  <Image
                    src="/svgs/location-black.svg"
                    width={12}
                    height={12}
                    alt="Location"
                  />
                  <span></span>
                </div>
              </div>
              <div className="py-4">
                <span className="font-medium text-[12px] border-r-2 border-gray-300 py-1 pr-5 mr-5">
                 
                </span>
                <span className="font-bold text-[12px]">
                  
                </span>
              </div>
              <div className="flex flex-row gap-6 my-2">
                <div className="flex flex-col items-center font-medium text-[12px]">
                  <span></span>{" "}
                 
                </div>
                <div className="flex flex-col items-center font-medium text-[12px]">
                  <span></span>{" "}
                 
                </div>
              </div>
              <div className="flex gap-3">
                <Link href={"/school-dashboard/job-listing/new"}>
                  <Button className="border bg-[#FFFFFF] border-red-400 py-5 text-[12px] px-6 my-3 text-red-400">
                    
                  </Button>
                </Link>
                <Link href={"/school-dashboard/job-listing/applicant"}>
                  <Button className="bg-secondary text-white text-[12px] py-5 my-3">
                   
                  </Button>
                </Link>
              </div>
            </div>
           ))}
        </div>
        <DashboardPagination />
      </Container>
    </section>
  );
};

export default JobListing;
