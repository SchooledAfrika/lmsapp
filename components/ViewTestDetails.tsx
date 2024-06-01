"use client";
import React, { useState } from "react";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import ViewPerformance from "./ViewPerformance";

interface ViewTestDetailsProps {
  onClickChange: () => void;
}

const ViewTestDetails: React.FC<ViewTestDetailsProps> = ({ onClickChange }) => {
  const data = ["Option A", "Option B", "Option C", "Option D"];

  return (
    <section>
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
        <div className="flex flex-col md:flex-row gap-8 mb-[50px]">
          <div className="flex-4 px-4 py-5 bg-[#FFFFFF]">
            <div className="flex flex-col md:flex-row justify-between">
              <span className="font-bold pb-[10px] text-center">
                Test Overview
              </span>
              <Button className="bg-transparent text-[#359C71] font-bold border border-[#359C71]">
                Assign to Student
              </Button>
            </div>
            <div className="flex flex-col md:flex-row gap-2 justify-between my-8">
              <div className="flex flex-col gap-2 md:gap-4 items-center">
                <p className="text-[14px] font-medium">No. of Students</p>
                <span className="text-[12px] font-bold">5</span>
              </div>
              <div className="flex flex-col gap-4 items-center">
                <p className="text-[14px] font-medium">No of Test Takers</p>
                <span className="text-[12px] font-bold">2</span>
              </div>
              <div className="flex flex-col gap-4 items-center">
                <p className="text-[14px] font-medium">Average Score</p>
                <span className="text-[12px] font-bold">68.5%</span>
              </div>
            </div>
            <div>
              <span className="font-bold">Test Questions</span>
              <div className="shadow-lg mt-5">
                <div className="flex flex-col bg-[#FFFFFF] p-5">
                  <label className="font-bold">Question 1</label>
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
              <div className="flex justify-between items-center my-5">
                <button
                  onClick={onClickChange}
                  className="font-bold text-[14px] underline text-[#359C71] hover:bg-green-200 rounded p-2"
                >
                  View All Questions
                </button>
                <Button className="bg-transparent text-[12px] font-bold text-[#FF6634] border border-[#FF6634]">
                  Delete Test
                </Button>
              </div>
            </div>
          </div>
          <div className="flex-5 bg-[#FFFFFF] h-[30vh]">
            <ViewPerformance />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ViewTestDetails;
