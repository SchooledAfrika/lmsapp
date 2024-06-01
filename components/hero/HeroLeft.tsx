import Image from "next/image";
import React from "react";
import { IoIosSearch } from "react-icons/io";
import HeroSearch from "./HeroSearch";

const HeroLeft = () => {
  return (
    <div className="font-subtext flex-1 md:pr-5 flex flex-col gap-6">
      <div className=" flex gap-2 items-end">
        <p className=" text-dimYellow font-header text-lg font-bold">
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
        <p className=" text-black text-3xl font-bold">
        Best choice for{" "}
          <span className=" text-green-600">online</span> classes.
        </p>
      </div>
      <div>
        <p>
        Let's be a part of your child's academic success, empower them with the best tools for a great
        future, build their confidence,and encourage learning in a seamless and convenient way.
        </p>
      </div>
      <div>
        <HeroSearch />
      </div>
    </div>
  );
};

export default HeroLeft;
