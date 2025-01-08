import Image from "next/image";
import React from "react";
import { IoIosSearch } from "react-icons/io";
import HeroSearch from "./HeroSearch";

const HeroLeft = () => {
  return (
    <div className="font-subtext flex-1 md:pr-5 flex flex-col gap-4">
      <div className=" flex gap-2 items-end">
        <p className=" text-dimYellow font-header text-lg font-bold">
        26,000+ TUTORING SESSIONS AND COUNTING!
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
        Get The Right{" "}
          <span className=" text-green-600">Tutor</span> For Your Child.
        </p>
      </div>
      <div>
        <p>
        A personalized tutoring solution to fit your child's academic needs - anytime, anywhere.
        
        </p>
        
      </div>
      <div>
        <HeroSearch />
      </div>
    </div>
  );
};

export default HeroLeft;
