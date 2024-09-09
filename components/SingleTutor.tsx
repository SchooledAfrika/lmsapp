"use client";
import Image from "next/image";
import { useState } from "react";
import { MdVerified } from "react-icons/md";
import { FaShareAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar";
import { DialogButton } from "./Dialog";
import { ShareButton } from "./ShareButton";
import BookSession from "./BookSession";

const SingleTutor = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className="">
      <div className="flex md:mt-6 mb-12 mt-24 mx-6   justify-between ml-[0] md:mx-[80px]">
        <p className="font-bold text-lg">Details</p>
        <Link href="/find-tutors" className="cursor-pointer">
          <Image
            src="/closeAlt.svg"
            alt="cancel"
            width={100}
            height={100}
            className="w-[20px] h-[20px]"
          />
        </Link>
      </div>

      <div className="w-[90%] my-6 h-full overflow-hidden flex md:flex-row flex-col">
        <div className="flex  flex-col">
          <div className="bg-white w-[90%]   rounded-xl md:w-[300px] md:h-[400px] h-[300px] text-center sm:mx-16 mx-10 my-6 ">
            <Image
              src={"/tutors.jpg"}
              alt="tutor"
              width={100}
              height={100}
              className="mx-auto mt-3 py-3 w-[150px] h-[150px] rounded-lg"
            />
            <h3 className="inline   text-center font-bold text-base font-subtext">
              David Olushola <MdVerified className="inline text-lightGreen" />{" "}
            </h3>

            <div className="flex md:flex-col mx-10 justify-center   items-center md:mx-1  flex-row ">
              <BookSession />
              {/* <Button
                asChild
                className=" bg-lightGreen rounded-lg hover:bg-green-500 text-white text-sm px-3 w-28 mr-2 mt-3  py-2 text-center lg:block"
              >
                <Link href="/register">Book a Session</Link>
              </Button> */}

              {/* <DialogButton /> */}
            </div>
          </div>
          <div className="flex  my-6 items-start flex-col">
            <h3 className="inline md:hidden  mx-auto md:mx-1 font-bold text-lg font-subtext">
              About David Olushola
            </h3>
            <p className="flex md:hidden ml-10 sm:ml-16 justify-center items-center">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus
              mus...Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              Aenean commodo ligula eget dolor. Aenean massa. 
            </p>
            <p className="text-[14px] ml-10 sm:ml-16 md:hidden mt-2">
              Total Hours Taught Online:{" "}
              <span className="font-bold">2000hrs+</span>{" "}
            </p>

            <ul className="flex md:hidden sm:flex-row flex-col font-header mx-auto md:mx-1 justify-between my-2 font-bold text-sm items-center ">
              <li className="md:mr-4 py-1">
                Government
                <Image
                  src={"/govt.png"}
                  alt=""
                  width={100}
                  height={100}
                  className="w-[20px] mx-2 inline"
                />{" "}
              </li>
              <li className="md:mr-4 py-1">
                Literature
                <Image
                  src={"/lit.png"}
                  alt=""
                  width={100}
                  height={100}
                  className="w-[20px] mx-2 inline"
                />{" "}
              </li>

              <li className="md:mr-4 py-1">
                English
                <Image
                  src={"/english.png"}
                  alt=""
                  width={100}
                  height={100}
                  className="w-[20px] mx-2 inline"
                />{" "}
              </li>
            </ul>

            <div className="flex md:hidden sm:ml-24 mx-10  justify-between sm:my-8 mt-3 md:items-start">
              <p className="mr-2 sm:mr-6 sm:border-2 sm:bg-dimYellow rounded-xl sm:p-3 ">
                {" "}
                1 on 1 sessions
              </p>
              <p className="mr-2 sm:mr-6 sm:border-2 sm:bg-dimYellow rounded-xl sm:p-3 ">
                {" "}
                Homework Support
              </p>
              <p className="sm:border-2 sm:bg-dimYellow rounded-xl sm:p-3">
                {" "}
                Open to Jobs
              </p>
            </div>

            <div className="bg-white w-[90%] flex md:mx-16    rounded-xl md:w-[300px] md:h-[400px] h-[300px] text-center mx-10 my-3 ">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-xl "
              />
            </div>
          </div>
        </div>

        <div className="md:flex  my-6 items-start flex-col">
          <h3 className="md:inline hidden mx-auto md:mx-1 font-bold text-lg font-subtext">
            About David Olushola
          </h3>
          <p className="hidden w-[70%] md:block">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus
            mus...Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
            Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit mus..
          </p>
          <p className="text-[14px] hidden md:block mt-2">
            Total Hours Taught Online:{" "}
            <span className="font-bold">2000hrs+</span>{" "}
          </p>
          <ul className="md:flex hidden md:flex-row flex-col font-header mx-auto md:mx-1 justify-between my-2 font-bold text-sm items-center ">
            <li className="md:mr-4 py-1">
              Government
              <Image
                src={"/govt.png"}
                alt=""
                width={100}
                height={100}
                className="w-[20px] ml-2 inline"
              />{" "}
            </li>
            <li className="md:mr-4 py-1">
              Literature
              <Image
                src={"/lit.png"}
                alt=""
                width={100}
                height={100}
                className="w-[20px] ml-2 inline"
              />{" "}
            </li>

            <li className="md:mr-4 py-1">
              English
              <Image
                src={"/english.png"}
                alt=""
                width={100}
                height={100}
                className="w-[20px] ml-2 inline"
              />{" "}
            </li>
          </ul>

          <div className="md:flex hidden md:mx-1 mx-auto justify-between mt-3 md:items-start">
            <Button className="bg-dimYellow bg-none rounded-lg hover:bg-gold  text-white text-sm mt-3 px-3 md:w-32 w-36 mr-2 py-2 text-start lg:block">
              1 on 1 sessions
            </Button>
            <Button className=" bg-dimYellow rounded-lg hover:bg-gold text-white text-sm mt-3 px-3 w-36 mr-2  py-2 text-start lg:block">
              Homework Support
            </Button>

            <Button className=" bg-dimYellow rounded-lg hover:bg-gold text-white text-sm mt-3 px-3 w-28 mr-2  py-2 text-center lg:block">
              Open to Jobs
            </Button>
          </div>
          <div className="flex mt-3 mx-16 md:mx-1 pt-8   md:pb-6 ">
            <Link className=" mr-2 font-bold" href="/">
              Reviews
            </Link>

            <p className="text-sm"> ⭐ 4.7/5</p>

            {/* <Link className=" md:ml-[28rem] sm:ml-[20rem] ml-3 p-3 w-28 text-center items-center justify-center  rounded-xl text-black flex bg-white  font-bold" href="/">
          <FaShareAlt className="mr-2" /> Share
          </Link> */}
          </div>
          <div className="flex flex-col w-full mx-3 my-6 justify-between ">
            <div className="md:w-[800px] mx-auto w-[90%] my-5 bg-white md:h-[200px] h-full p-3 rounded-xl">
              <div className="flex md:flex-row flex-col justify-between">
                <p className="bg-dimYellow md:ml-5 ml-2 mt-5  font-header w-[50px] rounded-md text-center py-3 font-bold h-[50px]">
                  SA
                </p>
                <div className="md:flex-1">
                  <h3 className="mt-5 md:ml-5 ml-2 font-bold">
                    Samuel Adenike
                  </h3>
                  <p className="md:w-4/5 w-full mt-3 ml-2 md:ml-5">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                    natoque penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus...
                  </p>
                </div>
                <p className="text-sm mr-3 mt-2"> ⭐ 5</p>
              </div>
            </div>
            <div className="md:w-[800px] w-[90%] mx-auto my-5 bg-white md:h-[200px] h-full p-3  rounded-xl">
              <div className="flex md:flex-row flex-col justify-between">
                <p className="bg-dimYellow md:ml-5 ml-2 mt-5 font-header w-[50px] rounded-md text-center py-3 font-bold h-[50px]">
                  AR
                </p>
                <div className="flex-1">
                  <h3 className="mt-5 md:ml-5 ml-2 font-bold">
                    Amanda Richards
                  </h3>
                  <p className="md:w-4/5 w-full mt-3 md:ml-5 ml-2">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                    natoque penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus...
                  </p>
                </div>
                <p className="text-sm mr-3 mt-2"> ⭐ 4.6</p>
              </div>
            </div>
            <div className="md:w-[800px] p-3 w-[90%] mx-auto my-5 bg-white md:h-[200px] h-full  rounded-xl">
              <div className="flex md:flex-row flex-col justify-between">
                <p className="bg-dimYellow md:ml-5 ml-2 mt-5 font-header w-[50px] rounded-md text-center py-3 font-bold h-[50px]">
                  UD
                </p>
                <div className="flex-1">
                  <h3 className="mt-5 md:ml-5 ml-2 font-bold">Utiga Daniel</h3>
                  <p className="md:w-4/5 w-full mt-3 md:ml-5 ml-2">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                    natoque penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus...
                  </p>
                </div>
                <p className="text-sm mr-3 mt-2"> ⭐ 5</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTutor;
