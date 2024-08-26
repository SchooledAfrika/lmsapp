"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BookSession from "./BookSession";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import Container from "./Container";
import { useConversion } from "@/data-access/conversion";
import { IoIosStar } from "react-icons/io";
import { Skeleton } from "@mui/material";

export interface Iratter {
  comment: string;
  rateValue: number;
  ratter: {
    name: string;
    profilePhoto: string;
  };
}

// type for this secion
export interface ISessionShow {
  id: string;
  teacherId: string;
  aboutTutor: string;
  subjects: string[];
  grade: string[];
  preference: string[];
  createdAt: Date;
  updatedAt: Date;
  teacher: {
    name: string;
    details: string;
    profilePhoto: string;
    language: string;
    rating: number;
    Ratting: Iratter[];
  };
}

// this shows the profile picture
const ProfileShow: React.FC<{
  profilePix: string;
  rating: any;
}> = ({ profilePix, rating }) => {
  return (
    <div className=" flex flex-col gap-2 sm:gap-4 items-center">
      <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[100px] lg:w-[170px] lg:h-[150px] ">
        <Image
          src={profilePix}
          alt=""
          width={200}
          height={200}
          className=" w-full h-full  object-cover rounded-md"
        />
      </div>
      <div>
        <div className=" flex flex-col sm:flex-row items-center gap-1 text-[10px] sm:text-[14px]">
          <p> 0 Sessions</p>
          <div className=" h-[25px] border border-slate-500 hidden sm:flex "></div>
          <p>0 Students</p>
        </div>
        <div className=" sm:hidden flex text-[10px] gap-1 items-center font-semibold">
          <p>Reviews</p>
          <IoIosStar className=" text-orange-500" />
          {rating === null ? <p>0</p> : <p>{rating}</p>}
        </div>
      </div>
    </div>
  );
};

// this shows the description of the teachers
const Desc: React.FC<{
  name: string;
  desc: string;
  grades: string[];
  subjects: string[];
  preference: string[];
  lang: string;
  id: string;
}> = ({ name, desc, grades, subjects, preference, lang, id }) => {
  const { makeSubstring, joinGrades } = useConversion();
  return (
    <div className=" flex flex-col md:gap-3 sm:gap-5">
      <div className=" flex items-center gap-2">
        <p className=" font-bold text-[20px] max-sm:text-[14px]">{name}</p>
        <MdVerified className=" text-[24px] text-green-800" />
      </div>
      <div>
        <p className=" hidden sm:flex text-[16px] text-slate-700">
          {makeSubstring(desc, 200)}
        </p>
        <p className="  sm:hidden text-[12px] text-slate-700">
          {makeSubstring(desc, 70)}
        </p>
        <div className=" flex flex-wrap items-center gap-2 w-full">
          <p className="text-[13px] text-black font-bold">
            Speaks:<span className=" ml-1">{lang}</span>
          </p>
          <div className=" flex-wrap flex items-center text-[13px] text-black font-bold gap-2">
            <p>Teaches:</p>
            <div className=" flex-wrap flex items-center gap-1">
              {subjects.map((subject, index) => (
                <div className=" flex items-center gap-1" key={index}>
                  <Image
                    src={`/${subject.toLowerCase()}.png`}
                    alt="subjects"
                    width={100}
                    height={100}
                    className=" w-[12px] aspect-square"
                  />
                  <p>{subject}</p>
                </div>
              ))}
            </div>
          </div>
          <div className=" flex items-center gap-1 text-[13px] text-black font-bold">
            <p>Grade:</p>
            <p>{joinGrades(grades)}</p>
          </div>
        </div>
        <div>
          <Link
            href={`/find-tutors/${id}`}
            className=" text-green-700 underline text-[12px] mt-3 cursor-pointer"
          >
            View profile
          </Link>
        </div>
      </div>
      <div className=" flex gap-3 flex-wrap">
        {preference.map((preference, index) => (
          <div
            key={index}
            className=" px-2 sm:px-4 py-2 rounded-md border border-orange-500 bg-orange-200 text-[8px] sm:text-[12px] text-black"
          >
            <p>{preference}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
const PayDetails: React.FC<{
  rating: number;
  setShowBooking: React.Dispatch<React.SetStateAction<boolean>>;
  showBooking: boolean;
}> = ({ rating, setShowBooking, showBooking }) => {
  return (
    <div className=" flex flex-2 flex-col items-center gap-4">
      <BookSession />
      <div className=" hidden  sm:flex text-[14px] gap-1 items-center font-bold">
        <p>Reviews</p>
        <IoIosStar className=" text-orange-500" />
        {rating === null ? <p>0</p> : <p>{rating.toFixed(2)}</p>}
      </div>
    </div>
  );
};

// single section here
const SingleSession: React.FC<{
  item: ISessionShow;
}> = ({ item }) => {
  const [showBooking, setShowBooking] = useState<boolean>(false);
  return (
    <div className=" w-full max-ss:flex-col flex  gap-3 bg-white shadow-md md:px-10 md:py-8 rounded-lg p-4">
      <div className=" flex flex-8 gap-6">
        <ProfileShow
          rating={item.teacher.rating}
          profilePix={item.teacher.profilePhoto}
        />
        <Desc
          name={item.teacher.name}
          desc={item.teacher.details}
          grades={item.grade}
          subjects={item.subjects}
          preference={item.preference}
          lang={item.teacher.language}
          id={item.id}
        />
      </div>
      <PayDetails
        showBooking={showBooking}
        setShowBooking={setShowBooking}
        rating={item.teacher.rating}
      />
    </div>
  );
};

const AllTutorLoading = () => {
  const dummyArray = new Array(10).fill("");
  return (
    <Container>
      <div className=" w-full flex flex-col gap-4 mt-5">
        {dummyArray.map((item, index) => (
          <div
            className=" w-full h-[300px] rounded-lg bg-slate-300 flex flex-col sm:flex-row px-7 animate-pulse py-4 gap-4"
            key={index}
          >
            <div className=" flex-8 flex gap-6">
              <div className=" h-[100px] sm:h-[120px] sm:w-1/5 w-2/5 animate-pulse bg-slate-400 rounded-md"></div>
              <div className=" w-full h-3/4 bg-slate-400 animate-pulse rounded-md"></div>
            </div>
            <div className=" flex-2 flex flex-col gap-3">
              <div className=" w-full h-[60px] sm:h-[50px] bg-slate-400 animate-pulse rounded-md"></div>
              <div className=" w-full hidden sm:flex h-[50px] bg-slate-400 animate-pulse rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

const AllTutors = () => {
  // creating our useref for watching the button when displayed
  const { ref, inView } = useInView();
  // function that is called at each step to get the classes based on parameter
  const getItems = async ({ pageParam }: { pageParam: number }) => {
    const response = await fetch(`/api/apply-for-section?page=${pageParam}`);
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
    queryKey: ["infiniteSession"],
    queryFn: getItems,
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
  // check if is loading
  if (status === "pending") {
    return <AllTutorLoading />;
  }
  if (status === "error") {
    return <div>something went wrong!!!, check your connection</div>;
  }
  // flaten the data gotten here
  const queryData: ISessionShow[] = data?.pages.flat();
  return (
    <Container>
      <div className=" w-full flex flex-col gap-3 mt-5">
        {queryData.map((item, index) => (
          <SingleSession key={index} item={item} />
        ))}
      </div>
    </Container>
  );
};

export default AllTutors;
