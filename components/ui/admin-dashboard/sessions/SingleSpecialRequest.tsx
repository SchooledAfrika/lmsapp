"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  LoadingSkeleton,
  ShowAllSessionProfile,
  StudentInfos,
} from "./SingleSessionAdmin";
import { useParams } from "next/navigation";
import { ToastContainer } from "react-toastify";

interface ISpecialRequest {
  id: string;
  studentId: string;
  amt: number;
  language: string;
  subject: string;
  grade: string;
  time: string;
  kindOfTeacher: string;
  merged: boolean;
  createdAt: string;
  student: {
    id: string;
    name: string;
    email: string;
    profilePhoto: string;
  };
}

const SingleSpecialRequest = () => {
  const { id } = useParams();
  const { isLoading, data, isError, error } = useQuery<ISpecialRequest>({
    queryKey: ["single-special-request"],
    queryFn: async () => {
      const response = await fetch(`/api/special-request/${id}`);
      const result = await response.json();
      return result;
    },
  });

  if (isLoading) {
    return <LoadingSkeleton title="Single unmerged special request" />;
  }

  if (isError) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className=" w-full flex items-center justify-center">
        <p className=" mb-4 text-black font-bold text-[24px]">
          Single unmerged session
        </p>
      </div>
      <div className=" w-full md:px-20">
        <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 border-2 px-4 py-2 rounded-md shadow-md ">
          <StudentInfos
            email={data?.student.email!}
            name={data?.student.name!}
            profilePhoto={data?.student.profilePhoto!}
            sectionType={"Special Request"}
            grade={data?.grade!}
            daytime={data?.time}
            createdAt={data?.createdAt!}
            amt={data?.amt!}
            merged={data?.merged!}
            kindofteacher={data?.kindOfTeacher!}
            specialRequest={true}
          />
          <ShowAllSessionProfile url="/api/special-request" />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SingleSpecialRequest;
