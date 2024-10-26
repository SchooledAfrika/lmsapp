"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useClasses } from "@/data-access/class";
import Image from "next/image";


import { FaGraduationCap } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import Container from "@/components/Container";


import { Skeleton } from "@mui/material";
import { Noitem } from "@/components/ApplicantsTable";
import SingleParentCourses from "./SingleParentCourses";
import Link from "next/link";



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
  banner: string;
  subject: string;
  previewVideo: string;
  mainVideo: string;
  price: string;
  sellCount: string;
  createdAt: string;
  teacher: TeacherInfo;
}

// export const ShowSkeleton = () => {
//   const myArray = new Array(6).fill(" ");
//   return (
//     <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//       {myArray.map((item, index) => (
//         <Skeleton
//           key={index}
//           className=" w-full rounded-md"
//           height={250}
//           variant="rectangular"
//           animation="wave"
//         />
//       ))}
//     </div>
//   );
// };


const CourseCard: React.FC<{ item: ICourses }> = ({ item }) => {
  const { makeSubString } = useClasses();
  return (
    <>
      <div className="w-full overflow-hidden     font-header rounded-lg card flex flex-col justify-center gap-3 hover:-translate-y-2 transition-transform duration-300 group">
        <div className="relative text-white w-full h-[200px]">
          <Image
            className="w-full h-full object-cover"
            src={item.banner}
            alt="background"
            width={200}
            height={200}
          />

          
          <SingleParentCourses title={item.title} details={item.details} teacherPhoto={item.teacher.profilePhoto} teacher={item.teacher.name} banner={item.banner} previewVideo={item.previewVideo} mainVideo={item.mainVideo}/>
        </div>
        
        
        <div className="flex flex-col gap-3 mb-8 justify-center mx-4 ">
          <div className=" flex items-center justify-between">
            <div>
              <div className=" flex items-center gap-2">
                <p className="text-[14px] font-bold">{item.title}</p>
              </div>

              <div className=" flex items-center pt-1 gap-2">
                <p className="text-[13px] font-subtext font-medium">
                  <FaGraduationCap className="inline mr-1 text-lg" />
                  {item.byAdmin === true ? "SchooledAfrika" :  makeSubString(item.teacher.name)}
                 
                </p>
              </div>
            </div>
            <div className=" flex items-center gap-1 bg-green-200 px-2 py-1 rounded-md">
              <MdVerified className=" text-green-700" />
              <p className=" text-green-700 text-[10px]">verified</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ParentCourses = () => {

  // const { data, isFetching, isError, error } = useQuery({
  //   queryKey: ["getCourseByParents"],
  //   queryFn: async () => {
  //     const response = await fetch("");
  //     const result = await response.json();
  //     return result;
  //   },
  // });
  //console.log(data);

  // if (isFetching) {
  //   return <ShowSkeleton />;
  // }
  // if (isError) {
  //   return <div>{error.message}</div>;
  // }

  return (
    <Container>
    {/* {Array.isArray(data) && ( */}
      <div>
        {/* {data.length === 0 ? ( */}
          <div className="w-full flex flex-col">
            <Noitem desc="No new courses" />
            <Link href="/courses" className="font-bold mx-auto bg-lightGreen my-3  p-3 rounded-md text-white">Please purchase course</Link>
          </div>
        {/* ) : ( */}
          {/* <div className="grid mt-8 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 p-4 gap-3">
           {data.map((item: ICourses, index) => (
              <CourseCard
              item={item} key={index}
              />
            ))}
          </div>
        )} */}
      </div>
    {/* )} */}
  </Container>
    
  );
};

export default ParentCourses;
