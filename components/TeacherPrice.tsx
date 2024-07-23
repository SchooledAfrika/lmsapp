import React from "react";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";
import { IteacherOneOnOneSub } from "./TeacherProfileData";

const TeacherPrice: React.FC<IteacherOneOnOneSub> = ({
  errors,
  watch,
  register,
  control,
  clearErrors,
}) => {
  watch("minPrice");
  watch("maxPrice");
  watch("duration");
  watch("startTime");
  return (
    <section>
      <div className="flex flex-col mb-[30px] w-full">
        <p className="font-bold text-[18px]">Session Pricing (Per Hour)</p>
        <span className="text-[14px] w-full md:w-[50%] font-medium py-2">
          Please note that the minimum duration for a session is 45 minutes and
          the maximum duration is 2 hours. Your price range should account for
          that.
        </span>
        <div className="flex justify-between items-center my-2 p-4  w-full md:w-[50%] outline-none rounded-[8px] bg-white">
          <input
            type="text"
            {...register("minPrice")}
            name="minPice"
            placeholder="$10 - $15"
            className="outline-none w-full"
          />
          <div className="flex items-center gap-1">
            <Image src="/svgs/usaLogo.svg" width={18} height={18} alt="Lock" />
            <span className="font-bold text-[16px]">USD</span>
          </div>
        </div>
        {errors.minPrice && (
          <small className="text-red-600">{errors.minPrice.message}</small>
        )}
        <div className="flex justify-between items-center my-2 p-4  w-full md:w-[50%] outline-none rounded-[8px] bg-white">
          <input
            type="text"
            {...register("maxPrice")}
            name="maxPrice"
            placeholder="$8 - $12"
            className="outline-none w-full"
          />
          <div className="flex items-center gap-1">
            <Image src="/svgs/usaLogo.svg" width={18} height={18} alt="Lock" />
            <span className="font-bold text-[16px]">USD</span>
          </div>
        </div>
        {errors.maxPrice && (
          <small className="text-red-600">{errors.maxPrice.message}</small>
        )}
        <div className="flex justify-between items-center my-2 p-4  w-full md:w-[50%] outline-none rounded-[8px] bg-white">
          <input
            type="text"
            {...register("duration")}
            name="duration"
            placeholder="Duration"
            className="outline-none w-full"
          />
        </div>
        {errors.duration && (
          <small className="text-red-600">{errors.duration.message}</small>
        )}
        <div className="flex justify-between items-center my-2 p-4  w-full md:w-[50%] outline-none rounded-[8px] bg-white">
          <input
            type="text"
            {...register("startTime")}
            name="startTime"
            placeholder="Start Time"
            className="outline-none w-full"
          />
        </div>
        {errors.startTime && (
          <small className="text-red-600">{errors.startTime.message}</small>
        )}
      </div>
    </section>
  );
};

export default TeacherPrice;
