import React from "react";
import Image from "next/image";
import Container from "./Container";
import Link from "next/link";
import { Button } from "./ui/button";

interface TestSettingsProps {
  onChangeComponent: (view: string) => void;
}

const TestSettings = () => {
  return (
    <form className="flex flex-col pl-[0] mt-[40px] md:mt-[0]">
      <label className="font-bold text-[18px]">Set up your Test !</label>
      <label className="flex itmems-center gap-2 my-4 rounded pr-4 w-full bg-[#FFFFFF]">
        <input
          type="text"
          name="text"
          placeholder="Select Grade(s)"
          className="my-2 p-3 outline-none rounded-[8px] w-full md:w-[30vh] lg:w-[60vh]"
        />
        <Image src="/svgs/polygon.svg" alt="Triangle" width={25} height={25} />
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
          <input className="w-4 h-4 px-2 accent-lightGreen" type="checkbox" />
          <span className="font-bold text-[14px] pl-3">
            Publish Results (Default)
          </span>
        </label>
        <label>
          <input className="w-4 h-4 px-2 accent-lightGreen" type="checkbox" />
          <span className="font-bold text-[14px] pl-3">
            Randomize Question For Students
          </span>
        </label>
        <label>
          <input className="w-4 h-4 px-2 accent-lightGreen" type="checkbox" />
          <span className="font-bold text-[14px] pl-3">
            Randomize Options For Students
          </span>
        </label>
      </div>
    </form>
  );
};

export default TestSettings;
