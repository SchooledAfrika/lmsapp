"use client";
import { Classes } from "@/constants/index";
import Image from "next/image";
import Container from "./Container";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaStar } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { useClasses } from "@/data-access/class";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Iteacher {
  name: string;
}

interface Iclass {
  classBanner: string;
  teacherId: string;
  schedules: string[];
  price: number;
  classTime: string;
  teacher: Iteacher;
  rating?: number;
  subject: string;
  className: string;
  grade: string;
}

const PopularClassesCard = ({ item }: { item: Iclass }) => {
  const {
    makeSubString,
    capitalizeString,
    convertArray,
    showpayments,
    enroll,
  } = useClasses();

  return (
    <>
      <div className="w-full     font-subtext rounded-lg card flex flex-col justify-center gap-3 hover:-translate-y-2 transition-transform duration-300 group">
        <div className="relative text-white w-full h-[200px]">
          <Image
            className="w-full h-full object-cover"
            src={item.classBanner}
            alt="background"
            width={200}
            height={200}
          />
          <div className=" absolute top-0 left-0 w-full h-full items-center justify-center flex flex-col gap-3">
            <div className=" px-4 py-2 rounded-md bg-[rgba(0,0,0,0.6)] text-white">
              <p>{item.className}</p>
            </div>
            <div className=" px-4 py-2 rounded-md bg-[rgba(0,0,0,0.6)] text-white">
              <p>{item.grade}</p>
            </div>
          </div>

          <button
            onClick={enroll}
            className=" bg-dimOrange absolute -translate-y-1/2 left-3 rounded-md text-white text-[12px] font-bold px-4   py-2 text-center lg:block"
          >
            Enrol Now
          </button>
        </div>
        <p className="text-right mr-6 font-bold text-lightGreen">
          &#36;{item.price.toFixed(2)}
        </p>
        <div className="flex flex-col gap-3 mb-8 justify-center mx-4 ">
          <div className=" flex items-center justify-between">
            <div>
              <span className="text-[12px] text-slate-600">Tutor</span>
              <div className=" flex items-center gap-2">
                <p className=" font-bold">{makeSubString(item.teacher.name)}</p>
                <div className=" flex items-center gap-1">
                  <FaStar className=" text-[tomato]" />
                  {item.rating ? item.rating : "0/5"}
                </div>
              </div>
            </div>
            <div className=" flex items-center gap-1 bg-green-200 px-2 py-1 rounded-md">
              <MdVerified className=" text-green-700" />
              <p className=" text-green-700 text-[10px]">verified</p>
            </div>
          </div>
          <div className="flex items-center gap-4 ">
            <Image
              className=" w-[25px] h-[25px]"
              src={`/${item.subject.toLowerCase()}.png`}
              alt={item.subject}
              width={200}
              height={200}
            />
            <p className="font-bold">{capitalizeString(item.subject)}</p>
          </div>
          <div className=" flex items-center gap-2">
            <p className="font-medium text-sm">
              {convertArray(item.schedules)}
            </p>
            <p className=" h-4 border border-slate-800"></p>
            <p className=" font-medium text-sm lowercase">{item.classTime}</p>
          </div>
        </div>
      </div>
      {showpayments && <Checkout {...item} enroll={enroll} />}
    </>
  );
};

const Checkout: React.FC<Iclass & { enroll: () => void }> = ({ enroll }) => {
  return (
    <div
      onClick={enroll}
      className=" fixed flex items-center justify-center w-full h-screen top-0 left-0 bottom-0 z-[99999999] bg-[rgba(0,0,0,0.1)] backdrop-blur-sm"
    >
      <p>showing things now</p>
    </div>
  );
};

const PopularClasses = () => {
  // function that is called at each step to get the classes based on parameter
  const getItems = async ({ pageParam }: { pageParam: number }) => {
    const response = await fetch(`/api/apply-for-class?page=${pageParam}`);
    return response.json();
  };

  const {
    data,
    status,
    error,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["infinite"],
    queryFn: getItems,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      const nextPage = lastPage.length !== 0 ? allPage.length + 1 : undefined;
      return nextPage;
    },
  });
  // checking if it is loading
  if (status === "pending") {
    return <div className="">loading skeleton appears here</div>;
  }
  // checking for errors
  if (status === "error") {
    return <p>something went wrong, check your network status</p>;
  }
  // flaten the data gotten here
  const queryData = data?.pages.flat();
  return (
    <Container>
      <div className="w-full  mx-auto px-4 pt-16 pb-6">
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center xl:grid-cols-3 gap-6  lgl:px-10">
          {Array.isArray(queryData) &&
            queryData.map((item: Iclass, index) => (
              <PopularClassesCard key={index} item={item} />
            ))}
        </div>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default PopularClasses;
