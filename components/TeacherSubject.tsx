import React, { useState } from "react";
import Container from "./Container";
import Image from "next/image";
import { IteacherOneOnOneSub } from "./TeacherProfileData";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Preferences } from "@/constants/teacherOneOnOne";

const TeacherSubject: React.FC<IteacherOneOnOneSub> = ({
  errors,
  watch,
  control,
  register,
  clearErrors,
}) => {
  watch("subject");
  watch("grade");
  watch("preferences");

  const [inputFields, setInputFields] = useState<string[]>([""]);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [value, setValue] = useState<string[]>([""]);

  const handleAddInput = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setInputFields([...inputFields, ""]);
  };

  const handlePreference = (item: string) => {
    let arrayInstance = [...preferences];
    const checkPreference = arrayInstance.find((value) => value === item);
    if (checkPreference) {
      const removedPreference = arrayInstance.filter((value) => value !== item);
      arrayInstance = [...removedPreference];
      setPreferences(removedPreference);
      setValue(arrayInstance);
      clearErrors("preferences");
    } else {
      arrayInstance.push(item);
      setPreferences(arrayInstance);
      setValue(arrayInstance);
      clearErrors("preferences");
    }
  };

  return (
    <section className="my-[80px] md:my-6">
      <Container>
        <div className="flex flex-col md:flex-row mb-[50px]">
          <div>
            <label className="font-bold text-[16px]">Session Details</label>
            <div>
              <div className="flex justify-between items-center my-2 p-4 outline-none rounded-[8px] w-full md:w-[40vh] lg:w-[70vh] bg-white">
                <input
                  type="text"
                  {...register("subject")}
                  name="subject"
                  placeholder="Subject"
                  className="outline-none w-full pr-4"
                />
                <Image src="/svgs/lock.svg" width={15} height={15} alt="Lock" />
              </div>

              {errors.subject && (
                <small className="text-red-600">{errors.subject.message}</small>
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
                      <ScrollArea className="h-[500px] w-full ">
                        <SelectGroup>
                          {Array.from({ length: 12 }, (_, i) => (
                            <SelectItem key={i} value={`Grade${i + 1}`}>
                              Grade {i + 1}
                            </SelectItem>
                          ))}
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
            <div>
              <label className="font-bold text-[16px]">Preferences</label>
              <div className="grid grid-cols-2 gap-x-2 w-full">
                {Preferences.map((preference, index) => (
                  <label
                    key={index}
                    onClick={() => handlePreference(preference)}
                    className="flex justify-between items-center gap-2 my-2 px-4 py-3 outline-none rounded-[8px] bg-white cursor-pointer"
                  >
                    {preference}
                    <input
                      type="checkbox"
                      name="preferences"
                      value={preference}
                      checked={preferences.includes(preference)}
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
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TeacherSubject;
