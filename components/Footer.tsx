import React from "react";
import Link from "next/link";
import Container from "./Container";
import Image from "next/image";
import Instagram from "@/images/svgs/instagram.svg";
import Twitter from "@/images/svgs/twitter.svg";
import Facebook from "@/images/svgs/facebook.svg";
import Tiktok from "@/images/svgs/tiktok.svg";
import Logo from "@/images/logo.png";
import { FaEnvelope, FaMessage } from "react-icons/fa6";

const NewsletterForm = () => {
  return (
    <form className="max-w-sm mt-6">
      <h2 className=" text-[15.5px] font-semibold tracking-wider ">
        Would you like to read from us?
      </h2>
      <p className="mt-4 text-medium text-[14px]">
        Get our newsletter and get Educational tips for your Child. Enter Email
        .
      </p>
      <div className="relative mt-6">
        <input
          type="email"
          placeholder="Email address"
          autoComplete="email"
          aria-label="Email address"
          className="block w-full rounded-2xl border border-gray-400 bg-transparent py-4 pl-6 pr-20 text-base/6 text-black ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-400 "
        />
        <div className="absolute inset-y-1 right-1 flex justify-end">
          <button
            type="submit"
            aria-label="Submit"
            className="flex aspect-square rounded-full h-full items-center justify-center bg-dimOrange text-white transition hover:bg-neutral-200"
          >
            <FaEnvelope className="w-6" />
          </button>
        </div>
      </div>
    </form>
  );
};

const Footer: React.FC = () => {
  return (
    <Container className="py-4 font-header">
      <div className="md:block hidden">
        <nav>
          <div className="flex flex-col sm:flex-row font-header font-semibold items-center justify-between px-[20px]">
            <div>
              <Image src={Logo} alt="logo" className="w-[100px]  mb-4 " />
            </div>
            <div className=" flex gap-[20px]  xl:gap-[50px] text-[14px] space-x-6 md:justify-center   items-center select-none">
              <Link href="/find-tutors">Find Tutors</Link>
              <Link href="/classes">Classes</Link>
              <Link href="/apply-to-teach">Apply to teach </Link>
              <Link href="/courses">Courses </Link>
              <Link href="/vacancies">Vacancies </Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </nav>
        <div className="block md:flex items-center justify-between px-[20px]">
          <div className="w-full md:w-[35%]">
            <span className="font-bold">About Schooled Afrika</span>
            <p className="pt-2 text-[13px]">
              At Schooled Afrika, we are committed to revolutionizing education
              by providing accessible and convenient online learning solutions.
              Our platform offers a range of features designed to support
              parents, teachers, and online schools in enhancing the learning
              experience for students of all ages.
            </p>
          </div>
          <div className="flex flex-row md:mt-0 mt-6">
            <Link href="/">
              <Image
                src="/svgs/instagram.svg"
                alt="icon"
                width={30}
                height={30}
                className="w-[28px] mr-6"
              />
            </Link>
            <Link href="/">
              <Image
                src="/svgs/twitter.svg"
                alt="icon"
                width={30}
                height={30}
                className="w-[28px] mr-6"
              />
            </Link>
            <Link href="/">
              <Image
                src="/svgs/facebook.svg"
                alt="icon"
                width={30}
                height={30}
                className="w-[28px] mr-6"
              />
            </Link>
            <Link href="/">
              <Image
                src="/svgs/tiktok.svg"
                alt="icon"
                width={30}
                height={30}
                className="w-[28px] mr-1 "
              />
            </Link>
          </div>
        </div>
        <hr className="border-gray-400 mx-[20px]  mt-[10px] md:mt-[50px] mb-[22px]" />
        <div className="block md:flex items-center justify-between gap-10 px-[20px]  text-[14px]">
          <span>
            Copyright © {new Date().getFullYear()}. Schooled Afrika. All Rights
            Reserved.
          </span>
          <div className="block md:flex gap-5">
            <Link href="/privacy-policy">
              <p>Privacy Policy</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile screen */}

      <div
        className={`flex md:hidden  items-center sm:py-16 py-6 px-4 flex-col`}
      >
        <div
          className={`flex justify-center items-start md:flex-row flex-col mb-8 w-full`}
        >
          <div className="w-full ">
            <div>
              <Image src={Logo} alt="logo" className="w-[100px]  mb-4 " />
            </div>
            <span className="font-bold">About Schooled Afrika</span>
            <p className="pt-2 text-[15px]">
              At Schooled Afrika, we are committed to revolutionizing education
              by providing accessible and convenient online learning solutions.
              Our platform offers a range of features designed to support
              parents, teachers, and online schools in enhancing the learning
              experience for students of all ages.
            </p>
          </div>

          <div className="flex-[1.5] md:hidden w-full flex flex-row justify-between md:mt-0 mb-8 mt-10">
            <div className="flex flex-col   my-4 min-w-[150px]">
              <Link
                href="/find-tutors"
                className="leading-[28px] font-medium"
              >
                Find Tutors
              </Link>
              <Link href="/classes" className="leading-[28px] font-medium">
                Classes
              </Link>
              <Link
                href="/apply-to-teach"
                className="leading-[28px] font-medium"
              >
                Apply to teach{" "}
              </Link>
              <Link
                href="/courses"
                className="leading-[28px] font-medium"
              >
                Courses{" "}
              </Link>
            </div>

            <div className="flex flex-col  my-4 min-w-[150px]">
              <Link href="/vacancies" className="leading-[28px] font-medium">
                Vacancies{" "}
              </Link>
              <Link href="/contact" className="leading-[28px] font-medium">
                Contact
              </Link>
              <Link href="/privacy-policy">
                <p className="leading-[28px] font-medium">Privacy Policy</p>
              </Link>
            </div>
          </div>
          <div className="flex flex-row justify-between mt-6">
            <Link href="/">
              <Image
                src="/svgs/instagram.svg"
                alt="icon"
                width={30}
                height={30}
                className="w-[28px] mr-6"
              />
            </Link>
            <Link href="/">
              <Image
                src="/svgs/twitter.svg"
                alt="icon"
                width={30}
                height={30}
                className="w-[28px] mr-6"
              />
            </Link>
            <Link href="/">
              <Image
                src="/svgs/facebook.svg"
                alt="icon"
                width={30}
                height={30}
                className="w-[28px] mr-6"
              />
            </Link>
            <Link href="/">
              <Image
                src="/svgs/tiktok.svg"
                alt="icon"
                width={30}
                height={30}
                className="w-[28px] mr-1 "
              />
            </Link>
          </div>
          <div className="flex text-black lg:justify-end ml-0 sm:ml-3">
            <NewsletterForm />
          </div>
        </div>

        <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
          <p className=" font-normal text-center text-[14px] leading-[27px] text-black">
            Copyright Ⓒ {new Date().getFullYear()}. Schooled Afrika. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
