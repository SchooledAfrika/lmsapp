"use client";
import * as React from "react";
import { useClasses } from "@/data-access/class";
import Image from "next/image";
import { AdminCourses } from "@/constants/adminCourses";

import { Button } from "@/components/ui/button";

import { FaGraduationCap } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import Container from "@/components/Container";
import Link from "next/link";
import EditCourses from "./EditCourses";
import RemoveCourse from "./RemoveCourse";

interface Props {
  index: number;
  title: string;
  teacher: string;
  description: string;
  courseBanner: string;
  coursePreview: string;
  courseVideo: string;
  price: string;
}

const CourseCard = ({
  title,
  teacher,
  description,
  courseBanner,
  coursePreview,
  courseVideo,
  price,
}: Props) => {
  const { makeSubString } = useClasses();
  return (
    <>
      <div className="w-full overflow-hidden     font-header rounded-lg card flex flex-col justify-center gap-3 hover:-translate-y-2 transition-transform duration-300 group">
        <div className="relative text-white w-full h-[200px]">
          <Image
            className="w-full h-full object-cover"
            src={courseBanner}
            alt="background"
            width={200}
            height={200}
          />

          {teacher === "SchooledAfrika" ? <EditCourses /> : ""}
          <RemoveCourse />
        </div>
        <p className="text-right mr-6 font-bold mt-3 text-lightGreen">
          {price}
        </p>
        <div className="flex flex-col gap-3 mb-8 justify-center mx-4 ">
          <div className=" flex items-center justify-between">
            <div>
              <div className=" flex items-center gap-2">
                <p className="text-[14px] font-bold">{title}</p>
              </div>

              <div className=" flex items-center pt-1 gap-2">
                <p className="text-[13px] font-subtext font-medium">
                  <FaGraduationCap className="inline mr-1 text-lg" />
                  {makeSubString(teacher)}
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

const CoursesAdmin = () => {
  return (
    <Container>
      <div className="grid mt-8 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 p-4 gap-3">
        {AdminCourses.map((course, index) => (
          <CourseCard
            index={index}
            key={course.id}
            title={course.title}
            teacher={course.teacher}
            description={course.description}
            courseBanner={course.courseBanner}
            coursePreview={course.coursePreview}
            courseVideo={course.courseVideo}
            price={course.price}
          />
        ))}
      </div>
    </Container>
  );
};

export default CoursesAdmin;
