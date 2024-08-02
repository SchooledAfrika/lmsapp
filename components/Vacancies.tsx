"use client";
import Image from "next/image";
import Container from "./Container";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { MdVerified } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosSearch } from "react-icons/io";
import { toast } from "react-toastify";
import { GetClassLoader } from "./loaders/skeleton";
import { CircularProgress } from "@mui/material";
import { useInView } from "react-intersection-observer";

export interface Ivacancy {
  jobTitle: string;
  qualifications: string[];
  responsibility: string[];
  role: string;
  state: string;
  location: string;
  level: string;
  grade: string;
  description: string;
  minSalary: string;
  maxSalary: string;
  notes: string;
  id: string;
}

export const VacancyCard = ({ item }: { item: Ivacancy }) => {
  return (
    <>
      <div className="w-full overflow-hidden     font-subtext rounded-lg card flex flex-col justify-center gap-3 hover:-translate-y-2 transition-transform duration-300 group">
        <div className="relative text-white w-full h-[200px]">
          {/* <Image
            className="w-full h-full object-cover"
            src={item.classBanner}
            alt="background"
            width={200}
            height={200}
          /> */}
          <div className=" absolute top-0 left-0 w-full h-full items-center justify-center flex flex-col gap-3">
            <div className=" px-4 py-2 rounded-md bg-[rgba(0,0,0,0.6)] text-white">
              <p>{item.jobTitle}</p>
            </div>
            <div className=" px-4 py-2 rounded-md bg-[rgba(0,0,0,0.6)] text-white">
              <p>{item.grade}</p>
            </div>
          </div>
        </div>
        <p className="text-right mr-6 font-bold text-lightGreen">
          &#36;{item.minSalary}
        </p>
        <p className="text-right mr-6 font-bold text-lightGreen">
          &#36;{item.maxSalary}
        </p>
        <div className="flex flex-col gap-3 mb-8 justify-center mx-4 ">
          <div className=" flex items-center justify-between">
            <div>
              <span className="text-[12px] text-slate-600">School</span>
              <div className=" flex items-center gap-2">
                <p className=" font-bold"></p>
              </div>
            </div>
            <div className=" flex items-center gap-1 bg-green-200 px-2 py-1 rounded-md">
              <MdVerified className=" text-green-700" />
              <p className=" text-green-700 text-[10px]">verified</p>
            </div>
          </div>
          <div className=" flex items-center gap-2">
            <p className=" h-4 border border-slate-800"></p>
            <p className=" font-medium text-sm lowercase">{item.state}</p>
          </div>
        </div>
      </div>
    </>
  );
};

const Vacancies = () => {
  // creating our useref for watching the button when displayed
  const { ref, inView } = useInView();

  // function that is called at each step to get the classes based on parameter
  const getItems = async ({ pageParam }: { pageParam: number }) => {
    const response = await fetch(`/api/advert-application?page=${pageParam}`);
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
    queryKey: ["infinitejobs"],
    queryFn: getItems,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      const nextPage = lastPage.length !== 0 ? allPage.length + 1 : undefined;
      return nextPage;
    },
  });
  console.log(data);
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  // checking if it is loading
  if (status === "pending") {
    return (
      <Container>
        <GetClassLoader />
      </Container>
    );
  }
  // checking for errors
  if (status === "error") {
    return <p>{error.message}</p>;
  }
  // flaten the data gotten here
  const queryData = data?.pages.flat();
  return (
    <Container>
      {/* Searchbar */}
      <div className="bg-stone-100 font-subtext">
        <h2 className="font-bold font-subtext my-20 text-2xl text-center">
          Job Listing
        </h2>
        <div className=" md:w-[90%] w-[90%] mt-16 md:mt-6 mx-auto  cursor-pointer font-header  h-[100px] md:mx-auto bg-white rounded-[50px] flex items-center justify-center p-6 shadow-md">
          <div className="relative   overflow-hidden flex md:w-1/3 w-full  flex-col   mr-2 justify-center items-start md:border-r-2 leading-[90px]">
            <label className="ml-3 font-bold  absolute -top-4   ">SEARCH</label>

            <input
              placeholder="By class, Course, School"
              className="bg-transparent    ml-2 mt-3   focus:outline-none"
            />
          </div>

          <div className="relative hidden    overflow-hidden md:flex w-1/4  flex-col   mr-2 justify-center items-start border-r-2 leading-[90px]">
            <label className="ml-3 font-bold  absolute -top-4   ">
              EXPERIENCE LEVEL
            </label>

            <input
              placeholder="Years of Experience"
              className="bg-transparent   ml-2 mt-3   focus:outline-none"
            />
          </div>
          <div className="relative hidden   overflow-hidden md:flex w-1/4  flex-col   mr-2 justify-center items-start border-r-2 leading-[90px]">
            <label className="ml-3 font-bold  absolute -top-4   ">
              LOCATION
            </label>

            <input
              placeholder="Search by Location"
              className="bg-transparent   ml-2 mt-3   focus:outline-none"
            />
          </div>
          <div className="relative hidden   overflow-hidden md:flex w-1/3  flex-col   mr-2 justify-center items-start leading-[100px]">
            <label className="ml-3 font-bold  absolute -top-4   ">
              PRICE RANGE
            </label>

            <input
              placeholder="0-100,000"
              className="bg-transparent   ml-2 mt-3   focus:outline-none"
            />
          </div>

          <div className=" md:w-[80px] w-[60px] font-bold aspect-square rounded-full flex items-center md:justify-center justify-end bg-lightGreen text-white">
            <IoIosSearch className="font-bold text-2xl md:mr-0 md:text-xl mr-3" />
          </div>
        </div>
      </div>
      {/* searchbar ends */}
      <div className="w-full  mx-auto px-4 pt-16 pb-6">
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center xl:grid-cols-3 gap-6  lgl:px-10">
          {Array.isArray(queryData) &&
            queryData.map((item: Ivacancy, index) => (
              <VacancyCard key={index} item={item} />
            ))}
        </div>
      </div>
      <div className=" w-full flex items-center justify-center">
        {hasNextPage && (
          <div
            ref={ref}
            className=" px-4 py-2 rounded-md border bg-white w-fit flex items-center gap-2"
          >
            <CircularProgress color="success" />
            <p className=" text-green-800 font-bold">loading...</p>
          </div>
        )}
      </div>
      <ToastContainer />
    </Container>
  );
};

export default Vacancies;
