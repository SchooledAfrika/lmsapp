"use client";
import React, { useState } from "react";
import Container from "./Container";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import TestSubject from "./TestSubject";
import TestResources from "./TestResources";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { GoDotFill } from "react-icons/go";
import { TestUploadResource } from "./TestUploadResource";

const TestAndResources = () => {
  const [showComponent, setShowComponent] = useState(true);

  const handleTestComponent = () => {
    setShowComponent(true);
  };

  const handleResourceComponent = () => {
    setShowComponent(false);
  };

  return (
    <section>
      <Container>
        <div className="flex justify-end mb-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="bg-secondary text-white text-[14px] p-5 font-bold my-3 mr-0 md:mr-6">
                <Image
                  src="/svgs/test-item.svg"
                  width={20}
                  height={20}
                  className="mr-2"
                  alt="New Item"
                />
                New Item
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40">
              <div className="grid gap-4 font-subtext">
                <div className="grid gap-2">
                  <div className="flex justify-start">
                    <Link
                      href={`/teacher-dashboard/test-and-resources/details`}
                    >
                      <p className="inline text-[12px] font-semibold">
                        <GoDotFill className="inline ml-0 text-lightGreen" />
                        Create New Test
                      </p>
                    </Link>
                  </div>
                  <hr className="bg-black" />
                  <TestUploadResource />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="block md:flex gap-4">
          <div className="flex-2 bg-[#FFFFFF] rounded-[8px]">
            <p className="font-bold text-[12px] px-5 pt-8 pb-3 text-gray-400">
              Test
            </p>
            <div
              onClick={handleTestComponent}
              className={`cursor-pointer ${
                showComponent ? "bg-[#359C7133]" : ""
              }`}
            >
              <div className="flex items-center px-5 pt-3 pb-2 gap-3 ">
                <Image
                  src="/svgs/calculate.svg"
                  width={30}
                  height={30}
                  alt="Calculator"
                />
                <span className="font-bold text-[14px]">Mathematics</span>
              </div>
              <div className="flex gap-2 text-[12px] font-medium pb-3 pl-[60px]">
                <span>April 22, 2024.</span>
                <span>12:09PM</span>
                <span>25 Minutes</span>
              </div>
            </div>
            <p className="font-bold text-[12px] px-5 py-3 text-gray-400">
              Resources
            </p>
            <div>
              <div className="flex items-center px-5 pt-3 pb-1 gap-3 ">
                <Image
                  src="/svgs/link.svg"
                  width={30}
                  height={30}
                  alt="Calculator"
                />
                <span className="font-bold text-[12px] italic cursor-pointer text-[#099ECF]">
                  docs.google.com/History of Economics/...
                </span>
              </div>
              <div className="flex gap-2 text-[12px] font-medium pb-3 pl-[60px]">
                <span>April 22, 2024.</span>
                <span>12:09PM</span>
                <span>25 Minutes</span>
              </div>
            </div>
            <div
              onClick={handleResourceComponent}
              className={`cursor-pointer my-3 ${
                showComponent ? "" : "bg-orange-100"
              }`}
            >
              <div className="flex items-center px-5 pt-3 pb-2 gap-3 ">
                <Image
                  src="/svgs/book.svg"
                  width={30}
                  height={30}
                  alt="Calculator"
                />
                <span className="font-bold text-[14px]">
                  How Europe underdeveloped Africa
                </span>
              </div>
              <div className="flex gap-2 text-[12px] font-medium pb-3 pl-[60px]">
                <span>April 22, 2024.</span>
                <span>12:09PM</span>
                <span>25 Minutes</span>
              </div>
            </div>
            <p className="font-bold text-[12px] px-5 pb-3 text-gray-400">
              Test
            </p>
            <div className="cursor-pointer pb-10">
              <div className="flex items-center px-5 pt-3 pb-2 gap-3 ">
                <Image
                  src="/svgs/calculate.svg"
                  width={30}
                  height={30}
                  alt="Calculator"
                />
                <span className="font-bold text-[14px]">Mathematics</span>
              </div>
              <div className="flex gap-2 text-[12px] font-medium pb-3 pl-[60px]">
                <span>April 22, 2024.</span>
                <span>12:09PM</span>
                <span>25 Minutes</span>
              </div>
            </div>
          </div>
          <div className="flex-3 bg-[#FFFFFF] rounded-[8px] p-5">
            {showComponent ? <TestSubject /> : <TestResources />}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TestAndResources;
