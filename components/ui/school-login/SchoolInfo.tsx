import Image from "next/image";
import Link from "next/link";
import Container from "../../Container";
import { Button } from "../button";
import Footer from "../../Footer";
import React, { useState } from "react";
import {
  UseFormClearErrors,
  UseFormRegister,
  FieldErrors,
  Control,
  Controller,
  UseFormWatch,
} from "react-hook-form";
import { Ischool } from "@/components/SchoolAccount";

export interface ISchoolSub {
  register: UseFormRegister<Ischool>;
  errors: FieldErrors<Ischool>;
  control?: Control<Ischool>;
  clearErrors: UseFormClearErrors<Ischool>;
  watch: UseFormWatch<Ischool>;
}

const SchoolInfo: React.FC<ISchoolSub> = ({
  register,
  errors,
  watch,
  clearErrors,
}) => {
  return (
    <div className="flex flex-col w-full md:w-[55%] gap-2">
      <label className="font-bold text-[18px]">School Information</label>
      <input
        {...register("name")}
        type="email"
        name="name"
        placeholder="School or Institute Name"
        className=" p-4 outline-none rounded-[8px] w-full bg-white"
        onChange={() => clearErrors("name")}
      />
      {errors.name && (
        <small className=" text-red-600">{errors.name.message}</small>
      )}
      <input
        {...register("schAddress")}
        type="email"
        name="schAddress"
        placeholder="Enter School Address (Optional)"
        className="my-2 p-4 outline-none rounded-[8px] w-full bg-white"
        onChange={() => clearErrors("schAddress")}
      />
      {errors.schAddress && (
        <small className=" text-red-600">{errors.schAddress.message}</small>
      )}
      <div className="flex flex-col justify-center my-3 p-10 outline-none rounded-[8px] w-full bg-white">
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
          {...register("banner")}
          name="banner"
          className="flex w-1/2 my-3 cursor-pointer mx-auto justify-center items-center"
          type="file"
          multiple={false}
          accept="image/*"
        />
        <p className="py-4 text-center">School or Institute Cover</p>
        <p className="flex items-center justify-center gap-2 text-[12px]">
          {" "}
          <Image
            src="/svgs/error.svg"
            alt="error"
            width={15}
            height={15}
          />{" "}
          Note that the cover is visible as a banner to everyone.
        </p>
      </div>
      {errors.banner && (
        <small className=" text-red-600">{String(errors.banner.message)}</small>
      )}
    </div>
  );
};
export default SchoolInfo;
