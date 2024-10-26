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
import { ISessionSub } from "./ChildDetails";
import { Controller } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { useConversion } from "@/data-access/conversion";
import { toast } from "react-toastify";
import { MultipleSelect } from "./StudentBookDetails";

interface SessionTypes {
  id: number;
  sessionName: string;
  price: number;
  billingCycle: string;
}

interface Ihours {
  dNumber: number;
  dString: string;
}
const Days = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];
const HoursByDay: Ihours[] = [
  { dNumber: 0.5, dString: "30mins" },
  { dNumber: 1.0, dString: "1hr" },
  { dNumber: 1.5, dString: "1hr:30mins" },
  { dNumber: 2.0, dString: "2hrs" },
];

const StudentBookSchedule: React.FC<ISessionSub> = ({
  register,
  errors,
  control,
  watch,
  clearErrors,
  setValue,
  setTotalAmt,
  totalAmt,
  getValues,
}) => {
  const SessionTypes: string[] = ["Homework Support", "Private Session"];

  const [days, setDays] = React.useState<string[]>([]);
  const [sessionTypes, setSessionTypes] = React.useState<string>("");
  const { totalSessionPayment } = useConversion();
  const [duration, setduration] = React.useState<string>("");
  const [hours, sethours] = React.useState<string>();
  const [shour, setshour] = React.useState<number>(1);
  React.useEffect(() => {
    setValue("hours", 1);
    setValue("length", "monthly");
  }, []);
  React.useEffect(() => {
    function setInitailHourValue() {
      if (!getValues("hours") && !getValues("sessionTypes")) {
        console.log("first time hit");
        return setValue("hours", 1);
      } else if (
        getValues("hours") &&
        getValues("sessionTypes") === "Homework Support"
      ) {
        console.log("this is the second hit now");
        setshour(1);
        return setValue("hours", 1);
      } else {
        return;
      }
    }
    setInitailHourValue();
  }, [getValues("sessionTypes")]);
  // Handle session selection
  const handleSessionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sessionType = event.target.value;
    setSessionTypes(sessionType);
    setValue("sessionTypes", sessionType);
    // here we set the initial price based on the type of session selected
    if (sessionType == "Private Session") {
      setTotalAmt && setTotalAmt(6);
    } else {
      setTotalAmt && setTotalAmt(12);
    }
  };

  // Handle hours change
  const handleHoursChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newHour = Number(event.target.value);
    setshour(newHour);
    setValue("hours", newHour);
    setTotalAmt && setTotalAmt((prev) => prev! * newHour);
  };

  // this function below handle session selection
  const handleDays = (item: string) => {
    // checking if the preference is already in the array
    // if there remove, else add it
    let arrayInstance = [...days];
    const checkDays = arrayInstance.find((value) => value === item);
    if (checkDays) {
      const removedDays = arrayInstance.filter((value) => value !== item);
      arrayInstance = [...removedDays];
      setDays(removedDays);
      setValue("days", arrayInstance);
      clearErrors("days");
    } else {
      if (arrayInstance.length === 5)
        return toast.error("Maximum of 5 days is allowed");
      arrayInstance.push(item);
      setDays(arrayInstance);
      setValue("days", arrayInstance);
      clearErrors("days");
    }
  };

  return (
    <div className="">
      <div className="flex space-x-32 md:justify-between">
        <h3 className="text-xl font-bold">Book Session</h3>
      </div>
      <ScrollArea className="min-h-[500px] md:w-full ">
        <div className="flex  mt-2 mb-6  flex-col gap-3">
          <p className=" font-semibold text-lightGreen">Scheduling</p>
          <p className="text-[14px] font-semibold">Confirm Class Schedule</p>
        </div>

        <div className="border  px-3  py-2 mt-6  rounded-md gap-[10px]">
          <label className="font-bold text-[16px]">Select Day(s)</label>
          {/* this is for selecting the days for classes */}
          <MultipleSelect
            selectedItem={days}
            handleSelectedItem={handleDays}
            itemList={Days}
            placeholder="Class Days"
          />
          {errors.days && (
            <small className=" text-red-600">{errors.days.message}</small>
          )}
        </div>

        {/* Session selection */}
        <div className="w-full border  px-3  py-2  rounded-md">
          <label htmlFor="sessionType" className="font-bold text-[16px]">
            Select Session:
          </label>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-x-2 w-full  gap-[10px]">
            <div>
              <select
                id="sessionTypes"
                name="sessionTypes"
                className="p-3 w-full font-medium rounded-md text-[14px]"
                onChange={handleSessionChange}
              >
                <option value="" selected disabled>
                  Select a Session
                </option>
                {SessionTypes.map((sessionType, index) => (
                  <option key={index} value={sessionType}>
                    {sessionType}
                  </option>
                ))}
              </select>
              {/* {console.log(sessionTypes)} */}
              {errors.sessionTypes && (
                <small className="text-red-600">
                  {errors.sessionTypes.message}
                </small>
              )}
            </div>
            {/* Billing period selection */}
            <div className="bg-white flex flex-col gap-1  rounded-md text-[14px] font-medium  pl-3 ">
              <select
                id="length"
                name="length"
                className="p-3 font-medium rounded-md text-[14px]"
                onChange={(e) => {
                  setValue("length", e.target.value);
                  setduration(e.target.value);
                }}
                defaultValue={"monthly"}
              >
                <option value="" selected disabled>
                  Billing period
                </option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
              {errors.length && (
                <small className="text-red-600">{errors.length.message}</small>
              )}
            </div>
            {/* handleHoursChange hours */}
            {/* Hours input */}
            {sessionTypes === "Private Session" && (
              <div className=" flex flex-col gap-1">
                <select
                  id="hours"
                  name="hours"
                  className="p-3 w-full font-medium rounded-md text-[14px]"
                  onChange={(e) => {
                    handleHoursChange(e);
                    sethours(e.target.value);
                  }}
                  defaultValue={1}
                >
                  <option value="" selected disabled>
                    Select hours per day
                  </option>
                  {HoursByDay.map((item, index) => (
                    <option value={item.dNumber} key={index}>
                      {item.dString}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        <div className="flex  border   justify-between px-3  py-2  rounded-md gap-[10px]">
          <Controller
            control={control}
            name="times"
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  clearErrors("times");
                }}
              >
                <SelectTrigger className=" w-full py-6">
                  <SelectValue placeholder="From what time?" />
                </SelectTrigger>

                <SelectContent className=" font-subtext font-medium">
                  <ScrollArea className="h-[200px] w-full ">
                    <SelectGroup>
                      <SelectItem value="one">1:00</SelectItem>
                      <SelectItem value="two">2:00</SelectItem>
                      <SelectItem value="three">3:00</SelectItem>
                      <SelectItem value="four">4:00</SelectItem>
                      <SelectItem value="five">5:00</SelectItem>
                      <SelectItem value="six">6:00</SelectItem>
                      <SelectItem value="seven">7:00</SelectItem>
                      <SelectItem value="eight">8:00</SelectItem>
                      <SelectItem value="nine">9:00</SelectItem>
                      <SelectItem value="ten">10:00</SelectItem>
                      <SelectItem value="eleven">11:00</SelectItem>
                      <SelectItem value="twelve">12:00</SelectItem>
                      <SelectItem value="thirteen">13:00</SelectItem>
                      <SelectItem value="fourteen">14:00</SelectItem>
                      <SelectItem value="fifteen">15:00</SelectItem>
                      <SelectItem value="sixteen">16:00</SelectItem>
                      <SelectItem value="seventeen">17:00</SelectItem>
                      <SelectItem value="eighteen">18:00</SelectItem>
                      <SelectItem value="nineteen">19:00</SelectItem>
                      <SelectItem value="twenty">20:00</SelectItem>
                    </SelectGroup>
                  </ScrollArea>
                </SelectContent>
              </Select>
            )}
          />

          {errors.times && (
            <small className="text-red-600">{errors.times.message}</small>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2  border px-3  py-2  rounded-md gap-[10px]">
          <Controller
            control={control}
            name="classStarts"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full p-4 py-6 justify-start text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <FaHourglassStart className="mr-2 h-4 text-lightGreen w-4" />
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>When do you want to begin?</span>
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
        {/* Display price */}
        {getValues("sessionTypes") && getValues("length") && (
          <div>
            <div className="my-2 font-semibold text-center text-[14px]">
              <h2 className=" font-bold text-[22px]">
                Total Price:{" "}
                <span className=" text-green-800">
                  $
                  {totalSessionPayment(
                    getValues("days"),
                    getValues("length"),
                    getValues("hours"),
                    getValues("sessionTypes")
                  ).toFixed(2)}
                </span>{" "}
              </h2>
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default StudentBookSchedule;
