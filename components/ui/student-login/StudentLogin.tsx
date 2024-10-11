"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../button";
import { Eye, EyeOff } from "lucide-react";
import Footer from "@/components/Footer";

const StudentLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="w-full font-subtext">
      <div className="flex flex-col md:flex-row justify-between items-center px-[1rem] md:px-[10rem] py-[1rem] md:pt-[2rem] md:pb-[5rem] w-full">
        <div className="sm:w-full md:w-[45%]">
          <Link href="/">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={100}
              height={100}
              className="w-[100px] mb-4 "
            />
          </Link>
          <span className="font-bold text-[22px]">
            Welcome to Schooled Afrika !
          </span>
          <p className="text-gray-500 py-6 text-[14px]">
          SchooledAfrika is a dynamic and innovative educational platform
            dedicated to nurturing young minds and fostering a love for
            learning.
          </p>
          <span className="text-gray-500 text-[12px]">
            Have an account ?
            <Link href="/register">
              <span className="font-bold text-black underline pl-2 text-[14px]">
                Register
              </span>
            </Link>
          </span>
        </div>

        <div className="sm:w-full md:w-[45%]">
          <div className="flex justify-end mb-[50px]">
            <Link href="/">
              <Image
                src="/svgs/close.svg"
                alt="close"
                width={100}
                height={100}
                className="w-[15px]"
              />
            </Link>
          </div>
          <form>
            <label className="font-bold">Provide Details</label>
            <br />
            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              className="my-3 p-4  outline-none rounded-[8px] w-full bg-white"
            />
            <br />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                className="mb-3 p-4  outline-none rounded-[8px] w-full bg-white"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-6 right-4 border-none bg-transparent cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="text-lightGreen" />
                ) : (
                  <Eye className="text-lightGreen" />
                )}
              </button>
            </div>
            <Link href="/student-account/details">
              <Button className="bg-secondary w-full text-white text-[16px] px-6 py-7 my-3">
                Register
              </Button>
            </Link>
          </form>
          <div className="flex flex-col justify-center">
            <Button className="flex items-center bg-white hover:bg-lightGreen text-black w-full text-[16px] px-6 py-7 my-3">
              Sign in with Google{" "}
              <Image
                src="/svgs/google.svg"
                alt="Google"
                width={30}
                height={30}
                className="pl-2"
              />
            </Button>
            <Button className="flex items-center bg-white hover:bg-lightGreen text-black w-full text-[16px] px-6 py-7">
              Sign in with Apple ID{" "}
              <Image
                src="/svgs/apple.svg"
                alt="Apple"
                width={30}
                height={30}
                className="pl-2"
              />
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudentLogin;
