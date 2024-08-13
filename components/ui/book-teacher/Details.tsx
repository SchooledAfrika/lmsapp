import React from 'react';
import Image from "next/image";
import CountryList from 'country-list';
import {
  UseFormClearErrors,
  UseFormRegister,
  FieldErrors,
  Control,
  Controller,
  UseFormWatch,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";
import { Isession } from "@/components/BookSession";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { IoLanguage } from "react-icons/io5";
import { GiEmptyHourglass } from "react-icons/gi";





export interface ISessionSub {
  register: UseFormRegister<Isession>;
  errors: FieldErrors<Isession>;
  control?: Control<Isession>;
  clearErrors: UseFormClearErrors<Isession>;
  watch: UseFormWatch<Isession>;
  setValue: UseFormSetValue<Isession>;
 
  
 
}

const countries = CountryList.getData();

// console.log(countries)


const Details: React.FC<ISessionSub> = ({
  register,
  errors,
  control,
  watch,
  clearErrors,
}) => {
 

  return (
   
    <div className="">
      <h3 className="text-xl font-bold">Book Session</h3>

      <div className="flex  mx-auto mt-8 mb-20 flex-col gap-3">
        <p className="text-lightGreen text-[15px] md:ml-8 font-semibold">
          Personal Details
        </p>
        <p className="text-[14px] md:ml-8 font-semibold">
          Please enter your details, to help us attend to you better.
        </p>
        <div className="border md:ml-8  justify-between px-3 flex flex-col py-4  rounded-md ">
         
        <p className='font-bold text-[14px] mb-1'>Full Name</p>
           
              <input
                {...register("name")}
                type="text"
                className="py-3 px-6 text-black rounded-md border text-[13px] w-full "
                placeholder="Full Name"
               
              />
              {errors.name && (
                <small className="text-red-600">
                  {errors.name.message}
                </small>
              )}
           
        
        </div>
        <div className="border md:ml-8  justify-between px-3 flex flex-col py-4  rounded-md ">
          <p className='font-bold text-[14px] mb-1'>Country</p>
           <Controller
                  control={control}
                  name="country"
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        clearErrors("country");
                      }}
                    >
                      <SelectTrigger className=" w-full py-6">
                        <SelectValue placeholder="Select Country" className='text-[12px]' />
                      </SelectTrigger>

                      <SelectContent className=" font-subtext font-medium">
                        <ScrollArea className="h-[300px] w-full ">
                          <SelectGroup>
                            {countries.map((country) => (
                              <SelectItem key={country.code} value={country.name}>
                                {country.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.country && (
                  <small className="text-red-600">
                    {errors.country.message}
                  </small>
                )}
                </div>

        <div className="border md:ml-8  justify-between px-3 flex flex-col py-4  rounded-md ">
        <p className='font-bold text-[14px] mb-1'>Email</p>
         
              <input
                {...register("email")}
                type="text"
                className="py-3 px-6 text-black rounded-md border text-[13px] w-full "
                placeholder="Email Address"
               
              />
              {errors.email && (
                <small className="text-red-600">
                  {errors.email.message}
                </small>
              )}
           
        </div>
      </div>
    </div>
   
  );
};
export default Details;
