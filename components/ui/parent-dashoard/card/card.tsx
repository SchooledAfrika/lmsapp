"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { CircularProgress } from "@mui/material";

// Define interfaces for type safety
interface TotalClasses {
  classNo: number;
}

interface TotalTeachers {
  teachersNo: number;
}

interface TotalAssessments {
  totalExams: number;
}

// function to return small reuseable loaders
const SmallLoaders = () => {
  return <CircularProgress size={30} color="primary" />;
};
// function to return the totalValue in the different div
const TotalValues: React.FC<{ itemNumber: number }> = ({ itemNumber }) => {
  return <h3 className="font-bold text-xl pb-3">{itemNumber}</h3>;
};

const Card = () => {
  // get wardId from the cookies
  const wardId = Cookies.get("wardId");

  // Fetch total classes
  const {
    data: totalClassesData = { classNo: 0 },
    isLoading: loadingClasses,
    isError: errorClasses,
  } = useQuery<TotalClasses>({
    queryKey: ["totalClasses", wardId],
    queryFn: async () => {
      const response = await fetch(
        `/api/parent-info/parents-child-overview/total-classes?childId=${wardId}`
      );
      return response.json();
    },
    enabled: !!wardId, // Ensure the query only runs if id is present
  });

  // Fetch total teachers
  const {
    data: totalTeachersData = { teachersNo: 0 },
    isLoading: loadingTeachers,
    isError: errorTeachers,
  } = useQuery<TotalTeachers>({
    queryKey: ["totalTeachers", wardId],
    queryFn: async () => {
      const response = await fetch(
        `/api/parent-info/parents-child-overview/total-teacher?childId=${wardId}`
      );
      if (!response.ok) throw new Error("Failed to fetch total teachers");
      return response.json();
    },
    enabled: !!wardId, // Ensure the query only runs if id is present
  });

  // Fetch total assessments
  const {
    data: totalAssessmentsData = { totalExams: 0 },
    isLoading: loadingAssessments,
    isError: errorAssessments,
  } = useQuery<TotalAssessments>({
    queryKey: ["totalAssessments", wardId],
    queryFn: async () => {
      const response = await fetch(
        `/api/parent-info/parents-child-overview/total-exams?childId=${wardId}`
      );
      if (!response.ok) throw new Error("Failed to fetch total assessments");
      return response.json();
    },
    enabled: !!wardId, // Ensure the query only runs if id is present
  });

  return (
    <div className="w-full bg-stone-100 ">
      {/* Card section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3  gap-3">
        {/* Total Classes Card */}
        <div className="flex text-sm p-3 justify-between space-x-2 py-6 bg-white rounded-md">
          <div className="flex flex-col justify-evenly">
            <TotalValues itemNumber={totalClassesData?.classNo as number} />
            <p className="font-semibold pb-2">Total Sessions</p>
          </div>
          <Image
            src="/book.png"
            alt="Total Sessions"
            width={100}
            height={100}
            className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]"
          />
        </div>

        {/* Total Teachers Card */}
        <div className="flex text-sm p-3 justify-between space-x-2 bg-white rounded-md">
          <div className="flex flex-col justify-evenly">
            <TotalValues itemNumber={totalTeachersData?.teachersNo as number} />

            <p className="font-semibold pb-2">Total Teachers</p>
          </div>
          <Image
            src="/teach.png"
            alt="Total Teachers"
            width={100}
            height={100}
            className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]"
          />
        </div>
        {/* Total Assessments Card */}
        <div className="flex  text-sm p-3 justify-between space-x-2 bg-white rounded-md">
          <div className="flex flex-col justify-evenly">
            <TotalValues
              itemNumber={totalAssessmentsData?.totalExams as number}
            />
            <p className="font-semibold pb-2">Total Assessments</p>
          </div>
          <Image
            src="/resources.png"
            alt="Total Assessments"
            width={50}
            height={50}
            className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
