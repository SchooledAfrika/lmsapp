import React from "react";
import { IStudentSub } from "./StudentInfo";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";

const StudentProfileData: React.FC<IStudentSub> = ({
  register,
  errors,
  control,
  clearErrors,
  watch,
}) => {
  watch("grade");
  watch("details");
  return (
    <div className="flex flex-col w-full md:w-[55%] gap-2">
      <label className="font-bold text-[18px]">Profile Data</label>
      <div className="flex flex-col gap-2">
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
          <small className=" text-red-500">{errors.grade.message}</small>
        )}
        <textarea
          {...register("details")}
          name="details"
          rows={7}
          cols={35}
          className=" p-2 w-full"
          placeholder="Tell us about yourself"
          onChange={() => clearErrors("details")}
        ></textarea>
        {errors.details && (
          <small className=" text-red-500">{errors.details.message}</small>
        )}
      </div>
    </div>
  );
};

export default StudentProfileData;
