import Image from "next/image";
import React from "react";

const ParentWardProfileData = () => {
  return (
    <div className=" flex flex-col w-[55%] gap-2">
      <label className="font-bold text-[16px]">Profile Data</label>
      <input
        autoFocus
        type="text"
        name="text"
        placeholder="Full Name"
        className=" p-4 outline-none rounded-[8px] w-full bg-white"
      />
      <input
        type="gender"
        name="text"
        placeholder="Gender"
        className=" p-4 outline-none rounded-[8px] w-full bg-white"
      />
      <input
        type="text"
        name="text"
        placeholder="Select Grade(s)"
        className=" p-4 outline-none rounded-[8px] w-full bg-white"
      />
      <input
        type="text"
        name="text"
        placeholder="Any Disability"
        className=" p-4 outline-none rounded-[8px] w-full bg-white"
      />
      <textarea
        rows={7}
        cols={40}
        className=" p-2 w-full mt-2"
        placeholder="Tell us about your ward"
      ></textarea>

      <div className="flex items-center bg-[#FFFFFF] py-4 pl-2 my-2 rounded-[8px]">
        <Image
          src="/svgs/upload.svg"
          width={15}
          height={15}
          alt="UplaodImage"
        />
        <div>
          <label htmlFor="file-upload" className="cursor-pointer ml-2">
            <span className="bg-transparent py-1 pr-2 text-[12px] font-medium">
              Upload Profile Image
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
  );
};

export default ParentWardProfileData;
