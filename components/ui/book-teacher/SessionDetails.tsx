import Image from "next/image";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { BsClipboard2PlusFill } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SessionProps {
  onClickSessionInfo: () => void;
}

const SessionDetails: React.FC<SessionProps> = ({ onClickSessionInfo }) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prevCount) => (prevCount += 1));
  };

  const decrement = () => {
    setCount((prevCount) => (prevCount -= 1));
  };
  return (
    <ScrollArea className="h-[500px] w-full ">
      <div className="">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold">Book Session</h3>
          <h3 className="text-base font-medium">Back</h3>
        </div>

        <div className="flex  mx-auto mt-6 mb-8 max-w-[360px] flex-col gap-3">
          <p className="text-lightGreen text-[15px] ml-8 font-semibold">
            Session Details
          </p>
          <p className="text-[14px] ml-8 font-semibold">
            You can perform as may sessions as per <br />
            your convenience.
          </p>
          <div className="border ml-8  justify-between px-3 flex py-4  rounded-md ">
            <div className="flex space-x-4">
              <BsClipboard2PlusFill className="text-2xl" />
              <div className="flex space-y-2 flex-col">
                <p className="text-[13px]">Session Type</p>
                <p className="font-semibold">1 on 1 Session</p>
              </div>
            </div>

            <input className="w-4 accent-lightGreen" type="checkbox" />
          </div>
          <div className="border ml-8  justify-between px-3 flex py-4  rounded-md ">
            <div className="flex space-x-4">
              <BsClipboard2PlusFill className="text-2xl" />

              <div className="flex space-y-2 flex-col">
                <p className="text-[13px]">Session Type</p>
                <p className="font-semibold">Homework Support</p>
              </div>
            </div>

            <input className="w-4 accent-lightGreen" type="checkbox" />
          </div>
          <div className="border ml-8  justify-between px-3 flex py-4  rounded-md ">
            <FaMinus onClick={decrement} className="text-2xl" />

            <div className="flex  space-y-2 flex-col">
              <p className="text-[13px]">Number of Sessions</p>
              <p className="font-semibold mx-auto">{count}</p>
            </div>

            <FaPlus onClick={increment} className="text-xl" />
          </div>{" "}
          <p className="text-center font-semibold text-2xl text-lightGreen">
            $10.00
          </p>
        </div>

        <Button
          type="submit"
          onClick={onClickSessionInfo}
          className="px-8 py-3 mb-8 flex justify-end float-right bg-lightGreen hover:bg-green-700"
        >
          Proceed
        </Button>
      </div>
    </ScrollArea>
  );
};

export default SessionDetails;
