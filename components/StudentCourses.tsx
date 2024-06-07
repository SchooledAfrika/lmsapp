"use client";
import * as React from "react";
import Image, { StaticImageData } from "next/image";
import { PopularCourses } from "@/constants";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProgressBar } from "@/components/ProgressBar";
import { NoProgressBar } from "@/components/NoProgressBar";
import { GiPadlock } from "react-icons/gi";

interface Props {
  index: number;
  icon: string;
  classes: string;
  subject: string;
  plan: string;
  pricingFree?: string;
  pricing?: string;
}

const CourseCard = ({
  icon,
  classes,
  subject,
  plan,
  pricingFree,
  pricing,
}: Props) => {
  return (
    <div className="w-full hover:-translate-y-2 my-6 transition-transform duration-300 group">
      <Card
        className={`${
          pricingFree
            ? "md:w-[320px] w-full"
            : "md:w-[320px] w-full opacity-45 cursor-not-allowed"
        }`}
      >
        <CardHeader>
          <Image
            className=" rounded-lg w-full"
            src={icon}
            alt="background"
            width={100}
            height={100}
          />
        </CardHeader>
        <CardContent>
          <p className="text-[13px] font-semibold">{classes}</p>
          <p className="text-[14px] my-2 font-bold">{subject}</p>
          <p>{pricingFree ? <ProgressBar /> : <NoProgressBar />}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="bg-dimYellow font-semibold text-[11.5px] text-white font-subtext px-3 py-2 rounded-md">
            {plan}
          </p>
          <div className="flex space-x-1">
            <p>{pricing ? <GiPadlock className="" /> : ""}</p>
            <p
              className={`${
                pricing
                  ? "text-[12px] font-semibold"
                  : "text-[12px] font-semibold"
              }`}
            >
              {pricing || pricingFree}
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

const StudentCourses = () => {
  return (
    <div className="grid mt-8  grid-cols-1 xs:grid-cols-2 md:grid-cols-3 items-center xl:grid-cols-3 gap-2">
      {PopularCourses.map((Course, index) => (
        <CourseCard index={index} key={Course.id} {...Course} />
      ))}
    </div>
  );
};

export default StudentCourses;
