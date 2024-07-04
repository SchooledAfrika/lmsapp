import Image from "next/image";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
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

const ParentWardProfileData: React.FC<IparentSub> = ({
  register,
  errors,
  control,
}) => {
  return (
    <div className=" flex flex-col w-full md:w-[55%] gap-2">
      <label className="font-bold text-[16px]">Profile Data</label>
      <div>
        <input
          {...register("wardName")}
          autoFocus
          type="text"
          name="wardName"
          placeholder="Full Name"
          className=" p-4 outline-none rounded-[8px] w-full bg-white"
        />
        {errors.wardName && (
          <small className=" text-red-600">{errors.wardName.message}</small>
        )}
      </div>
      <div>
        <Controller
          control={control}
          name="wardGender"
          render={({ field }) => (
            <Select onValueChange={field.onChange}>
              <SelectTrigger className=" py-[27px]">
                <SelectValue
                  placeholder={`${
                    field.value ? field.value : "Select ward gender"
                  }`}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.wardGender && (
          <small className=" text-red-600">{errors.wardGender.message}</small>
        )}
      </div>
      <div>
        <Controller
          control={control}
          name="grade"
          render={({ field }) => (
            <Select onValueChange={field.onChange}>
              <SelectTrigger className="w-full  py-[27px] focus:outline-none">
                <SelectValue
                  placeholder={`${
                    field.value ? field.value : "Select ward grade"
                  }`}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
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
          )}
        />
        {errors.grade && (
          <small className=" text-red-600">{errors.grade.message}</small>
        )}
      </div>
      <div>
        <Controller
          control={control}
          name="disable"
          render={({ field }) => (
            <Select onValueChange={field.onChange}>
              <SelectTrigger className="w-full  py-[27px] focus:outline-none">
                <SelectValue
                  placeholder={`${
                    field.value ? field.value : " any disability"
                  }`}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="true">Disabled</SelectItem>
                  <SelectItem value="false">Not disabled</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.disable && (
          <small className=" text-red-600">{errors.disable.message}</small>
        )}
      </div>
      <textarea
        {...register("details")}
        rows={7}
        cols={40}
        name="details"
        className=" p-2 w-full mt-2"
        placeholder="Tell us about your ward"
      ></textarea>
      {errors.details && (
        <small className=" text-red-600">{errors.details.message}</small>
      )}

      <div
        className={`flex items-center ${
          errors.childImg && " border border-red-600"
        } bg-[#FFFFFF] py-4 pl-2 my-2 rounded-[8px]`}
      >
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
            {...register("childImg")}
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
