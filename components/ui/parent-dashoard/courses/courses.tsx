"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import Container from "@/components/Container";
import { Skeleton } from "@mui/material";
import { Noitem } from "@/components/ApplicantsTable";
import SinglePurchasedCourse from "./SinglePurchasedCourse";
import RemovePurchasedCourse from "./RemovePurchasedCourse";
import GiftCourse from "./GiftCourse";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "../../button";

export interface TeacherInfo {
  id: string;
  name: string;
  profilePhoto: string | null;
  status: string;
}

export interface ICourses {
  id: string;
  byAdmin: boolean;
  grade: string;
  details: string;
  teacherId: number;
  title: string;
  courseId: string;
  banner: string;
  subject: string;
  previewVideo: string;
  mainVideo: string;
  price: number;
  sellCount: string;
  createdAt: string;
  courseInfo?: {
    teacher: TeacherInfo;
  };
}

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

const PurchasedCourseCard: React.FC<{ item: ICourses }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDeleteOpen, setDeleteOpen] = useState<boolean>(false);
  return (
    <div className="w-full overflow-hidden font-header rounded-lg card flex flex-col justify-center gap-3 hover:-translate-y-2 transition-transform duration-300 group">
      <div className="relative text-white w-full h-[200px]">
        <Image
          className="w-full h-full object-cover"
          src={item.banner}
          alt="Course Banner"
          width={200}
          height={200}
        />
        <SinglePurchasedCourse
          title={item.title}
          details={item.details}
          teacherPhoto={item.courseInfo?.teacher?.profilePhoto || ""}
          teacher={item.courseInfo?.teacher?.name || "Unknown Teacher"}
          banner={item.banner}
          previewVideo={item.previewVideo}
          mainVideo={item.mainVideo}
          price={item.price}
          id={item.id}
        />
        <Button
          onClick={() => setDeleteOpen(true)}
          className="bg-dimOrange cursor-pointer absolute -translate-y-1/2 right-3 rounded-md text-white text-[12px] font-bold px-4 py-2 text-center lg:block"
        >
          Delete Course
        </Button>
        <RemovePurchasedCourse
          setDeleteOpen={setDeleteOpen}
          isDeleteOpen={isDeleteOpen}
          courseId={item.id}
        />
      </div>

      <div className="flex flex-col gap-3 mb-8 justify-center mx-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center mt-6 gap-2">
              <p className="text-[14px] font-bold">{item.title}</p>
            </div>
            <div className="flex items-center pt-1 gap-2">
              <p className="w-[600px] sm:inline hidden text-[12px] font-semibold leading-5 py-3">
                <Image
                  className="w-[30px] inline rounded-full object-cover mr-1 h-[30px]"
                  src={item.courseInfo?.teacher?.profilePhoto || ""}
                  alt="Teacher Profile"
                  width={30}
                  height={30}
                />
                {item.courseInfo?.teacher?.name || "Unknown Teacher"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-green-200 px-2 py-1 rounded-md">
            <MdVerified className="text-green-700" />
            <p className="text-green-700 text-[10px]">verified</p>
          </div>
        </div>
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-lightGreen cursor-pointer rounded-md text-white text-[12px] font-bold px-4 py-2"
        >
          Gift Course to Ward
        </Button>
        <GiftCourse isOpen={isOpen} setIsOpen={setIsOpen} courseId={item.id} />
      </div>
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
