'use client'

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image'
 
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { MdVerified } from "react-icons/md"
 
export default function RecentlyAdded() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )
 
  return (
    <Carousel
      plugins={[plugin.current]}
      className=" md:mt-24  md:w-[44.5%] w-full mb-12   -mx-3 md:absolute md:top-[14rem]  px-3 bg-white   text-[15px] md:py-3 rounded-md"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
     
  <CarouselContent>
    <CarouselItem>
    <div className='p-3'>
        <h3 className='text-slate-600 font-bold'>Recently Added</h3>
        <div className='flex space-x-2 mt-2'>
           <Image src="/green-book.png" alt="" width={100} height={100} className='w-[30px] h-[30px]'/>
           <div className='flex flex-col'>
               <p className='font-bold'>How Europe Underdeveloped Africa</p>
               <p className='text-[13px] pt-2'>Walter Rodney</p>
              <p className='text-rose-500 text-[14px] pt-2'>Grade 12</p>
               <p className='font-bold pt-2 inline'>Government<Image src="/govt.png" alt="" width={100} height={100} className='w-[30px] h-[30px] inline-block'/>  </p>
           </div>
          

        </div>
        <hr className="my-2"/>
        <div className="mt-2 flex items-center md:space-x-6 space-x-2">
           <div className="flex flex-col space-y-3 ">
            <p>Tutor</p>
            <div className="flex space-x-2 items-center">
               <Image src="/tutors.jpg" alt="" width={100} height={100} className="w-[40px] h-[40px] rounded-md"/>
            <h3 className="inline  font-bold text-[12px]">
            David Olushola <MdVerified className="inline text-lightGreen text-[15px]  md:mr-8" />{" "}
            </h3>
            </div>
           
           </div>
           <div className="flex flex-col space-y-2">
            <p>Time</p>
            <div className="flex space-x-2">
              <p className="text-[13px] font-semibold">2:30PM</p>
            </div>
           
           </div>
           <div className="flex flex-col space-y-2">
            <p>Date</p>
            <div className="flex space-x-2">
              <p className="text-[13px] font-semibold">July 15, 2024</p>
            </div>
           
           </div>
           </div>
        
          
   </div>
    </CarouselItem>
    <CarouselItem>
    <div className='p-3'>
        <h3 className='text-slate-600 font-bold'>Recently Added</h3>
        <div className='flex space-x-2 mt-3'>
           <Image src="/yellow-book.png" alt="" width={100} height={100} className='w-[30px] h-[30px]'/>
           <div className='flex flex-col'>
               <p className='font-bold'>Quiz 4 (Demand & Supply)</p>
               <p className='text-[13px] pt-2'>Augustine David</p>
              <p className='text-rose-500 text-[14px] pt-2'>Grade 10</p>
               <p className='font-bold pt-2 inline'>Economics <Image src="/account.png" alt="" width={100} height={100} className='w-[30px] h-[30px] inline-block'/>  </p>
           </div>
          

        </div>
        <hr className="my-4"/>
        <div className="mt-8 flex space-x-6">
           <div className="flex flex-col space-y-3">
            <p>Tutor</p>
            <div className="flex space-x-2">
               <Image src="/teacher-img.png" alt="" width={100} height={100} className="w-[40px] h-[40px] rounded-md"/>
            <h3 className="inline  font-bold text-[12px]">
            Augustine David <MdVerified className="inline text-lightGreen text-[15px]  md:mr-8" />{" "}
            </h3>
            </div>
           
           </div>
           <div className="flex flex-col space-y-3">
            <p>Time</p> 
            <p className="text-[13px] font-semibold">12:30PM</p>
            
           
           </div>
           <div className="flex flex-col space-y-3">
            <p>Date</p>
            <p className="text-[13px] font-semibold">June 15, 2024</p>
            
           
           </div>
           </div>
        
          
   </div>
    </CarouselItem>
    <CarouselItem>
    <div className='p-3'>
        <h3 className='text-slate-600 font-bold'>Recently Added</h3>
        <div className='flex space-x-2 mt-3'>
           <Image src="/yellow-book.png" alt="" width={100} height={100} className='w-[30px] h-[30px]'/>
           <div className='flex flex-col'>
               <p className='font-bold'>Quiz 1 (Welcome to Biology)</p>
               <p className='text-[13px] pt-2'>Sarah Adebayor</p>
              <p className='text-rose-500 text-[14px] pt-2'>Grade 10</p>
               <p className='font-bold pt-2 inline'>Biology <Image src="/bio.png" alt="" width={100} height={100} className='w-[30px] h-[30px] inline-block'/>  </p>
           </div>
          

        </div>
        <hr className="my-4"/>
        <div className="mt-8 flex space-x-6">
           <div className="flex flex-col space-y-3">
            <p>Tutor</p>
            <div className="flex space-x-2">
               <Image src="/cath.jpg" alt="" width={100} height={100} className="w-[40px] h-[40px] rounded-md"/>
            <h3 className="inline  font-bold text-[12px]">
            Sarah Adebayor <MdVerified className="inline text-lightGreen text-[15px]  md:mr-8" />{" "}
            </h3>
            </div>
           
           </div>
           <div className="flex flex-col space-y-3">
            <p>Time</p> 
            <p className="text-[13px] font-semibold">10:44AM</p>
            
           
           </div>
           <div className="flex flex-col space-y-3">
            <p>Date</p>
            <p className="text-[13px] font-semibold">May 15, 2024</p>
            
           
           </div>
           </div>
        
          
   </div>
    </CarouselItem>
  </CarouselContent>
 
</Carousel>

   
  )
}


