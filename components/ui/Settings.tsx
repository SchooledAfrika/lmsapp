import React from "react";
import { Button } from "./button";
import Link from "next/link";
import Image from "next/image";

const Settings = () => {
  return (
    <section className="flex flex-col md:flex-row mt-6 gap-4">
      <div className="flex-5 bg-[#FFFFFF] rounded-[5px] p-5 h-[100vh] overflow-y-scroll scrollbar-hide">
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
            className="outline-none p-3 my-4 rounded-[5px] border-2 w-full"
            placeholder="Permanent House Address"
          />
          <hr className="my-4" />
          <label className="font-bold text-[#9F9F9F]">School Details</label>
          <input
            type="text"
            className="outline-none p-3 my-4 rounded-[5px] border-2 w-full"
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
        <div className="flex flex-col justify-center outline-none rounded-[8px] w-full">
          <p className="font-bold text-[14px] text-[#9F9F9F] mb-4">
            Subscription Plan
          </p>
          <span className="font-bold pb-2">
            Upgrade and get more out of Schooled Afrika
          </span>
          <p className="text-[14px] font-medium">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo.
          </p>

          <div className="my-[20px]">
            <p className="font-bold pb-2">Current Plan</p>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[#359C71] underline font-bold text-[14px]">
                Basic Plan
              </span>
              <span className="font-bold text-[14px]">
                Expires May 24, 2024
              </span>
            </div>
            <Button className="bg-[#359C71] font-bold px-5">
              <Image
                src="/svgs/cash-plan.svg"
                width={20}
                height={20}
                alt="View Plans"
                className="mr-2"
              />
              View Plan
            </Button>
          </div>
          <div className="my-5">
            <p className="font-bold pb-2">Need Plan ?</p>
            <p className="text-[14px] font-medium">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo.
            </p>
            <Button className="bg-transparent text-[#359C71] border border-[#359C71] mt-4 font-bold px-2">
              <Image
                src="/svgs/contact-support.svg"
                width={20}
                height={20}
                alt="View Plans"
                className="mr-2"
              />
              Contact Support
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-4 rounded-[5px]">
        <div className="block md:flex items-center gap-4 bg-[#FFFFFF] p-6 h-[40vh] md:h-[30vh] rounded-[5px]">
          <Image
            src="/schoolpic.png"
            width={200}
            height={50}
            className="h-[20vh]"
            alt="School Image"
          />
          <div>
            <span className="font-bold flex items-center my-4 gap-2 text-[14px]">
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
