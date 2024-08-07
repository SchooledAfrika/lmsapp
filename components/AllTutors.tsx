"use client";
import React from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BookSession from "@/app/(showNavbar)/find-tutors/book-session/page";
import { useQuery } from "@tanstack/react-query";

const AllTutors = () => {
  const fetchDetails = async () => {
    const response = await fetch("/api/one-on-one-section");
    console.log(response);
    const result = await response.json();
    return result;
  };

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["fetchDetails"],
    queryFn: fetchDetails,
  });

  console.log(data);

  if (isLoading) {
    return (
      <div>
        <p className="my-4 font-bold">Loading...</p>
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return <div className="flex-1">{error.message}</div>;
  }

  return (
    <div className="mx-3">
      {data && (
        <>
          {/* Desktop view */}
          <div className="hidden md:flex md:w-[95%] mx-auto my-20 rounded-2xl shadow-md bg-white h-full">
            {/* First flex section */}
            <div className="flex flex-col px-3">
              <Image
                src={"/tutors.jpg"}
                alt="tutor"
                width={150}
                height={150}
                className="w-full rounded-xl ml-6 mt-6"
              />
              <div className="flex justify-center text-[14px] p-3">
                <p className="mr-2">25 Sessions</p>
                <p>|</p>
                <p className="ml-2">8 Students</p>
              </div>
              <div className="hidden md:flex font-header text-[14px] font-semibold p-2">
                <h3>Online</h3>
                <div className="w-[10px] h-[10px] mt-1 rounded-full ml-3 bg-lightGreen"></div>
              </div>
            </div>

            {/* Second flex section */}
            <div className="flex flex-col w-full p-6">
              <h3 className="font-bold text-lg mb-3">
                David Olushola <MdVerified className="inline text-lightGreen" />
              </h3>
              <p className="hidden md:block">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus...
              </p>
              <ul className="flex flex-col md:flex-row justify-between my-2 text-[13px] font-bold items-center">
                <li className="md:mr-4 py-1">Speaks: English</li>
                <li className="md:mr-4 py-1">
                  Teaches:{" "}
                  <Image
                    src={"/maths.png"}
                    alt="Mathematics"
                    width={20}
                    height={20}
                    className="inline"
                  />{" "}
                  Mathematics
                </li>
                <li className="md:mr-4 py-1">Grade: 10, 11 & 12</li>
              </ul>
              <Link
                className="text-lightGreen font-semibold underline text-[13px] mb-2"
                href="/find-tutors/test"
              >
                View Profile
              </Link>
              <div className="flex flex-wrap my-3">
                <Button className="bg-dimYellow border border-red-400 rounded-lg hover:bg-gold text-black text-[13px] mt-3 px-3 mr-2 py-2">
                  1 on 1 sessions
                </Button>
                <Button className="bg-dimYellow border border-red-400 rounded-lg hover:bg-gold text-black text-[13px] mt-3 px-3 mr-2 py-2">
                  Homework Support
                </Button>
                <Button className="bg-dimYellow border border-red-400 rounded-lg hover:bg-gold text-black text-[13px] mt-3 px-3 mr-2 py-2">
                  Open to Jobs
                </Button>
                <Button className="bg-dimYellow border border-red-400 rounded-lg hover:bg-gold text-black text-[13px] mt-3 px-3 mr-2 py-2">
                  Group sessions
                </Button>
              </div>
            </div>

            {/* Third flex section */}
            <div className="flex flex-col items-end p-6">
              <h3 className="text-lightGreen font-bold text-lg">
                $10.00 - $25.00
              </h3>
              <p className="text-sm">Per Hour</p>
              <div className="flex flex-col items-end mt-3">
                <BookSession />
                <Button
                  asChild
                  variant="outline"
                  className="bg-white border-lightGreen hover:bg-lightGreen text-lightGreen hover:text-white text-sm mt-3 px-3 w-32 py-2"
                >
                  <Link href="/register">Contact</Link>
                </Button>
              </div>
              <div className="flex items-end mt-10">
                <Link className="text-sm underline font-bold" href="/">
                  Reviews
                </Link>
                <p> ⭐ 4.7/5</p>
              </div>
            </div>
          </div>

          {/* Mobile view */}
          <div className="md:hidden pr-3 pl-1 w-[80%] mx-3 sm:mx-auto py-6 my-12 grid grid-cols-1 gap-6">
            <div className="flex space-x-3">
              <Image
                src={"/tutors.jpg"}
                alt="tutor"
                width={100}
                height={100}
                className="w-[100px] h-[100px] rounded-xl"
              />
              <div className="flex flex-col">
                <h3 className="font-bold text-lg mb-2">
                  David Olushola{" "}
                  <MdVerified className="inline text-xl text-lightGreen" />
                </h3>
                <div className="flex text-[13px]">
                  <Link className="underline font-bold mr-2" href="/">
                    Reviews
                  </Link>
                  <p> ⭐ 4.7/5</p>
                </div>
                <div className="flex font-header text-[14px] font-semibold pt-2">
                  <h3>Online</h3>
                  <div className="w-[13px] h-[13px] mt-1 rounded-full ml-3 bg-lightGreen"></div>
                </div>
                <Link
                  className="text-lightGreen font-semibold underline text-[13px] mt-3 mb-2"
                  href="/find-tutors/test"
                >
                  View Profile
                </Link>
              </div>
            </div>
            <div className="flex space-x-3 text-[13.5px]">
              <p>
                <span className="font-semibold text-[14px]">Speaks:</span>{" "}
                English
              </p>
              <p>
                <span className="font-semibold text-[14px]">Grade(s):</span> 10,
                11, 12
              </p>
            </div>
            <p className="overflow-x-auto text-[13.5px]">
              <span className="font-semibold text-[14px]">Teaches:</span>{" "}
              Mathematics, English, Government
            </p>
            <h3 className="text-lightGreen font-bold text-lg">
              $10.00 - $25.00
            </h3>
            <div className="flex overflow-x-auto">
              <Button className="bg-dimYellow border border-red-400 rounded-lg hover:bg-gold text-black text-[13px] mt-3 px-2 mr-2 py-1">
                1 on 1 sessions
              </Button>
              <Button className="bg-dimYellow border border-red-400 rounded-lg hover:bg-gold text-black text-[13px] mt-3 px-3 mr-2 py-2">
                Homework Support
              </Button>
              <Button className="bg-dimYellow border border-red-400 rounded-lg hover:bg-gold text-black text-[13px] mt-3 px-3 mr-2 py-2">
                Open to Jobs
              </Button>
              <Button className="bg-dimYellow border border-red-400 rounded-lg hover:bg-gold text-black text-[13px] mt-3 px-3 mr-2 py-2">
                Group sessions
              </Button>
            </div>
            <div className="flex">
              <BookSession />
              <Button
                asChild
                variant="outline"
                className="bg-white border-lightGreen hover:bg-lightGreen text-lightGreen hover:text-white text-sm mt-3 px-3 w-28 mr-2 py-2"
              >
                <Link href="/register">Contact</Link>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AllTutors;
