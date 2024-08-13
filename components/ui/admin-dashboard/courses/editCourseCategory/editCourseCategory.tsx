import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const EditCourseCategory = () => {
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
            width={14}
            height={14}
            alt="Edit"
          />
          <p className="text-[12px] font-semibold">Edit Category</p>
        </span>
      </DialogTrigger>

      <DialogContent className="sm:w-[500px]  w-[380px] font-subtext">
        <ScrollArea className="h-[500px] w-full">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">
              Edit Category
            </DialogTitle>
          </DialogHeader>
          <div className="w-[97%] mt-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col">
                <label className="text-[15px] pb-2">Category Name</label>
                <Controller
                  name="categoryName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="e.g Web Development"
                      className="col-span-6 w-full outline-none"
                    />
                  )}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[15px] pb-2 pt-5">Description</label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="e.g Web Development"
                      className="col-span-6 w-full outline-none"
                    />
                  )}
                />
              </div>
              <div className="flex flex-col ">
                <label className="text-[15px] pb-2 pt-5">
                  Category Thumbnail
                </label>
                <Controller
                  name="thumbnail"
                  control={control}
                  render={({ field }) => (
                    <div className="border p-[10px] rounded w-full">
                      <input
                        {...field}
                        type="file"
                        multiple={false}
                        accept="image/*"
                        className="border-1 w-full text-[14px] text-black bg-transparent focus:outline-none"
                      />
                    </div>
                  )}
                />
              </div>
              <div className="flex flex-col mt-2">
                <label className="text-[15px] pb-2 pt-5">Subcategory</label>
                <Controller
                  name="subjects"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Select onValueChange={handleAddSubject}>
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
              <Button type="submit" className="my-5 bg-lightGreen">
                Save Information
              </Button>
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EditCourseCategory;
