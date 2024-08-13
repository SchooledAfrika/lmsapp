import Image from "next/image";
import React from "react";
import { AdminCourses } from "@/constants/adminCourses";
import AdminCourseInfo from "../AdminCourseInfo";
import Link from "next/link";

const courses = () => {
  return (
    <section>
      <div className="flex flex-wrap justify-center lg:justify-normal gap-5 w-full">
        {AdminCourses.map((details, index) => (
          <div
            key={index}
            className=" bg-[#FFFFFF] lg:w-[30%] py-7 shadow-lg px-4 rounded-[10px]"
          >
            <div className="flex justify-between">
              <Link href={"/admin-dashboard/courses/details"}>
                <div className="cursor-pointer flex gap-4">
                  <Image
                    src={details.courseImg}
                    width={50}
                    height={50}
                    alt="Teacher Image"
                  />
                  <div>
                    <p className="font-bold">{details.courseName}</p>
                    <span className="text-[14px]">{details.category}</span>
                  </div>
                </div>
              </Link>
              <AdminCourseInfo />
            </div>
            <div className="py-4">
              <p className="text-gray-500 text-[14px] font-bold">
                {details.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <p className="text-[10px] bg-green-200 rounded px-3 font-bold text-green-700 py-1">
                {details.photoshop}
              </p>
              <p className="text-[10px] bg-orange-200 rounded px-3 font-bold text-orange-700 py-1">
                {details.adobe}
              </p>
              <p className="text-[10px] bg-blue-200 rounded px-3 font-bold text-blue-700 py-1">
                {details.design}
              </p>
              <p className="text-[10px] bg-purple-200 rounded px-3 font-bold text-purple-700 py-1">
                {details.drawing}
              </p>
              <p className="text-[10px] bg-red-200 rounded px-3 font-bold text-red-700 py-1">
                {details.figma}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default courses;
