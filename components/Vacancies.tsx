import React from "react";
import Header from "./Header";
import { IoIosSearch } from "react-icons/io";
import Cards from "./Cards";
import CardsActive from "./CardsActive";


const Vacancies = () => {
  return (
    <div className="bg-stone-100 font-subtext">
      <Header />
      <h2 className="font-bold font-subtext my-20 text-2xl text-center">
        Job Listing
      </h2>
      <div className=" md:w-4/5 w-[90%] mt-16 md:mt-6 mx-auto  cursor-pointer font-header  h-[100px] md:mx-auto bg-white rounded-[50px] flex items-center justify-center p-6 shadow-md">
        <div className="relative   overflow-hidden flex md:w-1/3 w-full  flex-col   mr-2 justify-center items-start md:border-r-2 leading-[90px]">
          <label className="ml-3 font-bold  absolute -top-4   ">SEARCH</label>

          <input
            placeholder="By class, Course, School"
            className="bg-transparent    ml-2 mt-3   focus:outline-none"
          />
        </div>

        <div className="relative hidden    overflow-hidden md:flex w-1/4  flex-col   mr-2 justify-center items-start border-r-2 leading-[90px]">
          <label className="ml-3 font-bold  absolute -top-4   ">
            EXPERIENCE LEVEL
          </label>

          <input
            placeholder="Years of Experience"
            className="bg-transparent   ml-2 mt-3   focus:outline-none"
          />
        </div>
        <div className="relative hidden   overflow-hidden md:flex w-1/4  flex-col   mr-2 justify-center items-start border-r-2 leading-[90px]">
          <label className="ml-3 font-bold  absolute -top-4   ">LOCATION</label>

          <input
            placeholder="Search by Location"
            className="bg-transparent   ml-2 mt-3   focus:outline-none"
          />
        </div>
        <div className="relative hidden   overflow-hidden md:flex w-1/3  flex-col   mr-2 justify-center items-start leading-[100px]">
          <label className="ml-3 font-bold  absolute -top-4   ">
            PRICE RANGE
          </label>

          <input
            placeholder="0-100,000"
            className="bg-transparent   ml-2 mt-3   focus:outline-none"
          />
        </div>

        <div className=" md:w-[80px] w-[60px] font-bold aspect-square rounded-full flex items-center md:justify-center justify-end bg-lightGreen text-white">
          <IoIosSearch className="font-bold text-2xl md:mr-0 md:text-xl mr-3" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Cards/>
        <CardsActive/>
      
      </div>
      
      
    </div>
  );
};

export default Vacancies;
