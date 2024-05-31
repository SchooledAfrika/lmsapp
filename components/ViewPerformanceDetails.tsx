import React from "react";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const ViewPerformanceDetails = () => {
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

      <div className="flex flex-col md:flex-row gap-6 mb-[50px] rounded-[8px]">
        <div className="flex-4 px-8 py-5 bg-[#FFFFFF] w-full h-[30%] md:h-[100vh] overflow-y-auto">
          <span className="font-bold ">All Questions</span>
          <div className="shadow-lg mt-3 ">
            <div className="flex flex-col bg-[#FFFFFF] p-5">
              <div className="flex justify-between items-center">
                <label className="font-bold">Question 1</label>
                <Image src="/svgs/mark.svg" alt="Mark" width={20} height={20} />
              </div>

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
              <div className="flex justify-between items-center">
                <label className="font-bold">Question 2</label>
                <Image
                  src="/svgs/cancel.svg"
                  alt="cancel"
                  width={20}
                  height={20}
                />
              </div>
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
        </div>

        <div className="flex-4 px-8 py-5 bg-[#FFFFFF] rounded-[8px] h-[35vh]">
          <div className="flex gap-2 md:mb-0 mb-3">
            <Image
              src="/applicantImg.png"
              width={60}
              height={60}
              alt="Profile Image"
            />
            <div className="flex flex-col">
              <span className="text-[14px] font-bold">Alex Iwobi Samuel</span>
              <div className="flex gap-3 mt-2">
                <span className="text-[10px] bg-[#359C714D] px-3 font-bold py-1 rounded-[5px]  text-[#359C71]">
                  Active
                </span>
                <p className="text-[10px] font-bold px-2 text-[#FF6634] py-1 rounded-[5px] bg-[#FF66344D]">
                  Student
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between my-4">
              <div className="flex flex-col gap-2 items-center">
                <p className="text-[13px] font-medium">Score Attained(%)</p>
                <span className="text-[12px] font-bold">82%</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <p className="text-[13px] font-medium">Time Mark</p>
                <span className="text-[12px] font-bold">12m 34s</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <p className="text-[13px] font-medium">Date Attempted</p>
                <span className="text-[12px] font-bold">68.5%</span>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="py-3 bg-lightGreen hover:bg-green-700"
          >
            <Image
              src="/svgs/message.svg"
              width={15}
              height={15}
              className="mr-2"
              alt="Contact"
            />
            Contact
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ViewPerformanceDetails;
