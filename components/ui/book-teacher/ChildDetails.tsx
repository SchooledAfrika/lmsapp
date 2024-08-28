import Image from "next/image";
import { ISessionSub } from "./Details";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ChildDetails: React.FC<ISessionSub> = ({
  register,
  errors,
  control,
  watch,
  clearErrors,
  setValue,
}) => {
  const Subject = [
    "CHEMISTRY",
    "PHYSICS",
    "BIOLOGY",
    "GOVERNMENT",
    "ENGLISH",
    "LITERATURE",
    "CRS",
    "MATHEMATICS",
  ];

  const Curriculum = ["MONTESSORI", "BRITISH", "NIGERIAN"];

  return (
    <ScrollArea className="min-h-[500px] w-full ">
      <div className="">
        <div className="flex justify-between">
          <h3 className="text-xl md:ml-6 font-bold">Book Session</h3>
        </div>
        <div className="flex  mx-auto mt-8 mb-6 flex-col gap-3">
          <p className="text-lightGreen text-[15px] md:ml-8 font-semibold">
            Add Child Details
          </p>
          <p className="text-[14px] md:ml-8 font-semibold">
            Please complete the form with your child's details.
          </p>
        </div>

        <div className="space-y-4 md:mb-0 mb-8 my-2">
          <div className="border md:ml-8  justify-between px-3 flex flex-col py-2  rounded-md ">
            <p className="font-bold text-[14px] mb-1">Child Id</p>
            <input
              {...register("childId")}
              type="text"
              className="py-3 px-6 text-black rounded-md border text-[13px] w-full "
              placeholder="Child Name"
            />
            {errors.childId && (
              <small className="text-red-600">{errors.childId.message}</small>
            )}
          </div>
          <div className="flex md:flex-row-reverse flex-col border md:ml-8  justify-between px-3  py-2  rounded-md gap-[10px]">
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
                  <SelectTrigger className=" w-full py-6">
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

            {errors.grade && (
              <small className="text-red-600">{errors.grade.message}</small>
            )}
          </div>
          <div className="flex flex-col border md:ml-8  justify-between px-3  py-2  rounded-md gap-[10px]">
            <p className="font-bold text-[14px] mb-1">Select Subject</p>

            <Controller
              control={control}
              name="subject"
              render={({ field }) => (
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    clearErrors("subject");
                  }}
                >
                  <SelectTrigger className=" w-full py-6">
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>

                  <SelectContent className=" font-subtext font-medium">
                    <ScrollArea className="h-[200px] w-full ">
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
            {errors.subject && (
              <small className="text-red-600">{errors.subject.message}</small>
            )}
          </div>

          <div className="flex flex-col border md:ml-8  justify-between px-3  py-2  rounded-md gap-[10px]">
            <p className="font-bold text-[14px] mb-1">Select Curriculum</p>

            <Controller
              control={control}
              name="curriculum"
              render={({ field }) => (
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    clearErrors("curriculum");
                  }}
                >
                  <SelectTrigger className=" w-full py-6">
                    <SelectValue placeholder="Curriculum" />
                  </SelectTrigger>

                  <SelectContent className=" font-subtext font-medium">
                    <ScrollArea className="h-[200px] w-full ">
                      <SelectGroup>
                        {Curriculum.map((item, index) => (
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
            {errors.subject && (
              <small className="text-red-600">{errors.subject.message}</small>
            )}
          </div>

          <div className="border md:ml-8  justify-between px-3 flex flex-col py-2  rounded-md ">
            <p className="font-bold text-[14px] mb-1">Special Needs</p>

            <textarea
              {...register("specialNeeds")}
              onChange={() => clearErrors("specialNeeds")}
              rows={6}
              cols={5}
              className="py-3 px-6 text-black rounded-md border text-[13px] w-full "
              placeholder="Dyscalculia, Down syndrome, Autistic disorder, Cerebral plalsy etc."
            />
            {errors.specialNeeds && (
              <small className="text-red-600">
                {errors.specialNeeds.message}
              </small>
            )}
          </div>

          <div className="border md:ml-8  justify-between px-3 flex flex-col py-2  rounded-md ">
            <p className="font-bold text-[14px] mb-1">Learning Goals</p>

            <textarea
              {...register("goals")}
              onChange={() => clearErrors("goals")}
              rows={6}
              cols={5}
              className="py-3 px-6 text-black rounded-md border text-[13px] w-full "
              placeholder="I want my child to improve in his/her grade(s)."
            />
            {errors.goals && (
              <small className="text-red-600">{errors.goals.message}</small>
            )}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default ChildDetails;
