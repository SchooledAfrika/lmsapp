import React, { useState } from "react";
import Container from "./Container";
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
import { Preferences, Subject } from "@/constants/teacherOneOnOne";

const TeacherSubject: React.FC<IteacherOneOnOneSub> = ({
  errors,
  watch,
  control,
  register,
  clearErrors,
}) => {
  const [subjects, setSubjects] = useState<string[]>([]);
  const [preference, setPreference] = useState<string[]>([]);

  const handleAddSubject = (value: string) => {
    if (!subjects.includes(value)) {
      setSubjects([...subjects, value]);
      clearErrors("subjects");
    }
  };

  const handleRemoveSubject = (value: string) => {
    setSubjects(subjects.filter((subject) => subject !== value));
    clearErrors("subjects");
  };

  const handlePreference = (item: string) => {
    let updatedPreference = [...preference];
    const preferenceExists = updatedPreference.includes(item);

    if (preferenceExists) {
      updatedPreference = updatedPreference.filter((value) => value !== item);
    } else {
      updatedPreference.push(item);
    }

    setPreference(updatedPreference);
    clearErrors("preference");
  };

  return (
    <section className="my-[20px] md:my-6">
      <div className="flex flex-col md:flex-row mb-[30px]">
        <div>
          <label className="font-bold text-[16px]">Session Details</label>
          <div>
            <div className="flex flex-col mt-2">
              <Controller
                name="subjects"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      onValueChange={(value) => {
                        handleAddSubject(value);
                        field.onChange(subjects);
                      }}
                    >
                      <SelectTrigger className="w-full py-6">
                        <SelectValue placeholder="Select subjects" />
                      </SelectTrigger>
                      <SelectContent className="font-subtext font-medium">
                        <ScrollArea className="h-[500px] w-full">
                          <SelectGroup>
                            {Subject.map((item, index) => (
                              <SelectItem key={index} value={item}>
                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={subjects.includes(item)}
                                    readOnly
                                    className="mr-2"
                                  />
                                  {item}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                    <div className="mt-4">
                      {subjects.map((subject, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <input
                            type="text"
                            value={subject}
                            readOnly
                            className="flex-grow p-2 border rounded"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveSubject(subject)}
                            className="ml-2 p-2 text-red-600 border border-red-600 rounded"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              />
            </div>
            {errors.subjects && (
              <small className="text-red-600">{errors.subjects.message}</small>
            )}
          </div>
          <div className="flex flex-col">
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
                  <SelectTrigger className="w-full py-6">
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent className="font-subtext font-medium">
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
          </div>
          {errors.grade && (
            <small className="text-red-600">{errors.grade.message}</small>
          )}
          <div className="mt-3">
            <label className="font-bold text-[16px]">Preferences</label>

            <Controller
              control={control}
              name="preference"
              render={({ field }) => (
                <div className="grid grid-cols md:grid-cols-2 gap-x-2 w-full">
                  {Preferences.map((item, index) => (
                    <label
                      key={index}
                      onClick={() => {
                        handlePreference(item);
                        field.onChange(preference);
                      }}
                      className="flex justify-between items-center gap-2 my-2 px-4 py-3 outline-none rounded-[8px] bg-white cursor-pointer"
                    >
                      {item}
                      <input
                        type="checkbox"
                        name="preference"
                        value={item}
                        checked={preference.includes(item)}
                        readOnly
                        className="appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-green-600 checked:border-transparent focus:outline-none"
                      />
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.preference && (
              <small className="text-red-600">
                {errors.preference.message}
              </small>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeacherSubject;
