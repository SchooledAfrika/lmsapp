"use client";
import ChartDialog from "@/components/ChartDialog";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { TiArrowSortedDown } from "react-icons/ti";
import { useSession } from "next-auth/react";

const Recents = () => {
  const { data } = useSession();

  return (
    <div className="my-6 flex  md:flex-row justify-between flex-col  text-[15px] gap-3   md:gap-3 rounded-md">
      <div className="flex md:flex-4 h-full    px-3 bg-white rounded-md py-6  flex-col">
        <div className="flex pl-4 py-2 justify-between">
          <p className="text-[14px] text-slate-500 font-semibold">
            Overall Perfomance
          </p>
          <div className="flex text-[13px] text-lightGreen font-subtext justify-end">
            <p className="inline justify-end ">
              Monthly
              <TiArrowSortedDown className="inline text-xl text-lightGreen" />
            </p>
          </div>
        </div>
        <ChartDialog userId={data?.user.id as string} />
      </div>

      <div className="flex flex-3 bg-white md:mb-0 mb-6 py-6 px-3  rounded-md overflow-hidden">
        <div className="">
          <h3 className="text-slate-400 text-[14px] font-bold">
            Recently Added
          </h3>
          <div className="flex space-x-2 mt-4">
            <Image
              src="/green-book.png"
              alt=""
              width={100}
              height={100}
              className="w-[30px] h-[30px]"
            />
            <div className="flex flex-col">
              <p className="font-bold">How Europe Underdeveloped Africa</p>
              <p className="text-[13px] pt-2">Walter Rodney</p>
              <p className="text-rose-500 text-[14px] pt-2">Grade 12</p>
              <p className="font-bold pt-2 inline">
                Government
                <Image
                  src="/govt.png"
                  alt=""
                  width={100}
                  height={100}
                  className="w-[30px] h-[30px] inline-block"
                />{" "}
              </p>
            </div>
          </div>
          <hr className="my-3" />
          <div className="mt-2 flex items-center md:space-x-6 py-3 space-x-4">
            <div className="flex flex-col space-y-3 ">
              <p className="text-slate-500 font-semibold text-[13px]">Tutor</p>
              <div className="flex space-x-2 items-center">
                <Image
                  src="/tutors.jpg"
                  alt=""
                  width={100}
                  height={100}
                  className="w-[40px] h-[40px] rounded-md"
                />
                <h3 className="inline  font-bold text-[12px]">
                  David Olushola{" "}
                  <MdVerified className="inline text-lightGreen text-[15px]  md:mr-8" />{" "}
                </h3>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-slate-500 text-[13px] font-semibold">Time</p>
              <div className="flex space-x-2">
                <p className="text-[12px] font-semibold">2:30PM</p>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-slate-500 text-[13px] font-semibold">Date</p>
              <div className="flex space-x-2">
                <p className="text-[12px] font-semibold">July 15, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recents;
