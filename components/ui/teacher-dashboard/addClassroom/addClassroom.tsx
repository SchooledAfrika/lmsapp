"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { SiGoogleclassroom } from "react-icons/si";
import { Checkbox } from "@/components/ui/checkbox";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
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

function AddClassroom() {
  const [className, setClassName] = useState<string>();
  const [subject, setSubject] = useState<string>();
  const [grade, setGrade] = useState<string>();
  const [duration, setDuration] = useState<string>();
  const [schedules, setSchedules] = useState<string[]>([]);
  const [classTime, setClassTime] = useState<string>();
  const [price, setPrice] = useState<number>(0);
  const [classBanner, setClassBanner] = useState<string>();
  const [publicClass, setPublicClass] = useState<boolean>();
  const [maxCapacity, setMaxCapacity] = useState<number>(0);
  const [classStarts, setClassStarts] = React.useState<Date>();
  const [classEnds, setClassEnds] = React.useState<Date>();

  // the schedules array
  const Schedules = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // this function below handle schedule selection
  const handleSchedule = (item: string) => {
    // checking if the preference is already in the array
    // if there is remove, else add it
    let arrayInstance = [...schedules];
    const checkSchedule = arrayInstance.find((value) => value === item);
    if (checkSchedule) {
      const removedSchedule = arrayInstance.filter((value) => value !== item);
      arrayInstance = [...removedSchedule];
      setSchedules(removedSchedule);
    } else {
      arrayInstance.push(item);
      setSchedules(arrayInstance);
    }
  };

  //   instance of client
  const queryClient = useQueryClient();

  // Queries
  const query = useQuery({ queryKey: ["add"] });
  //   creating a post using mutation
  const mutation = useMutation({
    mutationKey: ["post"],
    mutationFn: async () => {
      const result = await fetch("/api/class", {
        method: "POST",
        body: JSON.stringify({
          className,
          subject,
          grade,
          duration,
          schedules,
          classTime,
          price,
          publicClass,
          maxCapacity,
          classStarts,
          classEnds,
        }),
      });
      return result;
    },
    onSuccess: async (result) => {
      queryClient.invalidateQueries({ queryKey: ["add"] });
    },
  });
  const handleSubmit = () => {
    mutation.mutate();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-lightGreen mt-3 bg-none border-none rounded-lg hover:bg-green-700  text-white text-[13px] font-semibold  px-3    py-2 text-start lg:block">
          <SiGoogleclassroom className="sm:inline-block text-[18px] hidden mr-1" />
          Create Classroom
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:w-[500px]  w-[380px] font-subtext">
        <ScrollArea className="h-[500px] w-full ">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">
              Create Classroom
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 font-header py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="name"
                type=""
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="Class Name"
                className="col-span-6 w-full"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Class Subject"
                className="col-span-6 w-full"
              />
            </div>
            <div className="grid grid-cols-4  items-center gap-4 w-full">
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger className="md:w-[450px] w-[330px] p-4">
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
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="md:w-[450px] w-[330px] p-4">
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
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "md:w-[450px] w-[330px] p-4 justify-start text-left font-normal",
                      !classStarts && "text-muted-foreground"
                    )}
                  >
                    <FaHourglassStart className="mr-2 h-4 text-lightGreen w-4" />
                    {classStarts ? (
                      format(classStarts, "PPP")
                    ) : (
                      <span>Class Starts</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full col-span-6 p-0">
                  <Calendar
                    mode="single"
                    selected={classStarts}
                    onSelect={setClassStarts}
                    className="font-subtext"
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "md:w-[450px] w-[330px] p-4 justify-start text-left font-normal",
                      !classEnds && "text-muted-foreground"
                    )}
                  >
                    <FaHourglassEnd className="mr-2 text-lightGreen h-4 w-4" />
                    {classEnds ? (
                      format(classEnds, "PPP")
                    ) : (
                      <span>Class Ends</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full col-span-6 p-0">
                  <Calendar
                    mode="single"
                    selected={classEnds}
                    onSelect={setClassEnds}
                    className="font-subtext"
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="font-bold text-[16px]">Class Schedule</label>
              <div className="grid grid-cols-3 gap-x-1 w-full">
                {Schedules.map((Schedule, index) => (
                  <label
                    onClick={() => handleSchedule(Schedule)}
                    key={index}
                    className="flex justify-between text-[13px] items-center gap-1 my-2 px-2 py-3 outline-none rounded-[8px] bg-white cursor-pointer"
                  >
                    {Schedule}
                    <input
                      type="checkbox"
                      name="schedule"
                      value={schedules}
                      onChange={(e: any) => setSchedules(e.target.value)}
                      //checked={schedules.includes(Schedule)}

                      className="appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-green-600 checked:border-transparent focus:outline-none"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-4  items-center gap-4 w-full">
              <Select value={classTime} onValueChange={setClassTime}>
                <SelectTrigger className="md:w-[450px] w-[330px] p-4">
                  <SelectValue placeholder="Class Timing" />
                </SelectTrigger>

                <SelectContent className=" font-subtext font-medium">
                  <ScrollArea className="h-[250px] w-full ">
                    <SelectGroup>
                      <SelectItem value="first">8AM-10AM</SelectItem>
                      <SelectItem value="second">10AM-12PM</SelectItem>
                      <SelectItem value="third">12PM-2PM</SelectItem>
                      <SelectItem value="fourth">2PM-4PM</SelectItem>
                      <SelectItem value="fifth">4PM-6PM</SelectItem>
                      <SelectItem value="sixth">6PM-8PM</SelectItem>
                      <SelectItem value="seventh">8PM-10PM</SelectItem>
                    </SelectGroup>
                  </ScrollArea>
                </SelectContent>
              </Select>
            </div>

            <div className=" w-full rounded-md h-[60px] font-header border bg-white flex items-center text-black justify-between px-2 ">
              <input
                value={price}
                onChange={(e: any) => setPrice(e.target.value)}
                placeholder="Price"
                className=" w-full text-[14px] text-black bg-transparent focus:outline-none"
              />
              <div className=" w-[50px] cursor-pointer font-bold aspect-square rounded-full flex items-center justify-center">
                <Image
                  src="/usflag.png"
                  alt="usflag"
                  width={100}
                  height={100}
                  className="w-[40px] h-[40px] rounded-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="maxCapacity"
                value={maxCapacity}
                onChange={(e: any) => setMaxCapacity(e.target.value)}
                placeholder="Maximum Capacity"
                className="col-span-6 w-full"
              />
            </div>

            <div className="flex font-subtext flex-col">
              <div className="flex items-center space-x-2">
                <input
                  // value={publicClass}
                  onChange={(e: any) => setPublicClass(e.target.value)}
                  className="w-4 h-4 px-2 accent-lightGreen"
                  type="checkbox"
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Public class
                </label>
              </div>
              <p className="text-[12px] my-3">
                Your class is visible and open to all on the platform
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="w-full py-6 bg-lightGreen hover:bg-green-700"
            >
              Add Classroom
            </Button>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default AddClassroom;
