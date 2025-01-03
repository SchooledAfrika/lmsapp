"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { yearList, MonthLists } from "@/constants/constants/constant";

interface ImonthInfo {
  name: string;
  value: number;
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
  useEffect(() => {
    calculateDaysInMonth();
  }, [selectedMonth, selectedYear]);
  const calculateDaysInMonth = () => {
    const date = new Date(Number(selectedYear), selectedMonth.value + 1, 0);
    console.log(date); // 0 gets the last day of the previous month
    const days = Array.from({ length: date.getDate() }, (_, i) => i + 1);
    setDaysInMonth(days);
  };
  return (
    <div className=" w-full overflow-scroll">
      {daysInMonth.map((item, index) => (
        <p key={index}> {item}</p>
      ))}
    </div>
  );
};

// main attendance component
const Attendance = () => {
  const { id } = useParams();
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
