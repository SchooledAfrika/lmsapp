"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { yearList, MonthLists } from "@/constants/constants/constant";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GoDash } from "react-icons/go";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useConversion } from "@/data-access/conversion";

interface ImonthInfo {
  name: string;
  value: number;
}

interface IsingleAttendance {
  name: string;
  id: string;
  duration: number;
  held: boolean;
  classday: string;
}

interface IAttendance {
  name: string;
  items: IsingleAttendance[];
}
const ChangeDate: React.FC<{
  selectedYear: string;
  selectedMonth: ImonthInfo;
  setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<ImonthInfo>>;
}> = ({ selectedMonth, selectedYear, setSelectedMonth, setSelectedYear }) => {
  return (
    <div className=" flex w-full items-center justify-end">
      <div className=" px-4 py-2 border rounded-sm flex  gap-3">
        {/* select for the year */}
        <select
          onChange={(e) => setSelectedYear(e.target.value)}
          className=" px-2 cursor-pointer"
        >
          {yearList.map((item, index) => (
            <option selected={selectedYear === item} key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        {/* select for the month */}
        <select
          onChange={(e) => {
            const selectedMonth = MonthLists.find(
              (item) => item.value === Number(e.target.value)
            );
            setSelectedMonth(selectedMonth as ImonthInfo);
          }}
          className=" px-2 cursor-pointer"
        >
          {MonthLists.map((item, index) => (
            <option
              selected={selectedMonth.name === item.name}
              key={index}
              value={item.value}
            >
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

// component to render the Attendance table below
const AttendanceTable: React.FC<{
  selectedMonth: ImonthInfo;
  selectedYear: string;
}> = ({ selectedMonth, selectedYear }) => {
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);
  const { makeSubstring } = useConversion();
  const { id } = useParams();
  useEffect(() => {
    calculateDaysInMonth();
  }, [selectedMonth, selectedYear]);
  // function to calculate the days in the selected month
  const calculateDaysInMonth = () => {
    const date = new Date(Number(selectedYear), selectedMonth.value + 1, 0);
    // 0 gets the last day of the previous month
    const days = Array.from({ length: date.getDate() }, (_, i) => i + 1);
    setDaysInMonth(days);
  };
  // now we fetch the attendance from database
  const { data, isLoading, isError, error } = useQuery<IAttendance[]>({
    queryKey: ["attendance", selectedMonth, selectedYear],
    queryFn: async () => {
      const response = await fetch(
        `/api/attendance/${id}?year=${selectedYear}&month=${selectedMonth.value}`
      );
      const result = await response.json();
      return result;
    },
  });
  // function to return the short name of the week of the selected date
  const getShortName = (day: number) => {
    const date = new Date(Number(selectedYear), selectedMonth.value, day);
    const shortName = date.toLocaleDateString("en-US", { weekday: "short" });
    return shortName;
  };
  // function to calculate the total hour for each student
  const calcTotalHours = (info: IsingleAttendance[]): number => {
    const total = info.reduce((acc, val) => {
      return acc + val.duration;
    }, 0);
    return total;
  };
  // function to calculate if the day has passed
  // this will help to differentiate message rendered for passed day and future days
  const passedDay = (): number => {
    const date = new Date();
    const day = date.getDate();
    const year = date.getFullYear().toString();
    // if the year selected is not the present year, then lets return 31
    // this will help for other years
    if (selectedYear !== year) {
      return 32;
    }
    return day;
  };
  const totalHours = (): number => {
    const mappedAttendance = data?.map((item) => item.items).flat();
    const total = mappedAttendance!.reduce((acc, val) => {
      return acc + val.duration;
    }, 0);
    return total;
  };
  if (isLoading) {
    return (
      <div className=" fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-50 z-50">
        <CircularProgress size={80} color="success" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="">
        {data?.length === 0 ? (
          <div className=" w-full flex items-center justify-center">
            <Image
              src={"/no-class.webp"}
              alt="no class"
              width={200}
              height={200}
              priority
              className="  w-full md:w-1/3 rounded-md"
            />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Names</TableHead>
                {daysInMonth.map((days) => (
                  <TableHead>
                    <div className="flex flex-col items-center gap-1 text-slate-600 font-semibold">
                      <p>{days}</p>
                      <p>{getShortName(days)}</p>
                    </div>
                  </TableHead>
                ))}
                <TableHead>Total hours</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((attendance, index) => (
                <TableRow key={index}>
                  <TableCell className="md:w-[250px] w-[150px] whitespace-nowrap overflow-hidden text-ellipsis">
                    {makeSubstring(attendance.name, 15)}
                  </TableCell>
                  {daysInMonth.map((day) => {
                    const itemPerDay = attendance.items.find(
                      (item) => new Date(item.classday).getDate() === day
                    );
                    return (
                      <TableCell key={day}>
                        {itemPerDay ? (
                          <p
                            className={`${
                              itemPerDay.held
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {itemPerDay.held ? itemPerDay.duration : "absent"}
                          </p>
                        ) : (
                          <div>
                            {
                              // if the day has passed, we render the message below
                              day < passedDay() ? (
                                <GoDash />
                              ) : (
                                <p className=" text-slate-500">waiting</p>
                              )
                            }
                          </div>
                        )}
                      </TableCell>
                    );
                  })}
                  <TableCell className=" text-green-800 font-semibold">
                    {calcTotalHours(attendance.items)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      <div className=" w-full flex items-center justify-center">
        {data?.length !== 0 && (
          <p className=" text-green-800 text-[20px] font-bold ">
            Total: {totalHours()}
            {totalHours() > 1 ? " hours" : " hour"}
          </p>
        )}
      </div>
    </div>
  );
};

// main attendance component
const Attendance = () => {
  const [selectedYear, setSelectedYear] = useState<string>(() => {
    const date = new Date();
    return date.getFullYear().toString();
  });
  const [selectedMonth, setSelectedMonth] = useState<ImonthInfo>(() => {
    const date = new Date();
    // getting the value of the particular month
    const monthIndex = date.getMonth();
    // getting the fullname of the month below
    const monthName = date.toLocaleDateString("en-US", { month: "long" });
    return { name: monthName, value: monthIndex };
  });

  return (
    <div className=" flex flex-col gap-4 mt-4">
      <div className=" w-full flex items-center justify-center">
        <p className=" text-[20px] font-bold text-slate-600">
          Attendance marked
        </p>
      </div>
      <ChangeDate
        setSelectedYear={setSelectedYear}
        setSelectedMonth={setSelectedMonth}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
      />
      <AttendanceTable
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />
    </div>
  );
};

export default Attendance;

/*
<div className="w-full flex items-center justify-center">
      <div className=" w-3/4 overflow-x-auto flex gap-1">
        {daysInMonth.map((item, index) => (
          <div className="flex flex-col items-center gap-1" key={index}>
            <p>{getShortName(item)}</p>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
*/
