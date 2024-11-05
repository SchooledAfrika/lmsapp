"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Container from "@/components/Container";
import Link from "next/link";
import { subjects } from "@/constants/index";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { IRequestTeacherSub } from "./WardsDetail";
import { Controller } from "react-hook-form";

const TeacherRequest: React.FC<IRequestTeacherSub> = ({
  register,
  errors,
  control,
  clearErrors,
  watch,
}) => {
  return (
    <section className=" font-header w-full md:w-[55%] flex flex-col gap-2">
      <h3 className="font-bold text-[16px]">Request a Special Teacher</h3>
      <Controller
        control={control}
        name="selectLanguage"
        render={({ field }) => (
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              clearErrors("selectLanguage");
            }}
          >
            <SelectTrigger className=" w-full  h-[60px]  p-4">
              <SelectValue placeholder="Language" />
            </SelectTrigger>

            <SelectContent className=" font-subtext font-medium">
              <SelectGroup>
                <SelectItem value="english">English</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      {errors.selectLanguage && (
        <small className="text-red-600">{errors.selectLanguage.message}</small>
      )}
      <Controller
        control={control}
        name="selectSubject"
        render={({ field }) => (
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              clearErrors("selectSubject");
            }}
          >
            <SelectTrigger className=" w-full h-[60px]  p-4 ">
              <SelectValue
                placeholder={`${field.value ? field.value : "Select Subject"}`}
              />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((value, index) => (
                <SelectItem key={index} value={value.title}>
                  <div className=" flex gap-2">
                    <Image src={value.icon} alt="icon" width={20} height={20} />
                    {value.title}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors.selectSubject && (
        <small className=" text-red-600">{errors.selectSubject.message}</small>
      )}

      <Controller
        control={control}
        name="classSchedule"
        render={({ field }) => (
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              clearErrors("classSchedule");
            }}
          >
            <SelectTrigger className="   h-[60px] w-full p-4">
              <SelectValue placeholder="Class Schedule" />
            </SelectTrigger>

            <SelectContent className=" font-subtext font-medium">
              <SelectGroup>
                <SelectItem value="8AM-10AM">8AM-10AM</SelectItem>
                <SelectItem value="10AM-12PM">10AM-12PM</SelectItem>
                <SelectItem value="12PM-2PM">12PM-2PM</SelectItem>
                <SelectItem value="2PM-4PM">2PM-4PM</SelectItem>
                <SelectItem value="4PM-6PM">4PM-6PM</SelectItem>
                <SelectItem value="6PM-8PM">6PM-8PM</SelectItem>
                <SelectItem value="8PM-10PM">8PM-10PM</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      {errors.classSchedule && (
        <small className="text-red-600">{errors.classSchedule.message}</small>
      )}
      <textarea
        {...register("details")}
        name="details"
        rows={7}
        cols={35}
        className=" p-2  text-[14px]  w-full"
        placeholder="Tell us more about the type of teacher you need."
        onChange={() => clearErrors("details")}
      ></textarea>
      {errors.details && (
        <small className=" text-red-500">{errors.details.message}</small>
      )}
    </section>
  );
};
export default TeacherRequest;
