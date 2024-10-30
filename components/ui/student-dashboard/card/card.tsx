import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsBroadcast } from "react-icons/bs";

const Card = () => {
  return (
    <div className="w-full bg-stone-100">
      {/* Card section */}
      <div className="md:flex md:flex-row  gap grid grid-cols-1 justify-between  items-center gap-3">
        {/* First card */}
        <div className="flex flex-1   text-sm  p-3  justify-between space-x-2  bg-white rounded-md">
          <div className="flex flex-col  justify-evenly">
            <h3 className="font-bold text-lg pb-3">3</h3>

            <p className="font-semibold pb-2 ">Total Classes</p>
            <p className="inline text-[10.5px] font-medium">
              <span className="text-lightGreen">50%</span> more than last month
            </p>
          </div>

          <Image
            src="/book.png"
            alt="card-img"
            width={50}
            height={50}
            className="w-[30px] h-[30px] justify-end mt-5 items-center"
          />
        </div>
        {/* second card */}
        <div className="flex flex-1  text-sm  p-3  justify-between space-x-2  bg-white rounded-md">
          <div className="flex flex-col  justify-evenly">
            <h3 className="font-bold text-lg pb-3">9</h3>

            <p className="font-semibold pb-2 ">1 on 1 Sessions</p>
            <p className="inline text-[10.5px] font-medium">
              <span className="text-red-500">15%</span> less than last month
            </p>
          </div>

          <Image
            src="/private.png"
            alt="card-img"
            width={50}
            height={50}
            className="w-[30px] h-[30px] justify-end mt-5 items-center"
          />
        </div>

        {/* third card */}
        <div className="flex flex-1  text-sm  p-3  justify-between space-x-2  bg-white rounded-md">
          <div className="flex flex-col  justify-evenly">
            <h3 className="font-bold text-lg pb-3">1</h3>

            <p className="font-semibold pb-2 ">Total Teachers</p>
            <p className="inline text-[10px] font-medium">
              <span className="text-lightGreen">100%</span> more than last month
            </p>
          </div>

          <Image
            src="/teach.png"
            alt="card-img"
            width={50}
            height={50}
            className="w-[30px] h-[30px] justify-end mt-5 items-center"
          />
        </div>
        {/* fourth card */}
        <div className="flex flex-1  text-sm  p-3  justify-between space-x-2  bg-white rounded-md">
          <div className="flex flex-col  justify-evenly">
            <h3 className="font-bold text-lg pb-3">11</h3>

            <p className="font-semibold pb-2 ">Test & Resources</p>
            <p className="inline text-[10px] font-medium">
              <span className="text-red-500 ">15%</span> less than last month
            </p>
          </div>

          <Image
            src="/resources.png"
            alt="card-img"
            width={50}
            height={50}
            className="w-[30px] h-[30px] justify-end mt-5 items-center"
          />
        </div>
        {/* Go Live */}
        <div className="flex flex-col space-y-3 flex-1 ">
          <Button
            asChild
            className=" bg-dimOrange hover:bg-dimYellow rounded-md text-white text-[14px] mt-3  ml-3 md:w-32 w-full mx-auto   py-2 text-center lg:block"
          >
            <Link href="/" className="inline">
              <BsBroadcast className="inline mr-1" />
              Join Session
            </Link>
          </Button>
          <p className="text-[12.5px] text-center  font-normal">
            Join a live session now!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
