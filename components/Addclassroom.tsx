"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  addingClassroomSchoolSchema,
  Schedules,
  Subject,
} from "@/constants/addClassroomSchool";
export type IaddingClassroomSchool = z.infer<
  typeof addingClassroomSchoolSchema
>;

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { SiGoogleclassroom } from "react-icons/si";
import { format } from "date-fns";
import { FaHourglassStart, FaHourglassEnd } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddClassroom = () => {
  const [loading, setloading] = useState<boolean>(false);
  const [schedules, setSchedules] = useState<string[]>([]);
  // react hook form instance below here
  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IaddingClassroomSchool>({
    resolver: zodResolver(addingClassroomSchoolSchema),
  });

  //   instance of client
  const queryClient = useQueryClient();
  //   creating a post using mutation to the backend
  const mutation = useMutation({
    mutationKey: ["postSchool"],
    mutationFn: async (data: IaddingClassroomSchool) => {
      console.log(data);
      const result = await fetch("", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          maxCapacity: Number(data.maxCapacity),
        }),
      });

      return result;
    },
    onSuccess: async (result) => {
      queryClient.invalidateQueries({ queryKey: ["addSchool"] });
      if (result.ok) {
        const body = await result.json();
        setloading(false);
        reset();
        return toast.success(body.message);
      } else {
        setloading(false);
        return toast.error("error creating class");
      }
    },
  });
  // here we validate the datas in our form submission
  // only if there is data, before the mutation function is called
  const runSubmit: SubmitHandler<IaddingClassroomSchool> = async (data) => {
    setloading(true);
    mutation.mutate(data);
  };

  //this function below handle schedule selection
  const handleSchedule = (item: string) => {
    // checking if the scheduled day is already in the array
    // if there is remove, else add it
    let arrayInstance = [...schedules];
    const checkSchedule = arrayInstance.find((value) => value === item);
    if (checkSchedule) {
      const removedSchedule = arrayInstance.filter((value) => value !== item);
      arrayInstance = [...removedSchedule];
      setSchedules(removedSchedule);
      setValue("schedules", arrayInstance);
      clearErrors("schedules");
    } else {
      arrayInstance.push(item);
      setSchedules(arrayInstance);
      setValue("schedules", arrayInstance);
      clearErrors("schedules");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-lightGreen mt-3 bg-none border-none rounded-lg hover:bg-green-700  text-white text-[14px] font-semibold  px-3 sm:w-36   py-2 text-start lg:block">
          <SiGoogleclassroom className="sm:inline-block hidden mr-1" />
          Add Classroom
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[500px] w-[380px] font-subtext">
        <ScrollArea className="h-[500px] w-full ">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">
              Create Classroom
            </DialogTitle>
          </DialogHeader>

          <div className="w-[96%] mt-2">
            <form
              onSubmit={handleSubmit(runSubmit)}
              className=" flex flex-col gap-2 w-full px-2"
            >
              <div className=" flex flex-col">
                <Input
                  id="name"
                  type="text"
                  {...register("className")}
                  name="className"
                  onChange={() => clearErrors("className")}
                  placeholder="Class Name"
                  className="col-span-6 w-full"
                />
                {errors.className && (
                  <small className="text-red-600">
                    {errors.className.message}
                  </small>
                )}
              </div>

              <div className="flex flex-col">
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
                      <SelectTrigger className=" w-full py-6">
                        <SelectValue placeholder="Subject" />
                      </SelectTrigger>

                      <SelectContent className=" font-subtext font-medium">
                        <ScrollArea className="h-[500px] w-full ">
                          <SelectGroup>
                            {Subject.map((item, index) => (
                              <SelectItem key={index} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.subject && (
                  <small className="text-red-600">
                    {errors.subject.message}
                  </small>
                )}
              </div>
              <div className="flex flex-col ">
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
                            <SelectItem value="Grade1">Grade 1</SelectItem>
                            <SelectItem value="Grade2">Grade 2</SelectItem>
                            <SelectItem value="Grade3">Grade 3</SelectItem>
                            <SelectItem value="Grade4">Grade 4</SelectItem>
                            <SelectItem value="Grade5">Grade 5</SelectItem>
                            <SelectItem value="Grade6">Grade 6</SelectItem>
                            <SelectItem value="Grade7">Grade 7</SelectItem>
                            <SelectItem value="Grade8">Grade 8</SelectItem>
                            <SelectItem value="Grade9">Grade 9</SelectItem>
                            <SelectItem value="Grade10">Grade 10</SelectItem>
                            <SelectItem value="Grade11">Grade 11</SelectItem>
                            <SelectItem value="Grade12">Grade 12</SelectItem>
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
              <div className="flex flex-col">
                <Controller
                  control={control}
                  name="duration"
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        clearErrors("duration");
                      }}
                    >
                      <SelectTrigger className="w-full py-6">
                        <SelectValue placeholder="Duration" />
                      </SelectTrigger>

                      <SelectContent className=" font-subtext font-medium">
                        <ScrollArea className="h-[200px] w-full ">
                          <SelectGroup>
                            <SelectItem value="2weeks">2 Weeks</SelectItem>
                            <SelectItem value="1month">1 Month</SelectItem>
                            <SelectItem value="2months">2 Months</SelectItem>
                            <SelectItem value="3months">3 Months</SelectItem>
                            <SelectItem value="6months">6 Months</SelectItem>
                            <SelectItem value="1year">1 Year</SelectItem>
                          </SelectGroup>
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.duration && (
                  <small className="text-red-600">
                    {errors.duration.message}
                  </small>
                )}
              </div>
              <div className="flex flex-col">
                <Controller
                  control={control}
                  name="classStarts"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full p-4 justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <FaHourglassStart className="mr-2 h-4 text-lightGreen w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Class Starts</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full col-span-6 p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onDayClick={field.onChange}
                          className="font-subtext"
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.classStarts && (
                  <small className=" text-red-600">
                    {errors.classStarts.message}
                  </small>
                )}
              </div>
              <div className="flex flex-col">
                <Controller
                  control={control}
                  name="classEnds"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full p-4 justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <FaHourglassEnd className="mr-2 text-lightGreen h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Class Ends</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full col-span-6 p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onDayClick={field.onChange}
                          className="font-subtext"
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.classEnds && (
                  <small className=" text-red-600">
                    {errors.classEnds.message}
                  </small>
                )}
              </div>

              <div>
                <label className="font-bold text-[16px]">Class Schedule</label>
                <div className="grid grid-cols-3 gap-2 w-3/4 border p-3 ">
                  {Schedules.map((schedule, index) => (
                    <div
                      onClick={() => handleSchedule(schedule)}
                      key={index}
                      className=" flex justify-between items-center cursor-pointer hover:text-green-500"
                    >
                      <p className=" text-[14px]">{schedule.toLowerCase()}</p>
                      <input
                        type="checkbox"
                        name="schedules"
                        checked={schedules.includes(schedule)}
                        value={schedule}
                        className="appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-green-600 checked:border-transparent focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
                {errors.schedules && (
                  <small className=" text-red-600">
                    {errors.schedules.message}
                  </small>
                )}
              </div>

              <div className="flex flex-col">
                <Controller
                  control={control}
                  name="classTime"
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        clearErrors("classTime");
                      }}
                    >
                      <SelectTrigger className=" w-full py-6">
                        <SelectValue placeholder="Class Timing" />
                      </SelectTrigger>

                      <SelectContent className=" font-subtext font-medium">
                        <ScrollArea className="h-[250px] w-full ">
                          <SelectGroup>
                            <SelectItem value="8AM-10AM">8AM-10AM</SelectItem>
                            <SelectItem value="10AM-12PM">10AM-12PM</SelectItem>
                            <SelectItem value="12PM-2PM">12PM-2PM</SelectItem>
                            <SelectItem value="2PM-4PM">2PM-4PM</SelectItem>
                            <SelectItem value="4PM-6PM">4PM-6PM</SelectItem>
                            <SelectItem value="6PM-8PM">6PM-8PM</SelectItem>
                            <SelectItem value="8PM-10PM">8PM-10PM</SelectItem>
                          </SelectGroup>
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.classTime && (
                  <small className="text-red-600">
                    {errors.classTime.message}
                  </small>
                )}
              </div>

              <div className="flex flex-col">
                <Input
                  id="maxCapacity"
                  {...register("maxCapacity")}
                  name="maxCapacity"
                  placeholder="Maximum Capacity"
                  className=""
                />

                {errors.maxCapacity && (
                  <small className="text-red-600">
                    {errors.maxCapacity.message}
                  </small>
                )}
              </div>

              <Button
                type="submit"
                className="w-full py-6 bg-lightGreen hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "creating class..." : "Add Classroom"}
              </Button>
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AddClassroom;
