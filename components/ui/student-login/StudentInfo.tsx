import Image from "next/image";
import React, { useState } from "react";
import {
  UseFormClearErrors,
  UseFormRegister,
  FieldErrors,
  Control,
  Controller,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import { Istudent } from "@/components/StudentAccount";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PreviewItem from "../PreviewItem";
export interface IStudentSub {
  register: UseFormRegister<Istudent>;
  errors: FieldErrors<Istudent>;
  control?: Control<Istudent>;
  clearErrors: UseFormClearErrors<Istudent>;
  watch: UseFormWatch<Istudent>;
  setValue: UseFormSetValue<Istudent>;
  profilePhoto?: string | undefined;
  setPhoto?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const StudentInfo: React.FC<IStudentSub> = ({
  register,
  errors,
  control,
  watch,
  clearErrors,
  setValue,
  setPhoto,
  profilePhoto,
}) => {
  watch("name");
  watch("gender");
  watch("phoneNo");
  watch("address");
  watch("profilePhoto");
  // the function to generate a url for the picture
  const handleShowPix = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setValue("profilePhoto", e.target.files);
    const blob = new Blob([file]);
    const localUrl = URL.createObjectURL(blob);
    if (setPhoto) {
      setPhoto(localUrl);
    }
    clearErrors("profilePhoto");
  };
  // function to remove the image selected already
  const handleRemove = () => {
    if (setPhoto) {
      setPhoto(undefined);
    }
    if (setValue) {
      setValue("profilePhoto", "");
    }
  };
  return (
    <div className="flex flex-col w-full md:w-[55%] gap-2">
      <label className="font-bold text-[18px]">Personal Information</label>
      <input
        {...register("name")}
        type="text"
        name="name"
        placeholder="Full Name"
        className=" p-4 outline-none rounded-[8px] w-full bg-white"
        onChange={() => clearErrors("name")}
      />
      {errors.name && (
        <small className="text-red-600">{errors.name.message}</small>
      )}
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
            <SelectTrigger className=" py-[27px]">
              <SelectValue
                placeholder={`${field.value ? field.value : "enter gender"}`}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
      {errors.gender && (
        <small className="text-red-600">{errors.gender.message}</small>
      )}
      <input
        {...register("phoneNo")}
        type="text"
        name="phoneNo"
        placeholder="Phone Number"
        className=" p-4 outline-none rounded-[8px] w-full bg-white"
        onChange={() => clearErrors("phoneNo")}
      />
      {errors.phoneNo && (
        <span className="text-red-600">{errors.phoneNo.message}</span>
      )}
      <input
        {...register("address")}
        type="text"
        name="address"
        placeholder="Permanent House Address"
        className=" p-4 outline-none rounded-[8px] w-full bg-white"
        onChange={() => clearErrors("address")}
      />
      {errors.address && (
        <small className="text-red-600">{errors.address.message}</small>
      )}

      {profilePhoto === undefined ? (
        <div
          className={`flex items-center ${
            errors.profilePhoto && " border border-red-600"
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
              id="file-upload"
              type="file"
              name="profilePhoto"
              className="hidden"
              onChange={handleShowPix}
            />
          </div>
        </div>
      ) : (
        <PreviewItem imageItem={profilePhoto} handleRemove={handleRemove} />
      )}
    </div>
  );
};

export default StudentInfo;
