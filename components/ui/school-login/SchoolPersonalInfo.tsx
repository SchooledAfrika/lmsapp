import React, { useState } from "react";
import Image from "next/image";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ISchoolSub } from "./SchoolInfo";

const SchoolPersonalInfo: React.FC<ISchoolSub> = ({
  register,
  errors,
  watch,
  clearErrors,
}) => {
  const [tickBox, setTickBox] = useState(true);

  const handleTickedBox = () => {
    setTickBox(false);
  };
  // here we watch all the inputs
  watch("homeAddress");
  watch("ownerName");
  watch("phoneNo");
  return (
    <div className="flex flex-col w-full md:w-[55%] gap-2">
      <label className="font-bold text-[18px]">Personal Information</label>
      <input
        {...register("ownerName")}
        type="text"
        name="ownerName"
        placeholder="Full Name"
        className=" p-4 outline-none rounded-[8px] w-full bg-white"
        onChange={() => clearErrors("ownerName")}
      />
      {errors.ownerName && (
        <small className=" text-red-600">{errors.ownerName.message}</small>
      )}
      <input
        {...register("phoneNo")}
        type="text"
        name="phoneNo"
        placeholder="Phone Number"
        className=" p-4 outline-none rounded-[8px] w-full bg-white"
        onChange={() => clearErrors("phoneNo")}
      />
      {errors.phoneNo && (
        <small className=" text-red-600">{errors.phoneNo.message}</small>
      )}
      <input
        {...register("homeAddress")}
        type="text"
        name="homeAddress"
        placeholder="Permanent House Address"
        className=" p-4 outline-none rounded-[8px] w-full bg-white"
        onChange={() => clearErrors("homeAddress")}
      />
      {errors.homeAddress && (
        <small className=" text-red-600">{errors.homeAddress.message}</small>
      )}
      <div
        onClick={handleTickedBox}
        className="flex items-center gap-2 font-bold text-[13px] py-4 cursor-pointer"
      >
        {tickBox ? (
          <Image src="/svgs/tick.svg" alt="Tick" width={15} height={15} />
        ) : (
          <Image
            src="/svgs/colored-tick.svg"
            alt="error"
            width={15}
            height={15}
          />
        )}
        Accept Schooled Afrika{" "}
        <Link
          href={"/school-terms-and-conditions"}
          className="underline text-[#359C71]"
        >
          Terms & Condition
        </Link>
      </div>
    </div>
  );
};
export default SchoolPersonalInfo;
