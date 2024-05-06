import React from "react";
import { Button } from "./button";
import Link from "next/link";
import Image from "next/image";

const Settings = () => {
  return (
    <section className="flex flex-col md:flex-row mt-6 gap-4">
      <div className="flex-5 bg-[#FFFFFF] rounded-[5px] p-5">
        <hr className="my-4" />
        <form>
          <label className="font-bold text-[#9F9F9F]">
            Personal Information
          </label>
          <br />
          <div className="flex gap-[10px] pt-4">
            <input
              type="text"
              className="outline-none p-3 rounded-[5px]  border-2 w-[50%]"
              placeholder="Full Name"
            />
            <input
              type="text"
              className="outline-none p-3 rounded-[5px] border-2 w-[50%]"
              placeholder="Phone Number"
            />
          </div>
          <br />
          <input
            type="text"
            className="outline-none p-3 mb-4 rounded-[5px] border-2 w-full"
            placeholder="Email Address"
          />
          <hr className="my-4" />
          <label className="font-bold text-[#9F9F9F] my-4">
            Address Details
          </label>
          <input
            type="text"
            className="outline-none p-3 mb-4 rounded-[5px] border-2 w-full"
            placeholder="Permanent House Address"
          />
          <hr className="my-4" />
          <label className="font-bold text-[#9F9F9F]">School Details</label>
          <input
            type="text"
            className="outline-none p-3 mb-4 rounded-[5px] border-2 w-full"
            placeholder="School or Institute Name"
          />
          <input
            type="text"
            className="outline-none p-3 mb-4 rounded-[5px] border-2 w-full"
            placeholder="School or Institute Address"
          />
        </form>
        <div className="flex flex-col justify-center border-2 my-3 p-8 outline-none rounded-[8px] w-full bg-white">
          <Link href="/">
            <Image
              src="/imageIcon.png"
              alt="logo"
              width={60}
              height={60}
              className="mx-auto"
            />
          </Link>
          <input
            className="flex w-1/2 my-3 cursor-pointer mx-auto justify-center items-center"
            type="file"
          />
          <p className="py-4 text-center">School or Institute Cover</p>
          <p className="flex items-center justify-center gap-2 text-[12px]">
            <Image src="/svgs/error.svg" alt="error" width={15} height={15} />
            Note that the cover is visible as a banner to everyone.
          </p>
        </div>
        <hr className="my-4" />
      </div>
      <div className="flex-4 rounded-[5px]">
        <div className="flex items-center gap-4 h-[20%] bg-[#FFFFFF] px-6 rounded-[5px]">
          <Image
            src="/schoolpic.png"
            width={200}
            height={50}
            className="h-[20vh]"
            alt="School Image"
          />
          <div>
            <span className="font-bold flex items-center mb-4 gap-2 text-[14px]">
              <Image
                src="/svgs/schoollogo.svg"
                width={15}
                height={15}
                alt="School Logo"
              />
              Brilliant Stars College
            </span>
            <span className="flex items-center gap-2 text-[12px]">
              <Image
                src="/svgs/location.svg"
                width={15}
                height={15}
                alt="School Logo"
              />
              No 18, Westpoint Avenue, Mid-land, Birmingham, United Kingdom.
            </span>
          </div>
        </div>
        <div>
          <form className="h-[55%] bg-[#FFFFFF] rounded-[5px] p-4 my-4">
            <hr className="my-4" />
            <label className="font-bold text-[#9F9F9F] my-4">Security</label>
            <input
              type="password"
              className="outline-none p-3 my-4 rounded-[5px] border-2 w-full"
              placeholder="Current Password"
            />
            <input
              type="password"
              className="outline-none p-3 mb-4 rounded-[5px] border-2 w-full"
              placeholder="New Password"
            />
            <input
              type="password"
              className="outline-none p-3 mb-4 rounded-[5px] border-2 w-full"
              placeholder="Confirm Password"
            />
          </form>
          <Link href="/">
            <Button className="bg-secondary w-full text-white text-[16px] py-7 my-3">
              Save Changes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Settings;
