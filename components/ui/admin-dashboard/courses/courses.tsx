import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AdminCourses } from "@/constants/adminCourses";
import { Button } from "../../button";

const courses = () => {
  return (
    <section>
      <div className="flex items-center justify-between pb-3">
        <div>
          <h1 className="text-[20px] font-bold">Course Categories</h1>
          <span className="text-[14px]">You have total of 8 categories</span>
        </div>

        <Button className="bg-secondary text-white text-[12px] py-5 my-3 mr-0 md:mr-6">
          <Image
            src="/svgs/edit.svg"
            width={20}
            height={20}
            className="mr-2"
            alt="Add Category"
          />
          Add Category
        </Button>
      </div>
      <div className="flex flex-wrap justify-center lg:justify-normal gap-3 w-full">
        {AdminCourses.map((details, index) => (
          <div
            key={index}
            className=" bg-[#FFFFFF] lg:w-[30%] py-7 shadow-lg px-4 rounded-[10px]"
          >
            <div className="flex justify-between">
              <div className="flex gap-4">
                <Image
                  src={details.courseImg}
                  width={50}
                  height={50}
                  alt="Teacher Image"
                />
                <div>
                  <p className="font-bold text-[12px]">{details.courseName}</p>
                  <span className="">{details.category}</span>
                </div>
              </div>
              <div>
                <Image
                  src="/svgs/ellipse.svg"
                  width={20}
                  height={20}
                  alt="Ellipses"
                />
              </div>
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
