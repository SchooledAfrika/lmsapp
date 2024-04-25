"use client";
import { Classes } from "@/constants/index";
import { useState } from "react";
import { motion } from "framer-motion";
import background from "@/images/bg-img.jpeg";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import Container from "./Container";

interface Props {
  className: string;
  classes: string;
  tutor: string;
  rating: string;
  pricing: string;
  subject: string;
  icon?: string;
  timing?: string;
  index: number;
}

const PopularClassesCard = ({
  className,
  classes,
  tutor,
  rating,
  pricing,
  subject,
  icon,
  timing,
}: Props) => {
  return (
    <div className="w-full   overflow-hidden      font-subtext rounded-lg card flex flex-col justify-center gap-6 hover:-translate-y-2 transition-transform duration-300 group">
      <div className="relative text-white">
        <Image
          className="w-full h-full object-cover"
          src={"/bg-img.jpeg"}
          alt="background"
          width={200}
          height={200}
        />
        <div className="flex flex-col">
          <div>
            <p className="absolute  top-2 left-24 text-slate-300 ">
              Class Name
            </p>
            <p className="absolute  top-8 left-24 ">{className}</p>
          </div>
          <div>
            <p className="absolute  top-16 left-24 text-slate-300 ">Class</p>
            <p className="absolute  top-20 left-24 ">{classes}</p>
          </div>
        </div>

        <button className=" bg-dimOrange absolute -translate-y-1/2 left-3 rounded-xl text-white text-base  px-3 w-28  py-2 text-center lg:block">
          Enrol Now!
        </button>
      </div>

     

      <div className="flex flex-col mb-10 justify-center mx-4 "> 
      <p className="text-right mr-6 font-bold text-lightGreen">{pricing}</p>
        <div className="my-1">
          <span className="text-base text-slate-600">Tutor</span>
          <p className="font-semibold">
            {tutor} {rating}
          </p>
        </div>
        <div className="flex my-2 ">
          <p>{subject}</p>
          <Image
            src={`${icon}`}
            alt=""
            width={20}
            height={20}
            className="w-[20px] ml-2"
          />
        </div>
        <div>
          <p>{timing}</p>
        </div>
      </div>
    </div>
  );
};


const PopularClasses = () => {
  return (
    <Container>
      <div className="max-w-full  mx-auto px-4 pt-16 pb-6">
        
        <div className="grid  grid-cols-1 xs:grid-cols-2 md:grid-cols-3 items-center xl:grid-cols-3 gap-6  lgl:px-10">
          {Classes.map((Class, index) => (
            <PopularClassesCard key={Class.id} {...Class} index={index} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default PopularClasses;
