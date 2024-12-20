"use client";
import { Skeleton } from "@mui/material";

interface InnerTeacher {
  name: string;
  email: string;
  profilePhoto: string;
  id: string;
}
export interface IouterPart {
  teacher: InnerTeacher;
}
interface InnerStudent {
  name: string;
  email: string;
  profilePhoto: string;
  id: string;
}
export interface IouterStudent {
  createdAt: string;
  student: InnerStudent;
}
export interface Iannoucement {
  id: string;
  title: string;
  desc: string;
}

export interface IsingleClass {
  id: string;
  grade: string;
  name: string;
  subject: string;
  time: string;
  createdAt: string;
  SchoolClassExam: [];
  resourcesIds: [];
  SchoolClassTeacher: IouterPart[];
  SchoolClassStudent: IouterStudent[];
  school: {
    banner: string;
  };
  AnnouncementBySchoolClass: Iannoucement[];
}
// the loading indicators for the single classroom
export const SingleClassSkeleton = () => {
  return (
    <div className=" w-full flex flex-col gap-4">
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <Skeleton
          className=" w-full rounded-md"
          height={220}
          variant="rectangular"
          animation="wave"
        />
        <Skeleton
          className=" w-full rounded-md"
          height={220}
          variant="rectangular"
          animation="wave"
        />
        <Skeleton
          className=" w-full rounded-md"
          height={220}
          variant="rectangular"
          animation="wave"
        />
      </div>
      <div>
        <Skeleton
          className=" w-full rounded-md"
          height={300}
          variant="rectangular"
          animation="wave"
        />
      </div>
    </div>
  );
};
