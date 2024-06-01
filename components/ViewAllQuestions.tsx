import React, { useState } from "react";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";

const ViewAllQuestions = () => {
  const data = ["Option A", "Option B", "Option C", "Option D"];

  return (
    <Container>
      <div className="flex justify-between items-center mb-5">
        <span className="font-bold">Details</span>
        <Link
          href="/teacher-dashboard/test-and-resources"
          className="cursor-pointer"
        >
          <Image src="/closeAlt.svg" alt="cancel" width={15} height={15} />
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-[50px]">
        <div className="flex-4 px-8 py-5 bg-[#FFFFFF] w-full h-[100vh] md:h-[80vh] overflow-y-scroll scrollbar-hide">
          <span className="font-bold ">All Questions</span>
          <div className="shadow-lg mt-3 ">
            <div className="flex flex-col bg-[#FFFFFF] p-5">
              <label className="font-bold">Question 1</label>
              <input
                type="text"
                name="question"
                placeholder="Your Question here"
                className="my-2 p-3 outline-none w-full md:w-[30vh] lg:w-[57vh] bg-[#F8F7F4]"
              />
              <label className="font-bold text-[12px]">Options</label>
              {data.map((testOptions, index) => (
                <label key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    name={`option${index}`}
                    placeholder={testOptions}
                    className="my-2 p-3 outline-none w-full md:w-[30vh] lg:w-[55vh] bg-[#F8F7F4]"
                  />
                  <input
                    type="radio"
                    name="preferences"
                    className="appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-green-600 checked:border-transparent focus:outline-none"
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="shadow-lg mt-5 ">
            <div className="flex flex-col bg-[#FFFFFF] p-5">
              <label className="font-bold">Question 2</label>
              <input
                type="text"
                name="question"
                placeholder="Your Question here"
                className="my-2 p-3 outline-none w-full md:w-[30vh] lg:w-[60vh] bg-[#F8F7F4]"
              />
              <label className="font-bold text-[12px]">Options</label>
              {data.map((testOptions, index) => (
                <label key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    name={`option${index}`}
                    placeholder={testOptions}
                    className="my-2 p-3 outline-none w-full md:w-[30vh] lg:w-[55vh] bg-[#F8F7F4]"
                  />
                  <input
                    type="radio"
                    name="preferences"
                    className="appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-green-600 checked:border-transparent focus:outline-none"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-4 px-8 py-5 bg-[#FFFFFF] rounded-[8px] h-[60vh]">
          <div className="flex items-center pt-3 pb-2 gap-3 ">
            <Image
              src="/svgs/calculate.svg"
              width={30}
              height={30}
              alt="Calculator"
            />
            <span className="font-bold text-[14px]">Mathematics</span>
          </div>
          <div>
            <div className="flex justify-between mt-4">
              <div className="flex flex-col gap-2 items-center">
                <p className="text-[13px] font-medium">No. of Students</p>
                <span className="text-[12px] font-bold">5</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <p className="text-[13px] font-medium">No of Test Takers</p>
                <span className="text-[12px] font-bold">2</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <p className="text-[13px] font-medium">Average Score</p>
                <span className="text-[12px] font-bold">68.5%</span>
              </div>
            </div>

            <div className="flex justify-between my-8">
              <div className="flex flex-col gap-2 items-center">
                <p className="text-[13px] font-medium">No. of Questions</p>
                <span className="text-[13px] font-bold">10</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <p className="text-[13px] font-medium">
                  Highest Attainable Score
                </p>
                <span className="text-[12px] font-bold">10</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <p className="text-[13px] font-medium">Grade</p>
                <span className="text-[12px] font-bold">Grade 11</span>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex flex-col gap-2 items-center">
                <p className="text-[13px] font-medium">Duration</p>
                <span className="text-[13px] font-bold">25 Minutes</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <p className="text-[13px] font-medium">Start Time</p>
                <span className="text-[12px] font-bold">--</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <p className="text-[13px] font-medium">End Time</p>
                <span className="text-[12px] font-bold">--</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ViewAllQuestions;
