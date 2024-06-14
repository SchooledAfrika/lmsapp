import React from "react";
import Container from "./Container";
import Link from "next/link";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const ParentModuleTestOne = () => {
  const data = ["Option A", "Option B", "Option C", "Option D"];

  return (
    <section>
      <Container>
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[18px]">Module 1 Test</span>
            <span className="text-lightGreen font-bold text-[22px]">
              Completed
            </span>
            <div className="flex justify-end mb-2">
              <Link href={"#"}>
                <Button className="bg-transparent text-[#FF6634] border border-[#FF6634] px-8 text-[12px] py-3 my-3 mr-0 md:mr-6">
                  Exit
                </Button>
              </Link>
            </div>
          </div>
          <div className="block md:flex gap-[100px] items-center">
            <div className="flex-2">
              <span className="font-bold text-[12px]">Score</span>
              <div className="flex flex-col gap-3 justify-center items-center bg-white my-2 py-4 h-[20%]">
                <p className="font-bold text-[18px] p-2 text-lightGreen border-2 border-lightGreen rounded-full">
                  80%
                </p>
                <span className="text-[8px] px-2 font-medium text-center leading-tight">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elLorem
                  ipsum dolor sit amet, consectetuer adipiscing
                </span>
              </div>
            </div>
            <div className="flex flex-col flex-8 p-3">
              <label className="font-bold">Question 1</label>
              <Textarea
                className="p-4 resize-none focus:outline-none my-3 w-full md:w-[60%] h-[50px]"
                placeholder="Your Question here"
              />
              <label className="font-bold text-[12px]">Options</label>
              {data.map((testOptions, index) => (
                <label key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    name={`option${index}`}
                    placeholder={testOptions}
                    className="my-2 p-3 outline-none bg-[#FFFFFF] w-full md:w-[30vh] lg:w-[65vh] bg-[#F8F7F4]"
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
          <div className="flex justify-center gap-[22%] my-2">
            <div className="flex gap-4">
              <Button className="bg-[#359C714D] text-white">
                <FaArrowLeft />
              </Button>
              <Button className="bg-secondary text-white">
                <FaArrowRight />
              </Button>
            </div>
            <Button className="bg-lightGreen text-white text-[16px] px-6 py-2">
              Proceed
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ParentModuleTestOne;
