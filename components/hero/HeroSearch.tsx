"use client";
import React from "react";
import { IoIosSearch } from "react-icons/io";

const HeroSearch = () => {
  return (
    <div className=" w-full h-[60px] bg-white rounded-[50px] flex items-center justify-between px-2 shadow-md">
      <input
        placeholder="search tutor, classes, vacancies"
        className=" w-10/12 bg-transparent focus:outline-none"
      />
      <div className=" w-[50px] cursor-pointer font-bold aspect-square rounded-full flex items-center justify-center bg-orange-500 text-white">
        <IoIosSearch />
      </div>
    </div>
  );
};

export default HeroSearch;
