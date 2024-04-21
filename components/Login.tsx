import React from "react";
import clsx from "clsx";
import logo from "@/images/logo.png";
import Image from "next/image";
import Google from "@/images/svgs/google.svg";
import Apple from "@/images/svgs/apple.svg";
import Footer from "./Footer";
import Link from "next/link";
import Close from "@/images/svgs/close.svg";
import { Button } from "./ui/button";

const Login: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-center px-[1rem] md:px-[10rem] py-[1rem] md:py-[5rem] w-full">
        <div className="sm:w-full md:w-[45%]">
          <Link href="/">
            <Image
              src={logo}
              alt="logo"
              className={clsx(
                "w-[100px] h-[100px] md:w-[180px] md:h-[180px] font-bold duration-300"
              )}
            />
          </Link>
          <span className="font-bold text-[22px]">
            Welcome to Schooled Afrika !
          </span>
          <p className="text-gray-500 py-6 text-[14px]">
            Welcome to our Lorem ipsum dolor sit amet, consectetuer adipiscing
            elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
            natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus...Lorem ipsum dolor sit amet, consectetuer adipiscing
            elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis...
          </p>
          <span className="text-gray-500 text-[12px]">
            New User?
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
              <Image src={Close} alt="close" />
            </Link>
          </div>
          <form>
            <label className="font-bold">Provide Details</label>
            <br />
            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              className="my-3 p-4 bg-white outline-none rounded-[8px] w-full bg-white"
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="mb-3 p-4 bg-white outline-none rounded-[8px] w-full bg-white"
            />
            <Button className="bg-secondary w-full text-white text-[16px] px-6 py-7 my-3">
              Login
            </Button>
          </form>
          <div className="flex flex-col justify-center">
            <Button className="flex items-center bg-white text-black w-full text-[16px] px-6 py-7 my-3">
              Sign in with Google{" "}
              <Image src={Google} alt="Google" className="pl-2" />
            </Button>
            <Button className="flex items-center bg-white text-black w-full text-[16px] px-6 py-7">
              Sign in with Apple ID{" "}
              <Image src={Apple} alt="Apple" className="pl-2" />
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
