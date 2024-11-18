"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Container from "@/components/Container";
import { Skeleton } from "@mui/material";
import { Noitem } from "@/components/ApplicantsTable";
import {
  PurchasedCourseCard,
  ICourses,
} from "../../teacher-dashboard/courses/courses";

const ShowSkeleton = () => {
  const myArray = new Array(6).fill(" ");
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {myArray.map((_, index) => (
        <Skeleton
          key={index}
          className="w-full rounded-md"
          height={250}
          variant="rectangular"
          animation="wave"
        />
      ))}
    </div>
  );
};

const Courses = () => {
  const {
    data: purchasedCoursesData,
    isLoading: isPurchasedLoading,
    isError: isPurchasedError,
    error: purchasedError,
  } = useQuery({
    queryKey: ["getPurchasedCourseByStudent"],
    queryFn: async () => {
      const response = await fetch("/api/courses-bought");
      const result = await response.json();
      return result;
    },
  });

  console.log(purchasedCoursesData);

  if (isPurchasedLoading) return <ShowSkeleton />;

  if (isPurchasedError) {
    return <div>{purchasedError?.message || "An error occurred"}</div>;
  }

  return (
    <Container>
      <div>
        <h2 className="font-bold text-center text-[25px] my-3">
          Purchased Courses
        </h2>
        {Array.isArray(purchasedCoursesData) &&
        purchasedCoursesData.length === 0 ? (
          <Noitem desc="No purchased courses" />
        ) : (
          <div className="grid mt-8 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 p-4 gap-3">
            {purchasedCoursesData?.map((item: ICourses, index: number) => (
              <PurchasedCourseCard item={item} key={index} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Courses;
