"use client";
import * as React from "react";
import Image, { StaticImageData } from "next/image";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { ProgressBar } from "@/components/ProgressBar";
import Link from "next/link";
import { ParentCoursesData } from "@/constants/parentsCourse";

interface Props {
  index: number;
  icon: string;
  classes: string;
  title: string;
  time: string;
  module: string;
  pricing: string;
  payment?: string;
  purchase?: string;
}

const CourseCard = ({
  icon,
  classes,
  title,
  time,
  module,
  pricing,
  payment,
  purchase,
}: Props) => {
  return (
    <div className="w-full hover:-translate-y-2 my-6 transition-transform duration-300 group">
      <Link href="/parents-dashboard/courses/details">
        <Card className="h-[55vh]">
          <CardHeader>
            <Image
              className=" rounded-lg w-full"
              src={icon}
              alt="background"
              width={100}
              height={100}
            />
          </CardHeader>
          <div className="px-4">
            <p className="text-[13px] font-semibold">{classes}</p>
            <p className="text-[14px] my-2 font-bold">{title}</p>
            <div className="flex gap-4 pt-3 pb-4">
              <span className="flex items-center gap-2 font-medium text-[12px]">
                <Image
                  src="/svgs/anti-clock.svg"
                  width={15}
                  height={15}
                  alt="Clock"
                />
                {time}
              </span>

              <span className="flex items-center gap-2 font-medium text-[12px]">
                <Image
                  src="/svgs/module.svg"
                  width={15}
                  height={15}
                  alt="Module"
                />
                {module}
              </span>
            </div>
            {payment && (
              <p>
                <ProgressBar />
              </p>
            )}
          </div>
          <CardFooter className="flex justify-between">
            <p className="font-bold text-[18px] text-lightGreen font-subtext px-3 py-2 rounded-md">
              {payment ? "" : pricing}
            </p>
            <div
              className={`flex space-x-1 cursor-pointer ${
                payment ? "" : "bg-[#FF6634] p-2 rounded"
              }`}
            >
              <p
                className={`text-white ${
                  pricing
                    ? "text-[12px] font-semibold"
                    : "text-[12px] font-semibold"
                }`}
              >
                {payment ? "" : purchase}
              </p>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
};

const ParentCourses = () => {
  return (
    <div className="grid mt-8  grid-cols-1 xs:grid-cols-2 md:grid-cols-3 items-center xl:grid-cols-3 gap-2">
      {ParentCoursesData.map((Course, index) => (
        <CourseCard index={index} key={Course.id} {...Course} />
      ))}
    </div>
  );
};

export default ParentCourses;
