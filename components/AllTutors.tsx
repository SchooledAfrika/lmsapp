import React from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BookSession from "@/app/(showNavbar)/find-tutors/book-session/page";

const AllTutors = () => {
  return (
    <div className=" mx-3">
      <div className="hidden md:w-[95%] mx-auto my-20 rounded-2xl shadow-md md:flex  bg-white h-full">
        {/* First flex section */}
        <div className="flex mx-auto flex-initial md:flex-initial   flex-col px-3">
          <Image
            src={"/tutors.jpg"}
            alt="tutor"
            width={100}
            height={100}
            className="md:w-[150px] md:h-[150px] xs:w-[200px] xs:h-[200px] w-full rounded-xl md:ml-6 ml-2 mt-6 "
          />
          <div className="flex md:mx-3 flex-row justify-center  text-[14px] md:p-3 py-3 px-1">
            <p className="md:mr-2 mr-1">25 Sessions</p>
            <p className="hidden md:block">|</p>
            <p className="md:ml-2 ml-1">8 Students</p>
          </div>
          <div className="md:flex  hidden font-header text-[14px] font-semibold md:mx-5 p-2 ">
            <h3>Online </h3>
            <div className="w-[10px] h-[10px] mt-1 rounded-full ml-3 bg-lightGreen"></div>
          </div>
        </div>

        {/* Second flex section */}
        <div className="flex w-full  md:flex-1  md:mr-6   pt-6 pb-4 flex-col items-start">
          <h3 className="inline mx-auto md:mx-1 mb-3 font-bold text-lg font-subtext">
            David Olushola <MdVerified className="inline text-lightGreen" />{" "}
          </h3>
          <p className="hidden md:block">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus...
          </p>
          <ul className="flex md:flex-row flex-col font-header mx-auto md:mx-1 justify-between my-2 font-bold text-[13px] items-center ">
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
            className="text-lightGreen mx-auto  font-semibold md:mx-1 font-header underline text-[13px] mb-2"
            href="/find-tutors/test"
          >
            View Profile
          </Link>
          <div className="flex md:hidden md:mx-5 p-2 text-base">
            <h3>Online </h3>
            <div className="w-[15px] h-[15px] mt-1 rounded-full ml-3 bg-lightGreen"></div>
          </div>
          <div className="flex justify-between my-3 md:items-start">
            <Button className=" bg-dimYellow bg-none rounded-lg border border-red-400 hover:bg-gold  text-black text-[13px] mt-3 px-3  mr-2 py-2 text-start lg:block">
              1 on 1 sessions
            </Button>
            <Button className=" bg-dimYellow border border-red-400 rounded-lg hover:bg-gold text-black text-[13px] mt-3 px-3  mr-2  py-2 text-start lg:block">
              Homework Support
            </Button>

            <Button className=" bg-dimYellow rounded-lg hover:bg-gold text-black border border-red-400 text-[13px] mt-3 px-3  mr-2  py-2 text-center lg:block">
              Open to Jobs
            </Button>
            <Button className=" bg-dimYellow rounded-lg border border-red-400 hover:bg-gold text-[13px] text-black mt-3 px-3    py-2 text-center lg:block">
              Group sessions
            </Button>
          </div>
        </div>

        {/* Third flex section */}
        <div className="flex flex-1 md:p-6  md:px-8 items-end mr-4  flex-col">
          <h3 className=" md:block hidden text-lightGreen font-bold text-lg font-subtext">
            $10.00 - $25.00
          </h3>
          <p className="md:block hidden md:mr-8 text-sm">Per Hour</p>

          <div className="flex md:flex-col   items-end md:mx-1  flex-row ">
            <BookSession />

            <Button
              asChild
              variant="outline"
              className=" bg-white rounded-lg border-lightGreen hover:bg-lightGreen text-lightGreen hover:text-white text-sm md:mt-3 mt-6 px-3 w-32 mr-2  md:py-2 text-center lg:block"
            >
              <Link href="/register">Contact</Link>
            </Button>
          </div>

          <div className="flex  items-end mr-4   pb-6 mt-10">
            <Link className="text-sm underline font-bold" href="/">
              Reviews
            </Link>
            <p> ⭐ 4.7/5</p>
          </div>
        </div>
      </div>

      {/* Mobile screen */}
      <div className="md:hidden pr-3 pl-1 w-[80%] mx-3 sm:mx-auto py-6 my-12 grid grid-cols-1 gap-6 ">
        <div className="flex sm:space-x-12 space-x-3 ">
          <Image
            src={"/tutors.jpg"}
            alt="tutor"
            width={100}
            height={100}
            className="w-[100px] h-[100px] rounded-xl "
          />
          <div className="flex flex-col">
            <h3 className="inline mb-2 font-bold font-subtext">
              David Olushola{" "}
              <MdVerified className="inline text-xl text-lightGreen" />
            </h3>

            <div className="flex text-[13px]">
              <Link className=" underline font-bold mr-2" href="/">
                Reviews
              </Link>
              <p> ⭐ 4.7/5</p>
            </div>
            <div className="flex font-header text-[14px] font-semibold pt-2 ">
              <h3>Online </h3>
              <div className="w-[13px] h-[13px] mt-1 rounded-full ml-3 bg-lightGreen"></div>
            </div>
            <Link
              className="text-lightGreen   font-semibold  font-header underline text-[13px] mt-3 mb-2"
              href="/find-tutors/test"
            >
              View Profile
            </Link>
          </div>
        </div>
        <div className="flex space-x-3 text-[13.5px]">
          <p>
            {" "}
            <span className="font-semibold text-[14px]">Speaks:</span> English
          </p>

          <p>
            <span className="font-semibold text-[14px]">Grade(s):</span>{" "}
            10,11,12
          </p>
        </div>
        <p className="overflow-x-auto text-[13.5px]">
          <span className="font-semibold text-[14px]">Teaches:</span>{" "}
          Mathematics, English, Government
        </p>
        <h3 className=" text-lightGreen font-bold text-lg font-subtext">
          $10.00 - $25.00
        </h3>

        <div className="flex overflow-x-auto">
          <Button className=" bg-dimYellow bg-none rounded-lg border border-red-400 hover:bg-gold  text-black text-[13px] mt-3 px-2  mr-2 py-1 text-start lg:block">
            1 on 1 sessions
          </Button>
          <Button className=" bg-dimYellow border border-red-400 rounded-lg hover:bg-gold text-black text-[13px] mt-3 px-3  mr-2  py-2 text-start lg:block">
            Homework Support
          </Button>

          <Button className=" bg-dimYellow rounded-lg hover:bg-gold text-black border border-red-400 text-[13px] mt-3 px-3  mr-2  py-2 text-center lg:block">
            Open to Jobs
          </Button>
          <Button className=" bg-dimYellow rounded-lg border border-red-400 hover:bg-gold text-[13px] text-black mt-3 px-3    py-2 text-center lg:block">
            Group sessions
          </Button>
        </div>
        <div className=" flex-row ">
          <BookSession />

          <Button
            asChild
            variant="outline"
            className=" bg-white rounded-lg border-lightGreen hover:bg-lightGreen text-lightGreen hover:text-white text-sm md:mt-3 mt-6 px-3 w-32 mr-2  md:py-2 text-center lg:block"
          >
            <Link href="/register">Contact</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AllTutors;
