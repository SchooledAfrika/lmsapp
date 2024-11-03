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
  UseFormSetValue,
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
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@mui/material";

export interface IRequestTeacherSub {
  register: UseFormRegister<IrequestTeacher>;
  errors: FieldErrors<IrequestTeacher>;
  control?: Control<IrequestTeacher>;
  clearErrors: UseFormClearErrors<IrequestTeacher>;
  watch: UseFormWatch<IrequestTeacher>;
  setValue: UseFormSetValue<IrequestTeacher>;
}

// ward fetched type below here
interface IWards {
  id: string;
  name: string;
}

// component to return all the watched ward
const AllWards: React.FC<IRequestTeacherSub> = ({
  register,
  errors,
  control,
  watch,
  clearErrors,
  setValue,
}) => {
  const { data, isLoading, isError, error } = useQuery<IWards[]>({
    queryKey: ["special-request-all-ward"],
    queryFn: async () => {
      const response = await fetch("/api/more-wards");
      const result = await response.json();
      return result;
    },
  });
  if (isLoading) {
    return (
      <Skeleton
        variant="rectangular"
        height={60}
        className=" w-full rounded-md"
      />
    );
  }
  if (isError) {
    return <p className=" text-red-600">something went wrong!!!</p>;
  }
  return (
    <div>
      <Controller
        control={control}
        name="wardId"
        render={({ field }) => (
          <Select
            onValueChange={(value) => {
              const wardId = value.split("-")[0];
              const wardName = value.split("-")[1];
              field.onChange(wardId);
              setValue("wardName", wardName);
              clearErrors("wardId");
              clearErrors("wardName");
            }}
          >
            <SelectTrigger className=" mt-4 mb-2 h-[60px] w-full p-4">
              <SelectValue placeholder="Select Ward" />
            </SelectTrigger>

            <SelectContent className=" font-subtext font-medium">
              <SelectGroup>
                {data?.map((ward, index) => (
                  <SelectItem key={index} value={`${ward.id}-${ward.name}`}>
                    {ward.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      {errors.wardId && <small>{errors.wardId.message}</small>}
    </div>
  );
};

const WardsDetail: React.FC<IRequestTeacherSub> = ({
  register,
  errors,
  control,
  watch,
  clearErrors,
  setValue,
}) => {
  watch("gender");
  watch("grade");
  return (
    <section className=" font-header w-full md:w-[55%] flex flex-col gap-2   ">
      <h3 className="font-bold text-[16px]">Request a Special Teacher</h3>
      <p className=" text-[13.5px]">
        Have special need for your child? Request for a teacher that suits your
        needs.
      </p>

      <AllWards
        register={register}
        errors={errors}
        control={control}
        watch={watch}
        clearErrors={clearErrors}
        setValue={setValue}
      />
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
            <SelectTrigger className=" h-[60px] w-full">
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
            <SelectTrigger className="  h-[60px] w-full">
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
    </section>
  );
};
export default WardsDetail;
