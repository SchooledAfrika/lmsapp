'use client'

import React from "react";
import Container from "./Container";
import Image from "next/image";
import FadeIn from './FadeIn'
import { IoIosSearch } from "react-icons/io";
import boy from "@/images/hero_img.png";
import first from "@/images/hero-1.png";
import second from "@/images/hero-2.png";
import third from "@/images/hero-3.png";
import fourth from "@/images/hero-4.png";
import fifth from "@/images/hero-5.png";
import sixth from "@/images/hero-6.png";
import intro from "@/images/intro-img.gif"
import slider1 from "@/images/slide-1.jpg"
import slider2 from "@/images/slide-2.jpg"
import slider3 from "@/images/slide-3.jpg"
import slider4 from "@/images/slide-4.jpg"
import slider5 from "@/images/slide-5.jpg"
import slider6 from "@/images/slide-6.jpg"
import slider7 from "@/images/slide-7.jpg"
 import Autoplay from "embla-carousel-autoplay"
 

import {
  Carousel,
  CarouselContent,
  CarouselItem,
 
} from "@/components/ui/carousel";



const Hero = () => {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
      )
  return (
    <section
      id="Home"
      className="overflow-hidden w-full sm:mt-6 mt-24 py-28 sm:py-20 lg:pb-32 xl:pb-3"
    >
      <Container className="px-6">
        <FadeIn>
        <div className="flex flex-col justify-between sm:flex-row">
          {/* Right side */}
          <div className="relative z-10   flex-1 ">
            
              <div className="flex">
                <p className="mt-6 font-header text-lg font-semibold text-dimYellow">
              Introducing SchooledAfrika 
            </p>
            <Image src={intro} alt="" width={69} height={69} />
              </div>
            

            <div className="flex flex-row justify-between items-center ">
              <h1 className="flex-1  font-subtext font-semibold ss:text-[35px] text-[30px] text-black ss:leading-[50.8px] leading-[50px]">
                {" "}
                Get the best education & secure a{" "}
                {/* <br className="sm:block hidden" /> */}
              </h1>
            </div>

            <h1 className="font-subtext font-semibold ss:text-[35px] text-[30px] text-black ss:leading-[50.8px] leading-[50px] w-full">
              <span className="text-lightGreen">Better Future</span> for your
              kids.
            </h1>
            <p className="mt-6 text-lg font-subtext text-black">
              Empower your child's journey with our comprehensive educational
              solutions, nurturing their potential every step of the way.
              Together, let's build a foundation for lifelong success.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-4">
              <div className="relative mt-6 w-full">
                <input
                  type="email"
                  placeholder="Search tutors, classes, vacancies..."
                  autoComplete="email"
                  aria-label="Email address"
                  className="block w-full font-header shadow-2xl shadow-black  rounded-3xl border border-gray-100 bg-transparent px-12 py-4 pl-6 pr-20 text-base/6 text-black ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-100 "
                />
                <div className="absolute overflow-hidden inset-y-1 right-1 flex justify-end">
                  <button
                    type="submit"
                    aria-label="Submit"
                    className="flex aspect-square h-full items-center justify-center rounded-full bg-orange-500 text-white transition hover:bg-neutral-200"
                  >
                    <IoIosSearch className="w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Left Side */}
          <div className=" w-full relative mt-10 overflow-hidden  sm:mt-2   flex-1">
           <Image src={slider1} alt=""  className="banner hidden rounded-full sm:block  w-[71px] h-[71px] absolute top-[350px] left-[50px]"/>
           <Image src={slider2} alt="" className="banner rounded-full hidden sm:block w-[71px] h-[71px] absolute top-[199px] left-[536px] z-[20px]" />
           <Image src={slider3} alt="" className="banner rounded-full hidden sm:block w-[71px] h-[71px] absolute top-[163px] left-[536px] z-[10px]"/>
           <Image src={slider4} alt="" className="banner rounded-full hidden sm:block w-[71px] h-[71px] absolute left-[495px]"/>
           <Image src={slider5} alt="" className="banner rounded-full hidden sm:block w-[71px] h-[71px] absolute top-[350px] left-[500px]"/>
           <Image src={slider6} alt="" className="banner rounded-full hidden sm:block w-[71px] h-[71px] absolute top-[83px] left-[20px]"/>
           <Image src={slider7} alt="" className="banner rounded-full hidden sm:block w-[71px] h-[71px] absolute top-[128px] left-[10px]"/>
            <Carousel
              opts={{
                
                loop: true,
              }}
            plugins={[plugin.current]}
           className="  "
          //  onMouseEnter={plugin.current.stop}
          //  onMouseLeave={plugin.current.reset}
              
            >
              <CarouselContent >
                <CarouselItem className="basis-full mx-auto" >
                  {" "}
                  
                 
                  
                <div className="bg-gold z-50 mx-auto aspect-square relative sm:w-[400.65px] w-full overflow-hidden   -top-[.2px]  rounded-full">
                    <Image
                      src={first}
                      alt=""
                      className="absolute sm:top-[39px]  left-[75px] mx-auto  w-[337px] h-[624px] "
                    />
                  </div>
                
                    
                </CarouselItem>
                <CarouselItem>
                  {" "}
                  
                  <div className="bg-dimOrange  mx-auto aspect-square relative sm:w-[400.65px]  w-full overflow-hidden  rounded-full">
                    <Image
                      src={second}
                      alt=""
                      className="absolute  w-[600px]  "
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  {" "}
                  <div className="bg-lightGreen z-20 mx-auto aspect-square relative sm:w-[400.65px] w-full overflow-hidden  rounded-full">
                    <Image
                      src={third}
                      alt=""
                      className="absolute w-[600px] "
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  {" "}
                  <div className="bg-dimOrange mx-auto aspect-square relative sm:w-[400.65px] w-full  overflow-hidden  rounded-full">
                    <Image
                      src={fourth}
                      alt=""
                      className="absolute w-[600px] "
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  {" "}
                  <div className="bg-lightGreen mx-auto aspect-square relative sm:w-[400.65px] w-full  overflow-hidden  rounded-full">
                    <Image
                      src={fifth}
                      alt=""
                      className="absolute w-[600px] "
                    />
                  </div>
                </CarouselItem>
               
              </CarouselContent>
            </Carousel>

            {/* <div className='bg-orange-500  w-3/4 h-3/4 rounded-full'>
                    <Image src={boy} alt="" className='w-full absolute -left-12 -top-20 ' />
                   

                </div> */}
          </div>
        </div>
        </FadeIn>
      </Container>

    </section>
  );
};

export default Hero;
