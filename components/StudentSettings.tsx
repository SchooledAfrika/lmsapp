import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

const StudentSettings = () => {
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
          <div className="flex gap-[10px]">
            <input
              type="text"
              className="outline-none p-3 rounded-[5px]  border-2 w-[50%]"
              placeholder="Grade"
            />
            <input
              type="text"
              className="outline-none p-3 rounded-[5px] border-2 w-[50%]"
              placeholder="Gender"
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
          <label className="font-bold text-[14px] text-[#9F9F9F] my-4">
            Parent Information
          </label>
          <div className="flex gap-[10px] mt-4">
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
          <input
            type="text"
            className="outline-none p-3 my-4 rounded-[5px] border-2 w-full"
            placeholder="Access ID"
          />
        </form>

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

      <div className="flex-4 rounded-[5px]">
        <div className="bg-[#FFFFFF] rounded-[5px] px-8 py-4">
          <div className="flex items-center gap-3">
            <Image
              src="/teacher1.png"
              width={70}
              height={70}
              className="rounded-full"
              alt="Teacher Picture"
            />
            <div>
              <span className="text-[15px] font-bold">Victor Nwanbe</span>
              <div className="flex items-center bg-[#F8F7F4] w-fit pb-1 pl-2 my-1 rounded">
                <Image
                  src="/svgs/upload.svg"
                  width={12}
                  height={12}
                  alt="UplaodImage"
                />
                <div>
                  <label htmlFor="file-upload" className="cursor-pointer ml-2">
                    <span className="bg-transparent py-1 pr-2 text-[10px] font-medium">
                      Upload New Image
                    </span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    name="upload"
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="my-3">
            <span className="font-bold text-[14px]">About</span>
            <p className="font-medium text-[12px] leading-snug py-2">
              Lorem ipsum dolor sit amet, consectetuer adipiscing eliLorem ipsum
              dolor sit amet, consectetuer adipiscing eliLorem ipsum dolor sit
              amet, consectetuer adipiscing
            </p>
            <Image
              src="/svgs/student-edit.svg"
              width={30}
              height={30}
              alt="Edit Profile"
            />
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
            <Button className="bg-secondary w-full text-white text-[16px] py-7 my-3 ">
              Save Changes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StudentSettings;
