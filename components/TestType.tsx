import React, { useState } from "react";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

interface TestTypeProps {
  onChangeComponent: (view: string) => void;
}

const TestType: React.FC<TestTypeProps> = ({ onChangeComponent }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleTestPaper = () => {
    onChangeComponent("TestPaper");
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

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
        <div className="flex flex-col md:flex-row mb-[50px]">
          <div>
            <div className="flex gap-10">
              <span className="bg-[#359C71] px-[7px] rounded-full text-white">
                1
              </span>
              <p className="text-[#359C71] font-bold">Choose Type</p>
            </div>
            <p className="border-l-2 border-[#E9ECEB] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#E9ECEB] rounded-full px-[7px] text-white">
                2
              </span>
              <p>Test Paper</p>
            </div>
            <p className="border-l-2 border-[#E9ECEB] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#E9ECEB] rounded-full px-[7px] text-white">
                3
              </span>
              <p>Settings</p>
            </div>
            <p className="border-l-2 border-[#E9ECEB] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#E9ECEB] rounded-full px-[7px] text-white">
                4
              </span>
              <p>Finalization</p>
            </div>
          </div>
          <form className="flex flex-col pl-[0] md:pl-[100px] mt-[40px] md:mt-[0]">
            <label className="font-bold text-[18px]">Set up your Test !</label>
            <input
              type="text"
              name="text"
              placeholder="Test Title"
              className="my-2 p-4 outline-none rounded-[8px] w-full md:w-[30vh] lg:w-[70vh] bg-white"
            />
            <div
              id="questionType"
              className="flex flex-col md:flex-row gap-3 my-2 w-full"
            >
              <div className="bg-[#FFFFFF] p-4 w-full rounded-[5px]">
                <div className="text-end">
                  <input
                    className="w-4 h-4 px-2 accent-lightGreen"
                    type="radio"
                    name="questionType"
                    value="typeQuestion"
                    checked={selectedOption === "typeQuestion"}
                    onChange={handleOptionChange}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <Image
                    src="/svgs/type-question.svg"
                    width={50}
                    height={50}
                    alt="Type Question"
                  />
                  <span className="font-bold text-[14px] pb-8 pt-6">
                    Type Question Paper
                  </span>
                </div>
              </div>
              <div className="bg-[#FFFFFF] p-4 w-full rounded-[5px]">
                <div className="text-end">
                  <input
                    className="w-4 h-4 px-2 accent-lightGreen"
                    type="radio"
                    name="questionType"
                    value="uploadQuestion"
                    checked={selectedOption === "uploadQuestion"}
                    onChange={handleOptionChange}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <Image
                    src="/svgs/upload-question.svg"
                    width={50}
                    height={50}
                    alt="Upload Question"
                  />
                  <span className="font-bold text-[14px] pb-8 pt-6">
                    Upload Question Paper
                  </span>
                </div>
              </div>
            </div>
            <Button
              onClick={handleTestPaper}
              className="bg-secondary w-full text-white text-[16px] px-6 py-7 my-3"
            >
              Proceed
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default TestType;
