import Image from "next/image";
import React from "react";
import { IoIosSearch } from "react-icons/io";
import HeroSearch from "./HeroSearch";

const HeroLeft = () => {
  return (
    <div className=" flex-1 md:pr-5 flex flex-col gap-6">
      <div className=" flex gap-2 items-end">
        <p className=" text-dimYellow text-lg font-bold">
          Introducing Schooled Afrika
        </p>
        <Image
          className=" w-16"
          src={"/intro-img.gif"}
          alt="intro-gif"
          width={20}
          height={20}
          unoptimized={true}
        />
      </div>
      <div>
        <p className=" text-black text-3xl font-semibold">
          Get the best Education & secure a{" "}
          <span className=" text-green-600">Better Future</span> for your kids
        </p>
      </div>
      <div>
        <p>
          Empower your childs journey with our comprehensive education solution,
          noturing their potential every step of the way, Together lets build a
          foundation for life long success
        </p>
      </div>
      <div>
        <HeroSearch />
      </div>
    </div>
  );
};

export default HeroLeft;
