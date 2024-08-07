"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { SiGoogleclassroom } from "react-icons/si";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsBroadcast } from "react-icons/bs";
import SingleClassTable from "./SingleClassTable";
import { useParams } from "next/navigation";

const SingleClassroom = () => {
  const { id } = useParams();
  console.log(id);

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["addSchool"],
    queryFn: async () => {
      const response = await fetch(`/api/class-action`);
      const result = await response.json();
      return result;
    },
  });
  console.log(data);
  //   if is loading
  if (isLoading) {
    return (
      <div className="">
        <p className="my-4 font-bold">loading...</p>
      </div>
    );
  }
  // if is error
  if (isError) {
    return <div className=" flex-1">{error.message}</div>;
  }

  return (
    <div>
      {data && (
        <div key={data.id} className="font-header md:mt-12 mt-24">
          <div className="flex justify-between">
            <p className="font-bold text-lg">Details</p>
            <Link href="/school-dashboard/classroom" className="cursor-pointer">
              <Image
                src="/closeAlt.svg"
                alt="cancel"
                width={100}
                height={100}
                className="w-[20px] h-[20px]"
              />
            </Link>
          </div>

          <div className="grid font-subtext md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 mt-6">
            <div className="bg-white py-6 rounded-md">
              <div className="flex justify-between px-6 pt-3 pb-1">
                <p className="text-slate-500 text-[14px] font-semibold">
                  Overview
                </p>
              </div>
              <div className="px-6 flex  space-x-2 pb-2">
                <Image
                  src="/schoolpic.png"
                  alt=""
                  width={100}
                  height={100}
                  className="rounded-md w-[150px] h-[120px]"
                />

                <div className="items-center mt-8">
                  <p className="inline text-[14px]">
                    <SiGoogleclassroom className="inline w-[18px] mr-2 h-[18px]" />
                    {data?.name}
                  </p>
                  <p className="mt-3 text-[13px]">{data?.grade}</p>
                </div>
              </div>
              <div className="flex px-6 flex-col justify-between">
                <p className="text-[13px]">Last Session : April 18th, 2024.</p>
                <p className="text-[13px]">Date Created : April 10th, 2024.</p>

                <Button
                  asChild
                  className=" bg-dimOrange hover:bg-gold rounded-md text-white text-[13px] mt-3 px-3 w-32  py-2 text-center lg:block"
                >
                  <Link href="/" className="inline">
                    <BsBroadcast className="inline mr-1" />
                    Join Session
                  </Link>
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-md py-6 px-6 ">
              <p className="pt-3 text-slate-500 font-semibold">Teachers</p>
              <div className="flex items-center space-x-3">
                <Image
                  src="/teacher-img.png"
                  alt="teacher"
                  width={100}
                  height={100}
                  className="w-[40px]  mt-3 rounded-md h-[40px]"
                />
                <div className="flex flex-col">
                  <p className="text-[14px]">Odo Maurice Augustine</p>
                  <p className="text-[13px]">odomaurice@gmail.com</p>
                </div>
              </div>
              <hr className="w-full mt-3 font-semibold text-black" />

              <div className="flex items-center space-x-3">
                <Image
                  src="/teacher-img.png"
                  alt="teacher"
                  width={100}
                  height={100}
                  className="w-[40px]  my-3 rounded-md h-[40px]"
                />
                <div className="flex flex-col">
                  <p className="text-[14px]">Odo Maurice Augustine</p>
                  <p className="text-[13px]">odomaurice@gmail.com</p>
                </div>
              </div>
              <hr className="w-full my-3 font-semibold text-black" />

              <div className="flex items-center space-x-3">
                <Image
                  src="/teacher-img.png"
                  alt="teacher"
                  width={100}
                  height={100}
                  className="w-[40px]  mt-3 rounded-md h-[40px]"
                />
                <div className="flex flex-col">
                  <p className="text-[14px]">Odo Maurice Augustine</p>
                  <p className="text-[13px]">odomaurice@gmail.com</p>
                </div>
              </div>
              <hr className="w-full my-3 font-semibold text-black" />
            </div>
            <div className="bg-white rounded-md py-6 px-6">
              <p className="text-slate-500 mt-3">Invite students</p>
              <p className="my-3 text-[14px]">
                Use this link to invite students to join your live class.
              </p>
              <p className="text-blue-400 text-[14px] underline">
                http://web.schooledafrika09=ab/live
              </p>
              <p className="text-[15px] my-3">Login ID for students:</p>
              <p className="text-[1rem] text-lightGreen my-3">209112</p>
              <Button
                variant="outline"
                className="w-full border-lightGreen text-lightGreen hover:text-lightGreen"
              >
                Invite Student
              </Button>
            </div>
          </div>
          <SingleClassTable />
        </div>
      )}
    </div>
  );
};

export default SingleClassroom;
