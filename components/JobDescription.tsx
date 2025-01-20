import React from "react";
import {
  UseFormClearErrors,
  UseFormRegister,
  FieldErrors,
  Control,
  Controller,
  UseFormWatch,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";
import { States } from "@/constants/jobListing";
import Link from "next/link";
import Container from "./Container";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { IjobListing } from "@/components/JobNewList";
import { Input } from "@/components/ui/input";
import { Subject } from "@/constants/addClassroom";

export interface IJobSub {
  register: UseFormRegister<IjobListing>;
  errors: FieldErrors<IjobListing>;
  control?: Control<IjobListing>;
  clearErrors: UseFormClearErrors<IjobListing>;
  watch: UseFormWatch<IjobListing>;
  setValue: UseFormSetValue<IjobListing>;
  getValues: UseFormGetValues<IjobListing>;
}

const JobDescription: React.FC<IJobSub> = ({
  register,
  errors,
  control,
  watch,
  clearErrors,
  setValue,
  getValues,
}) => {
  return (
    <section className=" w-full md:w-2/3 flex flex-col gap-3">
      <label className="font-bold text-[18px]">
        What does the job entail ?
      </label>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className=" flex flex-col gap-1">
          <Controller
            control={control}
            name="jobTitle"
            render={({ field }) => (
              <Select
                value={getValues("jobTitle") && getValues("jobTitle")}
                onValueChange={(value) => {
                  field.onChange(value);
                  clearErrors("jobTitle");
                }}
              >
                <SelectTrigger className=" w-full py-6">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>

                <SelectContent className=" font-subtext font-medium">
                  <ScrollArea className="h-[500px] w-full ">
                    <SelectGroup>
                      {Subject.map((item, index) => (
                        <SelectItem key={index} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </ScrollArea>
                </SelectContent>
              </Select>
            )}
          />
          {errors.jobTitle && (
            <small className="text-red-600">{errors.jobTitle.message}</small>
          )}
        </div>
        <div className=" flex flex-col gap-1">
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <Select
                value={getValues("role") && getValues("role")}
                onValueChange={(value) => {
                  field.onChange(value);
                  clearErrors("role");
                }}
              >
                <SelectTrigger className="w-full py-6 ">
                  <SelectValue placeholder="Role  Type" />
                </SelectTrigger>
                <SelectContent className=" font-subtext font-medium">
                  <SelectGroup>
                    <SelectItem value="FULLTIME">FULL-TIME</SelectItem>
                    <SelectItem value="PARTTIME">PART-TIME</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.role && (
            <small className="text-red-600">{errors.role.message}</small>
          )}
        </div>
        <div className=" flex flex-col gap-1">
          <Controller
            control={control}
            name="state"
            render={({ field }) => (
              <Select
                value={getValues("state") && getValues("state")}
                onValueChange={(value) => {
                  field.onChange(value);
                  clearErrors("state");
                }}
              >
                <SelectTrigger className="w-full py-6">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent className=" font-subtext font-medium">
                  <ScrollArea className="h-[200px] w-full ">
                    <SelectGroup>
                      {States.map((item, index) => (
                        <SelectItem key={index} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </ScrollArea>
                </SelectContent>
              </Select>
            )}
          />
          {errors.state && (
            <small className="text-red-600">{errors.state.message}</small>
          )}
        </div>
        <div className=" flex flex-col gap-1">
          <Controller
            control={control}
            name="level"
            render={({ field }) => (
              <Select
                value={getValues("level") && getValues("level")}
                onValueChange={(value) => {
                  field.onChange(value);
                  clearErrors("level");
                }}
              >
                <SelectTrigger className="w-full py-6">
                  <SelectValue placeholder="Grade" />
                </SelectTrigger>
                <SelectContent className=" font-subtext font-medium">
                  <ScrollArea className="h-[200px] w-full ">
                    <SelectGroup>
                      <SelectItem value="Grade1">Grade 1</SelectItem>
                      <SelectItem value="Grade2">Grade 2</SelectItem>
                      <SelectItem value="Grade3">Grade 3</SelectItem>
                      <SelectItem value="Grade4">Grade 4</SelectItem>
                      <SelectItem value="Grade5">Grade 5</SelectItem>
                      <SelectItem value="Grade6">Grade 6</SelectItem>
                      <SelectItem value="Grade7">Grade 7</SelectItem>
                      <SelectItem value="Grade8">Grade 8</SelectItem>
                      <SelectItem value="Grade9">Grade 9</SelectItem>
                      <SelectItem value="Grade10">Grade 10</SelectItem>
                      <SelectItem value="Grade11">Grade 11</SelectItem>
                      <SelectItem value="Grade12">Grade 12</SelectItem>
                    </SelectGroup>
                  </ScrollArea>
                </SelectContent>
              </Select>
            )}
          />
          {errors.level && (
            <small className="text-red-600">{errors.level.message}</small>
          )}
        </div>
      </div>
      <Input
        id="name"
        {...register("location")}
        name="location"
        onChange={() => clearErrors("location")}
        className="p-4 !w-full !md:w-1/3 outline-none my-1"
        placeholder="Location"
      />
      {errors.location && (
        <small className="text-red-600">{errors.location.message}</small>
      )}

      <textarea
        id="name"
        {...register("description")}
        name="description"
        onChange={() => clearErrors("description")}
        rows={6}
        cols={7}
        className=" !w-full !md:w-2/3 p-2"
        placeholder="Job Description"
      />
      {errors.description && (
        <small className="text-red-600">{errors.description.message}</small>
      )}
      <div className="flex gap-3 !w-full !md:w-2/3">
        <div className=" flex-1">
          <input
            type="text"
            id="name"
            {...register("minSalary")}
            name="minSalary"
            onChange={() => clearErrors("minSalary")}
            placeholder="Salary Range (Minimum)"
            className="my-2 p-4 outline-none rounded-[8px] w-full  bg-white text-[12px] md:text-[16px] "
          />
          {errors.minSalary && (
            <small className="text-red-600">{errors.minSalary.message}</small>
          )}
        </div>
        <div className=" flex-1">
          <input
            type="text"
            id="name"
            {...register("maxSalary")}
            name="maxSalary"
            onChange={() => clearErrors("maxSalary")}
            placeholder="Salary Range (Maximum)"
            className="my-2 p-4 outline-none rounded-[8px] w-full bg-white text-[12px] md:text-[16px]"
          />
          {errors.maxSalary && (
            <small className="text-red-600">{errors.maxSalary.message}</small>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDescription;
