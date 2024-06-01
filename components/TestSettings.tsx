import React from "react";
import Image from "next/image";
import Container from "./Container";
import Link from "next/link";
import { Button } from "./ui/button";

interface TestSettingsProps {
  onChangeComponent: (view: string) => void;
}

const TestSettings: React.FC<TestSettingsProps> = ({ onChangeComponent }) => {
  const handleTestFinalization = () => {
    onChangeComponent("TestFinalization");
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
        <div className="flex flex-col md:flex-row  mb-[50px]">
          <div>
            <div className="flex gap-10">
              <span className="bg-[#359C71] px-[7px] rounded-full text-white">
                1
              </span>
              <p className="text-[#359C71] font-bold">Choose Type</p>
            </div>
            <p className="border-l-2 border-[#359C71] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#359C71] rounded-full px-[7px] text-white">
                2
              </span>
              <p className="text-[#359C71] font-bold">Test Paper</p>
            </div>
            <p className="border-l-2 border-[#359C71] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#359C71] rounded-full px-[7px] text-white">
                3
              </span>
              <p className="text-[#359C71] font-bold">Settings</p>
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
            <label className="flex itmems-center gap-2 my-4 rounded pr-4 w-full bg-[#FFFFFF]">
              <input
                type="text"
                name="text"
                placeholder="Select Grade(s)"
                className="my-2 p-3 outline-none rounded-[8px] w-full md:w-[30vh] lg:w-[60vh]"
              />
              <Image
                src="/svgs/polygon.svg"
                alt="Triangle"
                width={25}
                height={25}
              />
            </label>
            <label className="flex itmems-center gap-2 mb-4 rounded pr-4 w-full bg-[#FFFFFF]">
              <input
                type="text"
                name="text"
                placeholder="Select Grade(s)"
                className="p-3 outline-none rounded-[8px] w-full md:w-[30vh] lg:w-[60vh]"
              />
              <Image
                src="/svgs/lets-clock.svg"
                alt="Triangle"
                width={30}
                height={30}
              />
            </label>
            <label className="flex itmems-center mb-4 gap-2 rounded pr-4 w-full bg-[#FFFFFF]">
              <input
                type="text"
                name="text"
                placeholder="Select Grade(s)"
                className="my-2 p-3 outline-none rounded-[8px] w-full md:w-[30vh] lg:w-[60vh]"
              />
              <Image
                src="/svgs/lets-date-fill.svg"
                alt="Triangle"
                width={25}
                height={25}
              />
            </label>
            <label className="flex itmems-center gap-2 rounded pr-4 w-full bg-[#FFFFFF]">
              <input
                type="text"
                name="text"
                placeholder="Select Grade(s)"
                className="my-2 p-3 outline-none rounded-[8px] w-full md:w-[30vh] lg:w-[60vh]"
              />
              <Image
                src="/svgs/lets-date-fill.svg"
                alt="Triangle"
                width={25}
                height={25}
              />
            </label>
            <div className="flex flex-col gap-4 my-5">
              <label>
                <input
                  className="w-4 h-4 px-2 accent-lightGreen"
                  type="checkbox"
                />
                <span className="font-bold text-[14px] pl-3">
                  Publish Results (Default)
                </span>
              </label>
              <label>
                <input
                  className="w-4 h-4 px-2 accent-lightGreen"
                  type="checkbox"
                />
                <span className="font-bold text-[14px] pl-3">
                  Randomize Question For Students
                </span>
              </label>
              <label>
                <input
                  className="w-4 h-4 px-2 accent-lightGreen"
                  type="checkbox"
                />
                <span className="font-bold text-[14px] pl-3">
                  Randomize Options For Students
                </span>
              </label>
            </div>
            <Button
              onClick={handleTestFinalization}
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

export default TestSettings;
