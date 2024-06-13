import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { BsPlusSquare } from "react-icons/bs";
import { FaPlusSquare } from "react-icons/fa";


const Card = () => {
  return (
    <div className="w-full bg-stone-100">
      {/* Card section */}
      <div className="md:flex md:flex-row  gap grid grid-cols-1 justify-between  items-center gap-3">
        
        

        {/* First card */}
        <div className="flex flex-1   text-sm  p-3  justify-between space-x-2  bg-white rounded-md">
          <div className="flex flex-col  justify-evenly">
            <h3 className="font-bold text-xl pb-3">2</h3>

            <p className="font-semibold pb-2 ">Total Sessions</p>
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
            <h3 className="font-bold text-xl pb-3">2</h3>

            <p className="font-semibold pb-2 ">Total Teachers</p>
            <p className="inline text-[10.5px] font-medium">
              <span className="text-lightGreen">50%</span> more than last month
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

        {/* third card */}
        <div className="flex flex-1  text-sm  p-3  justify-between space-x-2  bg-white rounded-md">
          <div className="flex flex-col  justify-evenly">
            <h3 className="font-bold text-xl pb-3">4</h3>

            <p className="font-semibold pb-2 ">Total Assessments</p>
            <p className="inline text-[10.5px] font-medium">
              <span className="text-lightGreen">50%</span> more than last month
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
        {/* fourth card */}
        <div className="flex flex-1  text-sm  p-3  justify-between space-x-2  bg-white rounded-md">
          <div className="flex flex-col  justify-evenly">
            <h3 className="font-bold text-xl pb-3">86%</h3>

            <p className="font-semibold pb-2 ">Overall Performance</p>
            <p className="inline text-[10px] font-medium">
              <span className="text-lightGreen ">70%</span> more than last month
            </p>
          </div>

          <Image
            src="/clipboard.png"
            alt="card-img"
            width={50}
            height={50}
            className="w-[30px] h-[30px] justify-end mt-5 items-center"
          />
        </div>
        {/* Go Live */}
        <div className="flex flex-col py-4 px-2 space-y-3 bg-white  ">
         <Link href="/" className="text-center  mx-auto"><BsPlusSquare className="w-[40px] h-[40px] bg-lightGreen text-white border border-white" /></Link>
          <p className="text-[12.5px] text-center  font-semibold">Add Another Ward</p>

        </div>
      </div>
    </div>
  );
};

export default Card;
