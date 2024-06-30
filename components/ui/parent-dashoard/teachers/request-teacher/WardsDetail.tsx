import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  UseFormClearErrors,
  UseFormRegister,
  FieldErrors,
  Control,
  Controller,
  UseFormWatch,
} from "react-hook-form";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IrequestTeacher } from "@/components/RequestTeacher";

export interface IRequestTeacherSub {
  register: UseFormRegister<IrequestTeacher>;
  errors: FieldErrors<IrequestTeacher>;
  control?: Control<IrequestTeacher>;
  clearErrors: UseFormClearErrors<IrequestTeacher>;
  watch: UseFormWatch<IrequestTeacher>;
}

const WardsDetail: React.FC<IRequestTeacherSub> = ({
  register,
  errors,
  control,
  watch,
  clearErrors,
}) => {
  watch("gender");
  watch("grade");
  return (
    <section className="py-[1rem] font-header md:pt-[3rem]">
      <Container>
        <h3 className="font-bold text-[16px]">Request a Special Teacher</h3>
        <p className="md:w-[450px] text-[13.5px] py-2">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Lorem ipsum dolor sit amet, consectetuer
          adipiscing elit.
        </p>
        <div className="bg-white flex md:w-[450px] my-2 rounded-md  w-full p-4 flex-col">
          <div className="flex space-x-3">
            <Image
              src="/tutors.jpg"
              alt="teacher"
              width={100}
              height={100}
              className="w-[100px] h-[100px] rounded-full"
            />
            <p className="font-bold items-center">David Olushola</p>
          </div>
          <div className="flex flex-col my-6">
            <h3 className="font-semibold text-[14px]">About</h3>
            <p className="text-[13px] font-medium">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Lorem ipsum dolor sit amet,
              consectetuer adipiscing elit.
            </p>
          </div>
        </div>

        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                clearErrors("gender");
              }}
            >
              <SelectTrigger className="md:w-[450px] mt-4 mb-2 h-[60px] w-[330px] p-4">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>

              <SelectContent className=" font-subtext font-medium">
                <SelectGroup>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.gender && (
          <small className="text-red-600">{errors.gender.message}</small>
        )}
        <br />
        <Controller
          control={control}
          name="grade"
          render={({ field }) => (
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                clearErrors("grade");
              }}
            >
              <SelectTrigger className="md:w-[450px]   h-[60px] w-[330px] p-4">
                <SelectValue placeholder="Grade" />
              </SelectTrigger>

              <SelectContent className=" font-subtext font-medium">
                <SelectGroup>
                  <SelectItem value="grade1">Grade 1</SelectItem>
                  <SelectItem value="grade2">Grade 2</SelectItem>
                  <SelectItem value="grade3">Grade 3</SelectItem>
                  <SelectItem value="grade4">Grade 4</SelectItem>
                  <SelectItem value="grade5">Grade 5</SelectItem>
                  <SelectItem value="grade6">Grade 6</SelectItem>
                  <SelectItem value="grade7">Grade 7</SelectItem>
                  <SelectItem value="grade8">Grade 8</SelectItem>
                  <SelectItem value="grade9">Grade 9</SelectItem>
                  <SelectItem value="grade10">Grade 10</SelectItem>
                  <SelectItem value="grade11">Grade 11</SelectItem>
                  <SelectItem value="grade12">Grade 12</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.grade && (
          <small className="text-red-600">{errors.grade.message}</small>
        )}
      </Container>
    </section>
  );
};
export default WardsDetail;
