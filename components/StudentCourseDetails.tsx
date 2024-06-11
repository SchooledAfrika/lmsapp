"use client";
import React, { useState } from "react";
import Container from "./Container";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { StudentCourseVideoData } from "@/constants/studentCourseData";

const StudentCourseDetails = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (index: any) => {
    setSelectedItem(index);
  };

  return (
    <section className="my-[80px] md:my-6">
      <Container>
        <div className="flex justify-end mb-2">
          <Link href={"#"}>
            <Button className="bg-transparent text-[#FF6634] border border-[#FF6634] px-8 text-[12px] py-3 my-3 mr-0 md:mr-6">
              Leave
            </Button>
          </Link>
        </div>
        <div className="block md:flex gap-4">
          <div className="flex-6">
            <Image
              src="/student-video.png"
              width={1000}
              height={1000}
              alt="Student Video"
            />
            <p className="text-[14px] font-bold pt-4">Mathematics Waec Prep</p>
            <p className="text-[12px] pt-2 font-medium leading-relaxed">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </p>

            <div className="flex py-6">
              <div className="flex items-center gap-3 pr-4 border-r-2">
                <Image
                  src="/profile.png"
                  width={50}
                  height={50}
                  alt="Student Video"
                />
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold">Queen Victoria</span>
                  <span className="text-[12px] font-medium">
                    Schooled Afrika Affilated
                  </span>
                </div>
              </div>

              <div className="px-8 border-r-2">
                <span className="text-[14px] font-bold">5/5 Rating</span>
                <p>⭐⭐⭐⭐⭐</p>
              </div>
              <div className="flex items-center pl-4">
                <span className="text-[14px] font-bold underline text-lightGreen">
                  View Profile
                </span>
              </div>
            </div>
          </div>

          <div className="flex-4 bg-white rounded-[8px] p-4">
            <p className="text-[16px] py-4 font-bold">Modules</p>
            {StudentCourseVideoData.map((details, index) => (
              <div
                key={index}
                onClick={() => handleClick(index)}
                className={`hover:bg-[#359C7133] cursor-pointer my-2 p-3 rounded-[8px] ${
                  index === selectedItem ? "bg-[#359C7133]" : ""
                }`}
              >
                <div className="flex gap-4">
                  <p
                    className={`font-medium text-[14px] text-white px-2 rounded-full ${
                      index === selectedItem
                        ? "bg-lightGreen"
                        : "bg-[#00000033]"
                    }`}
                  >
                    {details.numbering}
                  </p>
                  <span className="font-medium text-[14px]">
                    {details.module}
                  </span>
                </div>
                <p className="text-[16px] pl-9 font-bold pt-2">
                  {details.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default StudentCourseDetails;
