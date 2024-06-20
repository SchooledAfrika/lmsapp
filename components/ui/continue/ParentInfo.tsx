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
import {
  UseFormRegister,
  FieldErrors,
  Control,
  Controller,
} from "react-hook-form";
import { Iparents } from "@/components/ParentAccount";

export interface IparentSub {
  register: UseFormRegister<Iparents>;
  errors: FieldErrors<Iparents>;
  control?: Control<Iparents>;
}

const ParentInfo: React.FC<IparentSub> = ({ register, errors, control }) => {
  return (
    <div className=" flex flex-col w-full md:w-[55%] gap-2">
      <label className="font-bold text-[16px]">Personal Information</label>
      <div>
        <input
          {...register("name")}
          autoFocus
          type="text"
          name="name"
          placeholder="Full Name"
          className=" p-4 outline-none rounded-[8px] w-full bg-white"
        />
        {errors.name && (
          <small className=" text-red-600">{errors.name.message}</small>
        )}
      </div>
      <div>
        <Select {...register("gender")}>
          <SelectTrigger className="w-full py-[27px] focus:outline-none">
            <SelectValue placeholder="Select a gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Gender</SelectLabel>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.gender && (
          <small className=" text-red-600">{errors.gender.message}</small>
        )}
      </div>
      <div>
        <input
          {...register("phoneNo")}
          type="text"
          name="phoneNo"
          placeholder="Phone Number"
          className=" p-4 outline-none rounded-[8px] w-full bg-white"
        />
        {errors.phoneNo && (
          <small className=" text-red-600">{errors.phoneNo.message}</small>
        )}
      </div>
      <div>
        <input
          {...register("address")}
          type="text"
          name="address"
          placeholder="Permanent House Address"
          className=" p-4 outline-none rounded-[8px] w-full bg-white"
        />
        {errors.address && (
          <small className=" text-red-600">{errors.address.message}</small>
        )}
      </div>
      <div>
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
              {...register("profilePhoto")}
              id="file-upload"
              type="file"
              name="profilePhoto"
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>
        {errors.profilePhoto && (
          <small className=" text-red-600">{errors.profilePhoto.message}</small>
        )}
      </div>
    </div>
  );
};

export default ParentInfo;
