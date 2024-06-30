import Image from "next/image";
import {
  UseFormClearErrors,
  UseFormRegister,
  FieldErrors,
  Control,
  Controller,
  UseFormWatch,
} from "react-hook-form";
import { Isession } from "@/components/BookSession";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { IoLanguage } from "react-icons/io5";
import { GiEmptyHourglass } from "react-icons/gi";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface ISessionSub {
  register: UseFormRegister<Isession>;
  errors: FieldErrors<Isession>;
  control?: Control<Isession>;
 
}

const Duration: React.FC<ISessionSub> = ({
  register,
  errors,
  control,
}) => {
 

  return (
   
    <div className="">
      <h3 className="text-xl font-bold">Book Session</h3>

      <div className="flex  mx-auto mt-8 mb-20 flex-col gap-3">
        <p className="text-lightGreen text-[15px] ml-8 font-semibold">
          Language & Duration
        </p>
        <p className="text-[14px] ml-8 font-semibold">
          Confirm the teacher&apos;s language of choice <br /> and select the
          session duration.
        </p>
        <div className="border ml-8  justify-between px-3 flex py-4  rounded-md ">
          <div className="flex space-x-4">
            <IoLanguage className="text-2xl" />
            <div className="flex space-y-2 flex-col">
              <p className="font-semibold">Language</p>
              <input
                {...register("language")}
                type="text"
                className="py-2 px-6 text-black rounded-md border text-[13px] w-full "
                placeholder="English"
               
              />
              {errors.language && (
                <small className="text-red-600">
                  {errors.language.message}
                </small>
              )}
            </div>
          </div>
        </div>

        <div className="border ml-8  justify-between px-3 flex py-4  rounded-md ">
          <div className="flex space-x-4">
            <GiEmptyHourglass className="text-2xl" />
            <div className="flex space-y-2 flex-col">
              <p className="text-[13px]">Duration</p>
              <input
                {...register("duration")}
                type="text"
                className="py-2 px-6 text-black rounded-md border text-[13px] w-full "
                placeholder="In minutes or hours"
               
              />
              {errors.duration && (
                <small className="text-red-600">
                  {errors.duration.message}
                </small>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
   
  );
};
export default Duration;
