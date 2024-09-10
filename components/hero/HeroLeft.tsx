import Image from "next/image";
import React from "react";
import { IoIosSearch } from "react-icons/io";
import HeroSearch from "./HeroSearch";

const HeroLeft = () => {
  return (
    <div className="font-subtext flex-1 md:pr-5 flex flex-col gap-6">
      <div className=" flex gap-2 items-end">
        <p className=" text-dimYellow font-header text-lg font-bold">
          TRUSTED BY 2000+ PARENTS
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
          We help you find the perfect tutor that your child needs.
        
        </p>
        <p>
          Get Personalized home tutoring that is designed to guide your children towards exam success, boost their confidence, and get better school grades.
        
        </p>
      </div>
      <div>
        <HeroSearch />
      </div>
    </div>
  );
};

export default HeroLeft;
