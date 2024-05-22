import Image from "next/image";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { IoLanguage } from "react-icons/io5";
import { GiEmptyHourglass } from "react-icons/gi";

interface DurationProps {
  onClickDurationInfo: () => void;
}

const Duration: React.FC<DurationProps> = ({ onClickDurationInfo }) => {
  return (
    <div className="">
      <h3 className="text-xl font-bold">Book Session</h3>

      <div className="flex  mx-auto mt-8 mb-20 max-w-[360px] flex-col gap-3">
        <p className="text-lightGreen text-[15px] ml-8 font-semibold">
          Language & Duration
        </p>
        <p className="text-[14px] ml-8 font-semibold">
          Confirm the teacher&apos;s language of choice <br /> and select the
          session duration.
        </p>
        <div className="border ml-8  justify-between px-3 flex py-4  rounded-md ">
          <div className="flex space-x-4">
            <IoLanguage className="text-2xl" />
            <div className="flex space-y-2 flex-col">
              <p className="text-[13px]">Language</p>
              <p className="font-semibold">English</p>
            </div>
          </div>

          <input className="w-4 accent-lightGreen" type="checkbox" />
        </div>
        <div className="border ml-8  justify-between px-3 flex py-4  rounded-md ">
          <div className="flex space-x-4">
            <GiEmptyHourglass className="text-2xl" />
            <div className="flex space-y-2 flex-col">
              <p className="text-[13px]">Duration</p>
              <p className="font-semibold">45 Minutes</p>
            </div>
          </div>

          <input className="w-4 accent-lightGreen" type="checkbox" />
        </div>
      </div>

      <Button
        type="submit"
        onClick={onClickDurationInfo}
        className="px-8 py-3 flex justify-end float-right bg-lightGreen hover:bg-green-700"
      >
        Proceed
      </Button>
    </div>
  );
};
export default Duration;
