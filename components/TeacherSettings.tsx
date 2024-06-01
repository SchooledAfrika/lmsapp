import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

const TeacherSettings = () => {
  return (
    <section className="flex flex-col md:flex-row mt-[100px] md:mt-[30px] gap-4">
      <div className="flex-5 bg-[#FFFFFF] rounded-[5px] p-5 h-[100vh] overflow-y-scroll scrollbar-hide">
        <hr className="my-4" />
        <form>
          <label className="font-bold text-[14px] text-[#9F9F9F]">
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
          <label className="font-bold text-[14px] text-[#9F9F9F] my-4">
            Address Details
          </label>
          <input
            type="text"
            className="outline-none p-3 my-4 rounded-[5px] border-2 w-full"
            placeholder="Permanent House Address"
          />
          <hr className="my-4" />
        </form>
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
        <div>
          <form className="h-[55%] bg-[#FFFFFF] rounded-[5px] p-4">
            <hr className="my-4" />
            <div className="flex justify-between">
              <label className="font-bold text-[#9F9F9F]">
                Banking Information
              </label>
              <Image
                src="/svgs/colored-lock.svg"
                width={20}
                height={20}
                alt="Lock"
              />
            </div>
            <input
              type="text"
              className="outline-none p-3 my-4 rounded-[5px] border-2 w-full"
              placeholder="Bank Name"
            />
            <input
              type="text"
              className="outline-none p-3 mb-4 rounded-[5px] border-2 w-full"
              placeholder="Account Number"
            />
            <input
              type="text"
              className="outline-none p-3 mb-4 rounded-[5px] border-2 w-full"
              placeholder="Account Name"
            />
            <p className="text-[#359C71] text-center text-[12px]">
              Contact <span className="font-bold">Support</span> to Change Your
              Banking Information
            </p>
          </form>
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

export default TeacherSettings;
