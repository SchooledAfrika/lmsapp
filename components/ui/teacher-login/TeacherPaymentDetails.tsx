import Image from "next/image";
import React, { useState } from "react";
import { ITeacherSub } from "./TeacherInfo";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants/index";
const TeacherPaymentDetails: React.FC<ITeacherSub> = ({
  register,
  errors,
  control,
  watch,
  clearErrors,
  setValue,
}) => {
  const [allPreference, setPreference] = useState<string[]>([]);
  // the preference array
  const preferences = [
    "HomeWork Support",
    "1 on 1 Sessions",
    "Open to Jobs",
    "Group Sessions",
  ];
  // the language array
  const teacherLang: string[] = [
    "English",
    "French",
    "Igbo",
    "Yoruba",
    "Hausa",
    "Spanish",
  ];
  // this function below handle preference selection
  const handlePreference = (item: string) => {
    // checking if the preference is already in the array
    // if there remove, else add it
    let arrayInstance = [...allPreference];
    const checkPreference = arrayInstance.find((value) => value === item);
    if (checkPreference) {
      const removedPrefrence = arrayInstance.filter((value) => value !== item);
      arrayInstance = [...removedPrefrence];
      setPreference(removedPrefrence);
    } else {
      arrayInstance.push(item);
      setPreference(arrayInstance);
    }
    setValue!("preference", arrayInstance);
  };
  watch("subject");
  watch("grade");
  watch("language");
  watch("homeWorkPrice");
  watch("sessionPrice");
  watch("preference");
  return (
    <div className="flex flex-col w-full md:w-[55%] gap-2">
      <label className="font-bold text-[16px] pb-2">Subject & Language</label>
      <Controller
        control={control}
        name="language"
        render={({ field }) => (
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              clearErrors("language");
            }}
          >
            <SelectTrigger className=" py-[27px]">
              <SelectValue
                placeholder={`${
                  field.value ? field.value : "Language I speak"
                }`}
              />
            </SelectTrigger>
            <SelectContent>
              {teacherLang.map((value, index) => (
                <SelectItem key={index} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors.language && (
        <small className=" text-red-600">{errors.language.message}</small>
      )}
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
            <SelectTrigger className=" py-[27px]">
              <SelectValue
                placeholder={`${
                  field.value ? field.value : "Language I speak"
                }`}
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
      {errors.subject && (
        <small className=" text-red-600">{errors.subject.message}</small>
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
            <SelectTrigger className="w-full  py-[27px] focus:outline-none">
              <SelectValue
                placeholder={`${
                  field.value ? field.value : "Select grade you will teach"
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
        <small className=" text-red-600">{errors.grade.message}</small>
      )}
      <label className="font-bold text-[16px] pt-3">Pricing</label>
      <span className="text-[14px] font-medium py-2">
        Please note that the minimum duration for a session is 45 minutes and
        the maximum duration is 2 hours. Your price range should account for
        that.
      </span>
      <div className="flex justify-between items-center my-2 p-4 outline-none rounded-[8px] bg-white">
        <input
          {...register("sessionPrice")}
          type="number"
          name="sessionPrice"
          placeholder="Session Price Range"
          className="outline-none w-full pr-4"
        />
        <div className="flex items-center gap-1">
          <Image src="/svgs/usaLogo.svg" width={18} height={18} alt="Lock" />
          <span className="font-bold text-[16px]">USD</span>
        </div>
      </div>
      {errors.sessionPrice && (
        <small className=" text-red-600">{errors.sessionPrice.message}</small>
      )}
      <div className="flex justify-between items-center my-2 p-4 outline-none rounded-[8px] bg-white">
        <input
          {...register("homeWorkPrice")}
          type="number"
          name="homeWorkPrice"
          placeholder="Homework Support Price Range"
          className="outline-none w-full pr-4"
        />
        <div className="flex items-center gap-1">
          <Image src="/svgs/usaLogo.svg" width={18} height={18} alt="Lock" />
          <span className="font-bold text-[16px]">USD</span>
        </div>
      </div>
      {errors.homeWorkPrice && (
        <small className=" text-red-600">{errors.homeWorkPrice.message}</small>
      )}
      <div>
        <label className="font-bold text-[16px]">Preferences</label>
        <div className="grid grid-cols-2 gap-x-2 w-full">
          {preferences.map((preference, index) => (
            <label
              onClick={() => handlePreference(preference)}
              key={index}
              className="flex justify-between items-center gap-2 my-2 px-4 py-3 outline-none rounded-[8px] bg-white cursor-pointer"
            >
              {preference}
              <input
                type="checkbox"
                name="preferences"
                checked={allPreference.includes(preference)}
                value={preference}
                className="appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-green-600 checked:border-transparent focus:outline-none"
              />
            </label>
          ))}
        </div>
        {errors.preference && (
          <small className=" text-red-600">{errors.preference.message}</small>
        )}
      </div>
    </div>
  );
};

export default TeacherPaymentDetails;
