"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { FaHourglassStart, FaHourglassEnd } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { ScrollArea } from "@/components/ui/scroll-area";
import Grid from "@/components/Grid";
import { ISessionSub } from "./Duration";
import { Controller } from "react-hook-form";
import { format } from "date-fns";

const Scheduling: React.FC<ISessionSub> = ({ register, errors, control }) => {
  return (
    <div className="">
      <div className="flex space-x-32 md:justify-between">
        <h3 className="text-xl font-bold">Book Session</h3>
      </div>
      <ScrollArea className="h-[500px] md:w-full ">
        <div className="flex  mt-2 mb-6  flex-col gap-3">
          <p className=" font-semibold text-lightGreen">Scheduling</p>
          <p className="text-[14px] font-semibold">Confirm Class Schedule</p>
        </div>

        <div className="flex justify-between">
          <div className="flex space-x-2">
            <div>
              <p className="inline text-[12px]">
                <GoDotFill className="inline text-green-400 mr-1" />
                Booked
              </p>
            </div>
            <div>
              <p className="inline text-[12px]">
                <GoDotFill className="inline text-orange-400 mr-1" />
                Not Available
              </p>
            </div>
          </div>
        </div>
        <div className="flex md:flex-row md:space-y-0 flex-col space-y-3 md:space-x-1 py-2">
          <div>
            <Controller
              control={control}
              name="classStarts"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "md:w-[200px] w-[330px] p-4 justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <FaHourglassStart className="mr-2 text-lightGreen h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Class Starts</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full font-header col-span-6 p-0">
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

          <div>
            <Controller
              control={control}
              name="classEnds"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "md:w-[200px] w-[330px] p-4 justify-start text-left font-normal",
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
                  <PopoverContent className="w-full font-header col-span-6 p-0">
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
        </div>

        <Grid />
      </ScrollArea>
    </div>
  );
};

export default Scheduling;
