import Image from "next/image";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IparentSub } from "./ParentInfo";

const ParentWardProfileData: React.FC<IparentSub> = ({ register, errors }) => {
  return (
    <div className=" flex flex-col w-[55%] gap-2">
      <label className="font-bold text-[16px]">Profile Data</label>
      <input
        autoFocus
        type="text"
        name="wardName"
        placeholder="Full Name"
        className=" p-4 outline-none rounded-[8px] w-full bg-white"
      />
      <Select>
        <SelectTrigger className="w-full  py-[27px] focus:outline-none">
          <SelectValue placeholder="Select a gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>gender</SelectLabel>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-full  py-[27px] focus:outline-none">
          <SelectValue placeholder="Select wards grade" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Grade</SelectLabel>
            <SelectItem value="Grade1">Grade1</SelectItem>
            <SelectItem value="Grade2">Grade2</SelectItem>
            <SelectItem value="Grade3">Grade3</SelectItem>
            <SelectItem value="Grade4">Grade4</SelectItem>
            <SelectItem value="Grade5">Grade5</SelectItem>
            <SelectItem value="Grade6">Grade6</SelectItem>
            <SelectItem value="Grade7">Grade7</SelectItem>
            <SelectItem value="Grade8">Grade8</SelectItem>
            <SelectItem value="Grade9">Grade9</SelectItem>
            <SelectItem value="Grade10">Grade10</SelectItem>
            <SelectItem value="Grade11">Grade11</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-full  py-[27px] focus:outline-none">
          <SelectValue placeholder="any disability" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Disability</SelectLabel>
            <SelectItem value="true">Disabled</SelectItem>
            <SelectItem value="false">Not disabled</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <textarea
        rows={7}
        cols={40}
        name="details"
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
            name="childImg"
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default ParentWardProfileData;
