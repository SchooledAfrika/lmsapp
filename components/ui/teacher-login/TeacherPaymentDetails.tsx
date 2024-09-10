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
import { MultipleSelect } from "../book-teacher/StudentBookDetails";
import { gradeList, preferences, teacherLang } from "@/constants/completeReg";
import { toast } from "react-toastify";
import { AllSubject } from "../book-teacher/StudentBookDetails";

const TeacherPaymentDetails: React.FC<ITeacherSub> = ({
  register,
  errors,
  control,
  watch,
  clearErrors,
  setValue,
}) => {
  const [allPreference, setPreference] = useState<string[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string[]>([]);
  const [selectedLang, setSelectedLang] = useState<string[]>([]);

  // function to set or remove the grades selected
  const handleSelectGrade = (grade: string) => {
    const aspectGrade = [...selectedGrade];
    // check if the subject already exists
    const isGradeExist = aspectGrade.includes(grade);
    if (isGradeExist) {
      const modifiedGrade = aspectGrade.filter((item) => item !== grade);
      setSelectedGrade(modifiedGrade);
      if (setValue) {
        setValue("grade", modifiedGrade);
      }
      clearErrors("grade");
    } else {
      if (aspectGrade.length === 5) {
        return toast.error("maximum of 5 grades is allowed");
      }
      const modifiedGrade = [...aspectGrade, grade];
      setSelectedGrade(modifiedGrade);
      if (setValue) {
        setValue("grade", modifiedGrade);
      }
      clearErrors("grade");
    }
  };

  // function to handle selected subjects
  const handleSelectSubject = (subject: string) => {
    const aspectSubject = [...selectedSubject];
    // check if the subject already exists
    const isSubjectExisting = aspectSubject.includes(subject);
    if (isSubjectExisting) {
      const modifiedSubject = aspectSubject.filter((item) => item !== subject);
      setSelectedSubject(modifiedSubject);
      if (setValue) {
        setValue("subject", modifiedSubject);
      }
      clearErrors("subject");
    } else {
      if (aspectSubject.length === 4) {
        return toast.error("maximum of 4 subjects is allowed");
      }
      const modifiedSubject = [...aspectSubject, subject];
      setSelectedSubject(modifiedSubject);
      if (setValue) {
        setValue("subject", modifiedSubject);
      }
      clearErrors("subject");
    }
  };
  // function to handle selected language a teacher can speak
  const handleSelectLang = (language: string) => {
    const aspectLang = [...selectedLang];
    // check if the subject already exists
    const isSubjectExisting = aspectLang.includes(language);
    if (isSubjectExisting) {
      const modifiedLang = aspectLang.filter((item) => item !== language);
      setSelectedLang(modifiedLang);
      if (setValue) {
        setValue("language", modifiedLang);
      }
      clearErrors("language");
    } else {
      if (aspectLang.length === 5) {
        return toast.error("maximum of 5 languages is allowed");
      }
      const modifiedLang = [...aspectLang, language];
      setSelectedLang(modifiedLang);
      if (setValue) {
        setValue("language", modifiedLang);
      }
      clearErrors("language");
    }
  };

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
  watch("preference");
  return (
    <div className="flex flex-col w-full md:w-[55%] gap-2">
      <label className="font-bold text-[16px] pb-2">Subject & Language</label>
      <MultipleSelect
        placeholder="select language"
        itemList={teacherLang}
        selectedItem={selectedLang}
        handleSelectedItem={handleSelectLang}
      />
      {errors.language && (
        <small className=" text-red-600">{errors.language.message}</small>
      )}
      {/* this is for the subject a teacher can teach */}
      <MultipleSelect
        placeholder="select subjects"
        itemList={AllSubject}
        selectedItem={selectedSubject}
        handleSelectedItem={handleSelectSubject}
      />
      {errors.subject && (
        <small className=" text-red-600">{errors.subject.message}</small>
      )}
      {/* select box for the grades below here */}
      <MultipleSelect
        placeholder="select grades"
        itemList={gradeList}
        selectedItem={selectedGrade}
        handleSelectedItem={handleSelectGrade}
      />
      {errors.grade && (
        <small className=" text-red-600">{errors.grade.message}</small>
      )}
      <input
        {...register("hours")}
        onChange={() => clearErrors("hours")}
        placeholder="hours of experience"
        type="number"
        className=" py-3 px-2 border border-black focus:outline-none rounded-md"
      />
      {errors.hours && (
        <small className=" text-red-600">{errors.hours.message}</small>
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
