"use client";
import Image from "next/image";
import Container from "./Container";
import {
  dataTagSymbol,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import { IoIosSearch } from "react-icons/io";
import { toast } from "react-toastify";
import { GetClassLoader } from "./loaders/skeleton";
import { CircularProgress, Skeleton } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { FaGraduationCap } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaSchoolFlag } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { useConversion } from "@/data-access/conversion";
import { GoDash } from "react-icons/go";
import { useSession } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";

interface Iteachers {
  teacherId: string;
}

export interface Ivacancy {
  jobTitle: string;
  qualifications: string[];
  responsibility: string[];
  role: string;
  state: string;
  location: string;
  level: string;
  description: string;
  minSalary: string;
  maxSalary: string;
  notes: string;
  id: string;
  school: {
    name: string;
  };
  createdAt: string;
  VacancyTeacher: Iteachers[];
}

// component for showing loading skeleton
const LoadingVacancy = () => {
  const loadingArray = new Array(5).fill("");
  return (
    <div className=" mt-32 w-full items-center flex flex-col gap-9">
      <Skeleton
        height={100}
        className=" w-3/5  rounded-full hidden sm:block"
        variant="rectangular"
        animation="wave"
      />
      <Skeleton
        height={80}
        className=" w-3/5  rounded-full sm:hidden"
        variant="rectangular"
        animation="wave"
      />
      <div className=" w-full flex gap-4 ">
        <div className=" flex flex-1 sm:flex-2 gap-3 flex-col">
          {loadingArray.map((item, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              animation="wave"
              className=" w-full rounded-md"
              height={300}
            />
          ))}
        </div>
        <div className=" hidden sm:flex flex-3">
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={500}
            className=" w-full rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

// component reusable for price display
const PricePart: React.FC<{ data: Ivacancy }> = ({ data }) => {
  const { convertMoney } = useConversion();
  return (
    <div className=" flex items-center gap-4">
      <div className=" px-2 py-1 sm:px-4 sm:py-2 rounded-md text-[10px] sm:text-[12px] bg-orange-200 border border-orange-400">
        {data?.role === "FULLTIME" ? "Full-time" : "Part-time"}
      </div>
      <div className=" flex items-center px-2 py-1 sm:px-4 sm:py-2 rounded-md text-[10px] sm:text-[12px] bg-orange-200 border border-orange-400">
        <p>&#8358;{convertMoney(Number(data?.minSalary))}</p>
        <GoDash />
        <p>&#8358;{convertMoney(Number(data?.maxSalary))}</p>
      </div>
    </div>
  );
};

// for displaying all the main information about a vacancy here
const ViewDetails: React.FC<{
  viewDetail: Ivacancy | undefined;
  setViewDetail: React.Dispatch<React.SetStateAction<Ivacancy | undefined>>;
}> = ({ viewDetail, setViewDetail }) => {
  const { data, status } = useSession();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["apply-for-vacancy"],
    mutationFn: async () => {
      const response = await fetch("/api/advert-application", {
        method: "POST",
        body: JSON.stringify({ vacancyId: viewDetail?.id }),
      });
      return response;
    },
    onSuccess: async (response) => {
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        setViewDetail((detailInfo) => {
          if (detailInfo) {
            return {
              ...detailInfo,
              VacancyTeacher: [
                ...detailInfo.VacancyTeacher,
                { teacherId: data?.user.id as string },
              ],
            };
          }
          return detailInfo;
        });
        return queryClient.invalidateQueries({ queryKey: ["infinitejobs"] });
      } else {
        return toast.error(result.message);
      }
    },
  });

  const handleApply = () => {
    if (status === "unauthenticated") {
      return toast.error("login or register to apply!!!");
    }
    if (data?.user.role !== "Teacher") {
      return toast.error("only teachers can apply!!");
    }
    mutation.mutate();
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className=" w-full sticky top-[80px]"
    >
      <div className=" w-full bg-white rounded-md px-3 py-2 md:px-7 flex flex-col md:py-3 gap-6">
        {/* first div for some info */}
        <div className=" flex items-center justify-between">
          <div className=" flex flex-col gap-3">
            <p className="text-black font-bold">{viewDetail?.jobTitle}</p>
            <div className=" flex flex-col md:flex-row gap-3 text-[12px] font-semibold">
              <div className=" flex items-center gap-3">
                <div className=" flex items-center gap-1">
                  <FaGraduationCap className=" text-[14px]" />
                  <p>{viewDetail?.level}</p>
                </div>
                <div className=" flex items-center gap-1">
                  <FaLocationDot className=" text-[14px]" />
                  <p>{viewDetail?.location}</p>
                </div>
              </div>
              <div className=" flex items-center gap-1">
                <FaSchoolFlag className=" text-[14px]" />
                <p>{viewDetail?.school.name}</p>
              </div>
            </div>
            <PricePart data={viewDetail as Ivacancy} />
          </div>
          <button
            onClick={handleApply}
            disabled={Boolean(
              viewDetail?.VacancyTeacher.find(
                (check) => check.teacherId === (data?.user.id as string)
              )
            )}
            className=" cursor-pointer hover:bg-green-600 duration-700 ease-in-out transition-all transform px-3 sm:px-5 py-2 md:px-8 md:py-5 bg-green-700 text-white rounded-md flex items-center justify-center text-[10px] sm:text-[14px]"
          >
            <p>
              {Boolean(
                viewDetail?.VacancyTeacher.find(
                  (check) => check.teacherId === (data?.user.id as string)
                )
              )
                ? "Applied"
                : "Apply now!!"}
            </p>
          </button>
        </div>
        <div className=" w-full h-[300px] overflow-y-auto">
          {/* second div for details */}
          <div className=" flex flex-col gap-2">
            <p className=" text-black font-bold">Details</p>
            <p className=" font-serif">{viewDetail?.description}</p>
          </div>
          {/* third div for responsibility */}
          <div className=" flex flex-col gap-2">
            <p className=" text-black font-bold">Responsibilities</p>
            <ul className=" list-disc pl-7 ml-0">
              {viewDetail?.responsibility.map((item: string, index) => (
                <li className=" ml-0" key={index}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {/* fourth div for qualification */}
          <div className=" flex flex-col gap-2">
            <p className=" text-black font-bold">Qualifications</p>
            <ul className=" list-disc pl-7 ml-0">
              {viewDetail?.qualifications.map((item: string, index) => (
                <li className=" ml-0" key={index}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// for all the vacancy cards bellow
const EachVacancy: React.FC<{
  data: Ivacancy;
  currentId: string | undefined;
  setViewDetail: React.Dispatch<React.SetStateAction<Ivacancy | undefined>>;
  setMobileDetails: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ data, currentId, setViewDetail, setMobileDetails }) => {
  const { getTimeAgo, makeSubstring, convertMoney } = useConversion();
  return (
    <div
      onClick={() => {
        setMobileDetails(true);
        setViewDetail(data);
      }}
      className={` w-full px-2 py-3 md:px-4 md:py-5 rounded-md bg-white cursor-pointer ${
        currentId === data.id && " border border-green-600"
      } flex flex-col gap-6 hover:bg-slate-100 transition-all hover:border hover:border-green-600 ease-in-out duration-700 transform`}
    >
      {/* top div */}
      <div className=" flex flex-col gap-1">
        <p className=" text-black font-bold">{data?.jobTitle}</p>
        <div className=" flex justify-between items-center">
          <div className=" flex flex-col gap-2 text-[10px] sm:text-[12px] font-semibold">
            <div className=" flex items-center gap-2">
              <FaGraduationCap className="text-[14px]" /> <p>{data?.level}</p>
            </div>
            <div className=" flex-col  gap-2  lg:items-center  lg:flex-row">
              <div className=" flex items-center gap-1">
                <FaLocationDot className=" text-[14px]" />
                <p>{data?.location}</p>
              </div>
              <div className=" flex items-center gap-1">
                <FaSchoolFlag />
                <p>{data?.school.name}</p>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-2">
            <div className=" flex gap-1 text-[12px] font-semibold">
              <p>Add to favourite</p>
              <FaRegHeart className=" text-[14px] text-green-700" />
            </div>
            <p className=" text-[10px] self-end flex">
              post {getTimeAgo(data?.createdAt)}
            </p>
          </div>
        </div>
      </div>
      {/* middle div */}
      <div className=" flex flex-col gap-1 text-[16px] xs:text-[12px] sm:text-[16px]">
        <p className=" font-bold text-black">Details</p>
        <p className=" font-serif">{makeSubstring(data?.description, 230)}</p>
      </div>
      {/* down div */}
      <PricePart data={data} />
    </div>
  );
};

const Vacancies = () => {
  const [viewDeatil, setViewDetail] = useState<Ivacancy | undefined>(undefined);
  const [mobileDetails, setMobileDetails] = useState<boolean>(false);
  // creating our useref for watching the button when displayed
  const { ref, inView } = useInView();

  // function that is called at each step to get the classes based on parameter
  const getJobs = async ({ pageParam }: { pageParam: number }) => {
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
    queryFn: getJobs,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      const nextPage = lastPage.length !== 0 ? allPage.length + 1 : undefined;
      return nextPage;
    },
  });
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);
  // checking if it is loading
  if (status === "pending") {
    return (
      <Container>
        <LoadingVacancy />
      </Container>
    );
  }
  // checking for errors
  if (status === "error") {
    return <p>{error.message}</p>;
  }
  // flaten the data gotten here
  const queryData = data?.pages.flat();
  if (queryData && viewDeatil === undefined) {
    const firstItem = queryData[0] as Ivacancy;
    setViewDetail(firstItem);
  }
  return (
    <div>
      <Container>
        {/* Searchbar */}
        <div className="bg-stone-100 font-subtext">
          <h2 className="font-bold font-subtext my-20 text-2xl text-center">
            Job Listing
          </h2>
          <div className=" md:w-[90%] w-[90%] mt-16 md:mt-6 mx-auto  cursor-pointer font-header  h-[100px] md:mx-auto bg-white rounded-[50px] flex items-center justify-center p-6 shadow-md">
            <div className="relative   overflow-hidden flex md:w-1/3 w-full  flex-col   mr-2 justify-center items-start md:border-r-2 leading-[90px]">
              <label className="ml-3 font-bold  absolute -top-4   ">
                SEARCH
              </label>

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
        <div className=" flex w-full gap-3 mt-8">
          <div className=" flex-1 sm:flex-2 flex flex-col gap-2">
            {queryData.map((data: Ivacancy, index) => (
              <EachVacancy
                key={index}
                data={data}
                setViewDetail={setViewDetail}
                currentId={viewDeatil?.id}
                setMobileDetails={setMobileDetails}
              />
            ))}
            <div className=" mt-4 flex items-center justify-center">
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
          </div>
          <div className=" hidden sm:block sm:flex-3">
            <ViewDetails
              viewDetail={viewDeatil}
              setViewDetail={setViewDetail}
            />
          </div>
        </div>
        <ToastContainer />
      </Container>
      {mobileDetails && (
        <div
          onClick={() => setMobileDetails(false)}
          className=" px-5 flex items-center justify-center  sm:hidden fixed w-full h-screen top-0 left-0 bottom-0 bg-[rgba(0,0,0,0.3)] z-[999] backdrop-blur-sm"
        >
          <ViewDetails viewDetail={viewDeatil} setViewDetail={setViewDetail} />
        </div>
      )}
    </div>
  );
};

export default Vacancies;
