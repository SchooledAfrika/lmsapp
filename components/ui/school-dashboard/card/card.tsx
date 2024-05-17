import React from "react";
import Image from "next/image";
import { FaSchoolFlag } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";

const Card = () => {
  return (
    <div className="w-full bg-stone-100">
      {/* Card section */}
      <div className="md:flex md:flex-row  gap grid grid-cols-1 justify-evenly  items-center gap-3">
        {/* First card */}
        <div className="flex md:flex-3 flex-2  py-[28.5px] px-2 space-x-2  bg-white rounded-md">
          <Image
            src="/card-img.jpg"
            alt="card-img"
            width={100}
            height={100}
            className="w-[80px] rounded-md"
          />
          <div className="flex flex-col justify-evenly">
            <div className="text-sm pb-3 font-bold">
              <p className="inline pb-3">
                <FaSchoolFlag className="inline mr-2 text-lightGreen" />{" "}
                Brilliant Stars College
              </p>
            </div>
            <div className="text-[11px]">
              <p className="inline ">
                <FaLocationDot className="inline-flex mr-1 text-lightGreen" />
                No 18, Westpoint Avenue, Mid-land,
              </p>
              <p className="ml-5"> Birmingham, United Kingdom.</p>
            </div>
          </div>
        </div>

        {/* Second card */}
        <div className="flex flex-2  text-sm  p-3  justify-between space-x-2  bg-white rounded-md">
          <div className="flex flex-col  justify-evenly">
            <h3 className="font-bold text-lg pb-3">3</h3>

            <p className="font-semibold pb-2 ">Total Classes</p>
            <p className="inline text-[13px]">
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
        {/* Third card */}
        <div className="flex flex-2 text-sm  p-3  justify-between space-x-2  bg-white rounded-md">
          <div className="flex flex-col  justify-evenly">
            <h3 className="font-bold text-lg pb-3">2</h3>

            <p className="font-semibold pb-2 ">Total Teachers</p>
            <p className="inline text-[13px]">
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
        {/* Fourth card */}
        <div className="flex flex-2 text-sm  p-3  justify-between space-x-2  bg-white rounded-md">
          <div className="flex flex-col  justify-evenly">
            <h3 className="font-bold text-lg pb-3">24</h3>

            <p className="font-semibold pb-2 ">Total Students</p>
            <p className="inline text-[13px]">
              <span className="text-red-500">15%</span> less than last month
            </p>
          </div>

          <Image
            src="/student.png"
            alt="card-img"
            width={50}
            height={50}
            className="w-[30px] h-[30px] justify-end mt-5 items-center"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
