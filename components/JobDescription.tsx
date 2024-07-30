import React from "react";
import {
  UseFormClearErrors,
  UseFormRegister,
  FieldErrors,
  Control,
  Controller,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import { States } from "@/constants/jobListing"
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

import { IjobListing } from "@/components/JobNewList"
import { Input } from "@/components/ui/input";

export interface IJobSub {
  register: UseFormRegister<IjobListing>;
  errors: FieldErrors<IjobListing>;
  control?: Control<IjobListing>;
  clearErrors: UseFormClearErrors<IjobListing>;
  watch: UseFormWatch<IjobListing>;
  setValue: UseFormSetValue<IjobListing>;
}



const JobDescription: React.FC<IJobSub> = ({
  register,
  errors,
  control,
  watch,
  clearErrors,
  setValue,
}) => {
 

  return (
    <section className="my-[80px] md:my-6 w-[500px]">
    
        
           
          <div className="md:pl-[100px] w-[500px]">
           
              <label className="font-bold text-[18px]">
                What does the job entail ?
              </label>
              <div className="flex flex-col md:flex-row gap-3 w-[500px]">
              <Input
                  id="name"
                  type="text"
                  {...register("jobTitle")}
                  name="jobTitle"
                  onChange={() => clearErrors("jobTitle")}
                  placeholder="Job Title"
                  className="my-2 p-4 outline-none rounded-[8px] w-full bg-white"
                />
                {errors.jobTitle && (
                  <small className="text-red-600">
                    {errors.jobTitle.message}
                  </small>
                )}
                <Controller
                  control={control}
                  name="role"
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        clearErrors("role");
                      }}
                    >
                      <SelectTrigger className="my-2 p-4 outline-none rounded-[8px] w-full  bg-white py-6">
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
                  <small className="text-red-600">
                    {errors.role.message}
                  </small>
                )}
               
              </div>
              <div className="flex flex-col md:flex-row gap-3 w-[500px]">
              <Controller
                  control={control}
                  name="state"
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        clearErrors("state");
                      }}
                    >
                      <SelectTrigger className="my-2 p-4 outline-none rounded-[8px] w-full  bg-white">
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
                  <small className="text-red-600">
                    {errors.state.message}
                  </small>
                )}
               <Controller
                  control={control}
                  name="level"
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        clearErrors("level");
                      }}
                    >
                      <SelectTrigger className="my-2 p-4 outline-none rounded-[8px] w-full  bg-white">
                        <SelectValue placeholder="Grade" />
                      </SelectTrigger>

                      <SelectContent className=" font-subtext font-medium">
                        <ScrollArea className="h-[500px] w-full ">
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
              <Input
               id="name"
               {...register("location")}
               name="location"
               onChange={() => clearErrors("location")}
                className="p-4 md:w-[500px] outline-none my-1"
                placeholder="Location"
              />
              {errors.location && (
                  <small className="text-red-600">
                    {errors.location.message}
                  </small>
                )}
              
              <textarea
               id="name"
               {...register("description")}
               name="description"
               onChange={() => clearErrors("description")}
                rows={6}
                cols={7}
                className="p-4 md:w-[500px] outline-none my-1"
                placeholder="Job Description"
              />
              {errors.description && (
                  <small className="text-red-600">
                    {errors.description.message}
                  </small>
                )}
              <div className="flex flex-col md:flex-row gap-3 w-[500px]">
                <input
                  type="text"
                  id="name"
                  {...register("minSalary")}
                  name="minSalary"
                  onChange={() => clearErrors("minSalary")}
                  placeholder="Salary Range (Minimum)"
                  className="my-2 p-4 outline-none rounded-[8px] w-full  bg-white"
                />
                 {errors.minSalary && (
                  <small className="text-red-600">
                    {errors.minSalary.message}
                  </small>
                )}
                <input
                  type="text"
                  id="name"
                  {...register("maxSalary")}
                  name="maxSalary"
                  onChange={() => clearErrors("maxSalary")}
                  placeholder="Salary Range (Maximum)"
                  className="my-2 p-4 outline-none rounded-[8px] w-full bg-white"
                />
                 {errors.maxSalary && (
                  <small className="text-red-600">
                    {errors.maxSalary.message}
                  </small>
                )}
              </div>
              {/* <Button
                onClick={handleDescriptionView}
                className="bg-secondary w-full text-white text-[16px] px-6 py-7 my-3"
              >
                Proceed
              </Button> */}
          
        </div>
     
    </section>
  );
};

export default JobDescription;
