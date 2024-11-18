"use client";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Container from "@/components/Container";
import { Skeleton } from "@mui/material";
import { Noitem } from "@/components/ApplicantsTable";
import { toast, ToastContainer } from "react-toastify";
import {
  PurchasedCourseCard,
  ICourses,
} from "../../teacher-dashboard/courses/courses";

const ShowSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {Array.from({ length: 6 }).map((_, index) => (
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
  } = useQuery<ICourses[]>({
    queryKey: ["getPurchasedCourseByParent"],
    queryFn: async () => {
      const response = await fetch("/api/courses-bought");
      if (!response.ok) throw new Error("Failed to fetch purchased courses.");
      return response.json();
    },
    refetchOnWindowFocus: false,
    staleTime: 10000,
  });

  // Show toast messages when there's an error
  useEffect(() => {
    if (isPurchasedError && purchasedError instanceof Error) {
      toast.error(purchasedError.message);
    }
  }, [isPurchasedError, purchasedError]);

  if (isPurchasedLoading) return <ShowSkeleton />;

  return (
    <Container>
      <div>
        <h2 className="font-bold text-center text-[25px]">Purchased Courses</h2>
        {Array.isArray(purchasedCoursesData) &&
        purchasedCoursesData.length === 0 ? (
          <Noitem desc="No purchased courses" />
        ) : (
          <div className="grid mt-2 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 p-4 gap-3">
            {purchasedCoursesData?.map((item: ICourses) => (
              <PurchasedCourseCard item={item} key={item.id} />
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </Container>
  );
};

export default Courses;
