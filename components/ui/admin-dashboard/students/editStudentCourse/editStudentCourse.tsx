"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const EditStudentCourse = () => {
  const { control, handleSubmit, setValue } = useForm();
  const [subjects, setSubjects] = useState<string[]>([]);

  const handleAddSubject = (value: string) => {
    if (!subjects.includes(value)) {
      const updatedSubjects = [...subjects, value];
      setSubjects(updatedSubjects);
      setValue("subjects", updatedSubjects);
    }
  };

  const handleRemoveSubject = (value: string) => {
    const updatedSubjects = subjects.filter((subject) => subject !== value);
    setSubjects(updatedSubjects);
    setValue("subjects", updatedSubjects);
  };

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

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="flex items-center justify-center gap-2 bg-none cursor-pointer">
          <Image
            src="/svgs/edit-colored.svg"
            width={20}
            height={20}
            alt="Edit"
          />
        </span>
      </DialogTrigger>

      <DialogContent className="sm:w-[500px]  w-[400px] font-subtext">
        <ScrollArea className="h-[250px] w-full">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">
              Update Course
            </DialogTitle>
          </DialogHeader>
          <div className="w-full mt-2">
            <form>
              <div>
                <label className="text-[15px]">Course to Enrol</label>
                <Controller
                  name="subjects"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Select onValueChange={handleAddSubject}>
                        <SelectTrigger className="w-full py-6 mt-4">
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

              <Button className="my-5 bg-lightGreen">Update Courses</Button>
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EditStudentCourse;
