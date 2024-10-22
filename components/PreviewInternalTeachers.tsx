"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { internalTeachers } from "@/constants/index";
import Image from "next/image";
import Container from "./Container";
import { Button } from "./ui/button";
import Link from "next/link";


const PreviewInternalTeachers = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1540,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
 

  return (
    <Container>
      <div className="max-w-full font-header mx-auto px-4 py-24 mb-12">
        <div className="w-full flex flex-col items-center">
          <h2 className="text-2xl font-header text-lightGreen font-bold">
            {" "}
            <span className="hidden  md:inline-flex w-20 md:w-60 mb-2 py-[.5px]  lgl:w-72 h-[.5px] bg-lightGreen mr-6"></span>
            Our Teachers{" "}
            <span className="hidden md:inline-flex mb-2 w-20 py-[.5px] md:w-60 lgl:w-72 h-[.5px] bg-lightGreen ml-6"></span>
          </h2>
        </div>
      <div className="slider-container">
      <Slider {...settings} >
      {internalTeachers.map((teacher, index) => (
        <div key={teacher.id || index} className="card-container p-[16px]">
          <div className="card h-[350px] rounded-[32px] relative overflow-hidden">
            <div className="details z-[1] absolute bottom-0 p-[16px] w-full text-[14px] text-white">
            <div className="px-4 font-bold w-full text-center text-[16px] py-2 rounded-md bg-[rgba(0,0,0,0.6)] text-white">{teacher.name}</div>
            <div className="px-2 mt-2 font-semibold w-full  text-[14px] py-2 rounded-md bg-[rgba(0,0,0,0.6)] text-white">{teacher.subject}</div>
            <div className="chips flex justify-between">
              <div className="chip px-2 mt-2 font-medium   text-[13px] py-2 rounded-md bg-[rgba(0,0,0,0.6)] text-white">{teacher.grades}</div>
              <div className="chip px-2 mt-2 font-medium  text-[13px] py-2 rounded-md bg-[rgba(0,0,0,0.6)] text-white">{teacher.duration}</div>
             
            </div>
            <Button asChild className="my-3 bg-dimOrange w-full">
              <Link href="/find-tutors">Book Teacher</Link>
            </Button>
            </div>
            <Image src={teacher.icon} alt={`${teacher.name}`} fill className="object-cover w-[300px] h-[300px]" />
          </div>
        </div>
         ))}
        
       
      </Slider>
    </div>
    </div>
     
    </Container>
  );
};

export default PreviewInternalTeachers;
