import React, { useState } from "react";
import { Button } from "./ui/button";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";
import { IteacherOneOnOne } from "./TeacherOneOnOne";
import {
  UseFormClearErrors,
  UseFormRegister,
  FieldErrors,
  Control,
  Controller,
  UseFormWatch,
} from "react-hook-form";

export interface TeacherSubjectProps {
  register: UseFormRegister<IteacherOneOnOne>;
  errors: FieldErrors<IteacherOneOnOne>;
  watch: UseFormWatch<IteacherOneOnOne>;
  control?: Control<IteacherOneOnOne>;
  clearErrors: UseFormClearErrors<IteacherOneOnOne>;
}

const TeacherSubject: React.FC<TeacherSubjectProps> = ({
  errors,
  watch,
  control,
  register,
  clearErrors,
}) => {
  const [inputFields, setInputFields] = useState<string[]>([""]);
  const preferences = [
    "HomeWork Support",
    "1 on 1 Sessions",
    "Open to Jobs",
    "Group Sessions",
  ];

  const handleAddInput = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setInputFields([...inputFields, ""]);
  };

  watch("subject");
  watch("grade");
  watch("preferences");

  return (
    <section className="my-[80px] md:my-6">
      <Container>
        <div className="flex flex-col md:flex-row mb-[50px]">
          <div>
            <form className="flex flex-col pl-[0] md:pl-[100px] mt-[40px] md:mt-[0]">
              <label className="font-bold text-[16px]">Session Details</label>
              <div>
                {inputFields.map((_, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center my-2 p-4 outline-none rounded-[8px] w-full md:w-[40vh] lg:w-[70vh] bg-white"
                  >
                    <input
                      type="text"
                      name={`subject-${index}`}
                      placeholder={`Subject ${index + 1}`}
                      className="outline-none w-full pr-4"
                    />
                    <Image
                      src="/svgs/lock.svg"
                      width={15}
                      height={15}
                      alt="Lock"
                    />
                  </div>
                ))}
                {errors.subject && (
                  <small className="text-red-600">
                    {errors.subject.message}
                  </small>
                )}
              </div>
              <button
                onClick={handleAddInput}
                className="font-bold text-[12px] w-full hover:bg-green-200 rounded p-4 mt-2"
              >
                <span className="text-green-500">Go Premium</span> Add Another
                Subject +
              </button>
              <div className="flex justify-between items-center my-2 p-4 outline-none rounded-[8px] w-full md:w-[40vh] lg:w-[70vh] bg-white">
                <input
                  type="text"
                  name="text"
                  placeholder="Grade 10, Grade 11 & Grade 12"
                  className="outline-none w-full pr-4"
                />
                <Image
                  src="/svgs/polygon.svg"
                  width={15}
                  height={15}
                  alt="Lock"
                />
              </div>
              {errors.grade && (
                <small className="text-red-600">{errors.grade.message}</small>
              )}
              <div>
                <label className="font-bold text-[16px]">Preferences</label>
                <div className="grid grid-cols-2 gap-x-2 w-full">
                  {preferences.map((preference, index) => (
                    <label
                      key={index}
                      className="flex justify-between items-center gap-2 my-2 px-4 py-3 outline-none rounded-[8px] bg-white cursor-pointer"
                    >
                      {preference}
                      <input
                        type="checkbox"
                        name="preferences"
                        value={preference}
                        className="appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-green-600 checked:border-transparent focus:outline-none"
                      />
                    </label>
                  ))}
                  {errors.preferences && (
                    <small className="text-red-600">
                      {errors.preferences.message}
                    </small>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TeacherSubject;
