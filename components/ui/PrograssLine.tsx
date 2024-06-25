"use client";
import React, { useState } from "react";
import { IprogressType } from "@/constants/completeReg";

interface IformArrays {
  formArrays: IprogressType[];
  currentPage: number;
  setcurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
const ProgressLine = ({
  formArrays,
  currentPage,
  setcurrentPage,
}: IformArrays) => {
  const handleUpdateForm = (goTOpage: number) => {
    setcurrentPage(goTOpage);
  };
  return (
    <div className="flex flex-col ml-[0] md:ml-[40px] mb-[50px]">
      {formArrays.map((item, index) => (
        <div key={index} className=" flex flex-col">
          <div
            onClick={() => handleUpdateForm(index + 1)}
            className=" flex gap-3 items-center cursor-pointer"
          >
            <div
              className={` w-6 aspect-square rounded-full  ${
                index + 1 <= currentPage
                  ? "bg-[#359C71] text-white"
                  : " bg-[#E9ECEB] text-white"
              } flex items-center justify-center`}
            >
              {index + 1}
            </div>
            <p
              className={` text-sm ${
                index + 1 <= currentPage ? "text-[#359C71]" : " text-black"
              }`}
            >
              {item.name}
            </p>
          </div>
          {index + 1 < formArrays.length && (
            <div
              className={` w-1 h-[40px] md:h-[80px] border ${
                currentPage > index + 1 ? " bg-[#359C71]" : "bg-[#E9ECEB]"
              } ml-3 transform -translate-x-1/2`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressLine;
