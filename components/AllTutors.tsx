import React from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AllTutors = () => {
  return (
    <div className="md:w-[95%] overflow-hidden  w-[80%] mx-auto my-20 rounded-2xl shadow-md flex   bg-white h-full">
      {/* First flex section */}
      <div className="flex mx-auto flex-initial md:flex-initial   flex-col px-3">
        <Image
          src={"/tutors.jpg"}
          alt="tutor"
          width={100}
          height={100}
          className="md:w-[200px] xs:w-[200px] xs:h-[200px] w-full rounded-md md:ml-6 ml-2 mt-6 "
        />
        <div className="flex md:mx-5 flex-row justify-center  text-base md:p-3 py-3 px-1">
          <p className="md:mr-2 mr-1">25 Sessions</p>
          <p className="hidden md:block">|</p>
          <p className="md:ml-2 ml-1">8 Students</p>
        </div>
        <div className="md:flex hidden md:mx-5 p-2 text-base">
          <h3>Online </h3>
          <div className="w-[15px] h-[15px] mt-1 rounded-full ml-3 bg-lightGreen"></div>
        </div>
      </div>

      {/* Second flex section */}
      <div className="flex w-full  md:flex-1   mr-6   py-6 flex-col items-start">
        <h3 className="inline mx-auto md:mx-1 font-bold text-lg font-subtext">
          David Olushola <MdVerified className="inline text-lightGreen" />{" "}
        </h3>
        <p className="hidden md:block">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus...
        </p>
        <ul className="flex md:flex-row flex-col font-header mx-auto md:mx-1 justify-between my-2 font-bold text-sm items-center ">
          <li className="md:mr-4 mr-16 py-1">Speaks: English</li>
          <li className="md:mr-4 py-1">
            Teaches:{" "}
            <Image
              src={"/maths.png"}
              alt=""
              width={100}
              height={100}
              className="w-[20px] inline"
            />{" "}
            Mathematics
          </li>
          <li className="md:mr-4 mr-16 py-1">Grade: 10,11 & 12</li>
        </ul>
        <Link
          className="text-lightGreen mx-auto md:mx-1 font-header underline text-sm mb-6"
          href="/"
        >
          View Profile
        </Link>
        <div className="flex md:hidden md:mx-5 p-2 text-base">
          <h3>Online </h3>
          <div className="w-[15px] h-[15px] mt-1 rounded-full ml-3 bg-lightGreen"></div>
        </div>
        <div className="flex justify-between mt-10 md:items-start">
          <Button className=" bg-dimYellow bg-none rounded-lg hover:bg-gold  text-white text-sm mt-3 px-3 md:w-32 w-24 mr-2 py-2 text-start lg:block">
            1 on 1 sessions
          </Button>
          <Button className=" bg-dimYellow rounded-lg hover:bg-gold text-white text-sm mt-3 px-3 w-36 mr-2  py-2 text-start lg:block">
            Homework Support
          </Button>

          <Button className=" bg-dimYellow rounded-lg hover:bg-gold text-white text-sm mt-3 px-3 w-28 mr-2  py-2 text-center lg:block">
            Open to Jobs
          </Button>
          <Button className=" bg-dimYellow rounded-lg hover:bg-gold text-white text-sm mt-3 px-3 w-28 mr-2  py-2 text-center lg:block">
            Group sessions
          </Button>
        </div>
      </div>

      {/* Third flex section */}
      <div className="flex flex-1 md:p-6  md:px-8 items-end  flex-col">
        <h3 className=" md:block hidden text-lightGreen font-bold text-lg font-subtext">
          $10.00 - $25.00
        </h3>
        <p className="md:block hidden text-sm">Per Hour</p>

        <div className="flex md:flex-col   items-end md:mx-1  flex-row ">
          <Button
            asChild
            className=" bg-lightGreen rounded-lg hover:bg-green-500 text-white text-sm mt-6 px-3 w-32 mr-2  py-2 text-center lg:block"
          >
            <Link href="/register">Book a Lesson</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className=" bg-white rounded-lg border-lightGreen hover:bg-lightGreen text-lightGreen hover:text-white text-sm md:mt-3 mt-6 px-3 w-32 mr-2  md:py-2 text-center lg:block"
          >
            <Link href="/register">Contact</Link>
          </Button>
        </div>

        <div className="flex  items-end   pb-6 mt-10">
          <Link className="text-sm underline font-bold" href="/">
            Reviews
          </Link>
          <p> ⭐ 4.7/5</p>
        </div>
      </div>

     
    </div>
  );
};

export default AllTutors;
