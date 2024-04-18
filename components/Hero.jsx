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
      className="overflow-hidden w-full py-28 sm:py-30 lg:pb-32 xl:pb-3"
    >
      <Container>
        <FadeIn>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          {/* Right side */}
          <div className="relative z-10 mx-auto max-w-2xl  lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            {/* <Title
                title="Get the best education & secure a."
                className="font-poppins font-semibold xs:text-[48px] text-3xl sm:text-[50px] xs:leading-[76.8px] leading-[66.8px] w-full text-black"
              />
                */}
            <p className="mt-6 font-header text-lg font-semibold text-dimYellow">
              Introducing SchooledAfrika
            </p>

            <div className="flex flex-row justify-between items-center w-full">
              <h1 className="flex-1  font-subtext font-semibold ss:text-[40px] text-[30px] text-black ss:leading-[60.8px] leading-[50px]">
                {" "}
                Get the best education & secure a
                <br className="sm:block hidden" />{" "}
              </h1>
            </div>

            <h1 className="font-subtext font-semibold ss:text-[40px] text-[30px] text-black ss:leading-[60.8px] leading-[50px] w-full">
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
          <div className="mt-10 relative overflow-hidden  sm:mt-32 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <Carousel
              opts={{
                
                loop: true,
              }}
            plugins={[plugin.current]}
           className="  "
           onMouseEnter={plugin.current.stop}
           onMouseLeave={plugin.current.reset}
              
            >
              <CarouselContent >
                <CarouselItem className="basis-full mx-auto" >
                  {" "}
                  
                 
                  
                <div className="bg-gold mx-auto aspect-square relative w-5/6  overflow-hidden  rounded-full">
                    <Image
                      src={first}
                      alt=""
                      className="absolute w-full "
                    />
                  </div>
                
                    
                </CarouselItem>
                <CarouselItem>
                  {" "}
                  
                  <div className="bg-dimOrange mx-auto aspect-square relative w-5/6  overflow-hidden  rounded-full">
                    <Image
                      src={second}
                      alt=""
                      className="absolute w-full "
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  {" "}
                  <div className="bg-lightGreen mx-auto aspect-square relative w-5/6  overflow-hidden  rounded-full">
                    <Image
                      src={third}
                      alt=""
                      className="absolute w-[600px] "
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  {" "}
                  <div className="bg-dimOrange mx-auto aspect-square relative w-5/6  overflow-hidden  rounded-full">
                    <Image
                      src={fourth}
                      alt=""
                      className="absolute w-[600px] "
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  {" "}
                  <div className="bg-lightGreen mx-auto aspect-square relative w-5/6  overflow-hidden  rounded-full">
                    <Image
                      src={fifth}
                      alt=""
                      className="absolute w-[600px] "
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  {" "}
                  <div className="bg-gold mx-auto aspect-square relative w-5/6  overflow-hidden  rounded-full">
                    <Image
                      src={sixth}
                      alt=""
                      className=" w-[600px] "
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
