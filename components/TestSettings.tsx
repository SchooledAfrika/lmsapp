import React from "react";
import Image from "next/image";
import { IExamSubSub } from "./TestType";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const TestSettings: React.FC<IExamSubSub> = ({
  control,
  clearErrors,
  errors,
}) => {
  return (
    <div className=" w-full md:w-3/5 flex flex-col pl-[0] gap-2 ">
      <label className="font-bold text-[18px]">Set up your Test !</label>
      <div className=" flex flex-col">
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
              <SelectTrigger className="w-full  py-[27px] focus:outline-none">
                <SelectValue
                  placeholder={`${field.value ? field.value : "Select grade"}`}
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
      <div className=" flex flex-col">
        <Controller
          control={control}
          name="duration"
          render={({ field }) => (
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                clearErrors("duration");
              }}
            >
              <SelectTrigger className="w-full  py-[27px] focus:outline-none">
                <SelectValue
                  placeholder={`${
                    field.value ? field.value : "Select duration"
                  }`}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={"30"}>30min</SelectItem>
                  <SelectItem value={"60"}>1hr</SelectItem>
                  <SelectItem value={"90"}>1hr30mins</SelectItem>
                  <SelectItem value={"120"}>2hr</SelectItem>
                  <SelectItem value={"150"}>2hrs30mins</SelectItem>
                  <SelectItem value={"180"}>3hrs</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.duration && (
          <small className=" text-red-600">{errors.duration.message}</small>
        )}
      </div>
    </div>
  );
};

export default TestSettings;
