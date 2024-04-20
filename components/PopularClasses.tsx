'use client'
import { Classes} from "@/constants/index"
import { useState } from 'react'
import { motion } from "framer-motion";
import background from "@/images/bg-img.jpeg"
import Image from "next/image"
import button from "@/components/ui/button"

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


const PopularClassesCard = ({ className, classes, tutor, rating, pricing, subject,  icon, timing}:Props) => {
  
    return (
     
        <div className="w-full  overflow-hidden      font-subtext rounded-lg card flex flex-col justify-center gap-6 hover:-translate-y-2 transition-transform duration-300 group">

         
           <div className="relative text-white">
           
             <Image className="w-full h-full object-cover" src={background} alt="background"/> 
             <div className="flex flex-col">
             <div>
              <p className="absolute  top-2 left-24 text-slate-300 ">Class Name</p>
             <p className="absolute  top-8 left-24 ">{className}</p>
              </div>
              <div>
              <p className="absolute  top-16 left-24 text-slate-300 ">Class</p>
             <p className="absolute  top-20 left-24 ">{classes}</p>
              </div>

             </div>
            

             <button href="/register" className=" bg-dimOrange absolute -bottom-2 left-3 rounded-xl text-white text-base  px-3 w-28  py-2 text-center lg:block">
              Enrol Now!
              
            </button>


           </div>

           <p className="text-right mr-6 font-bold text-lightGreen">{pricing}</p>

           <div className="flex flex-col mb-6 justify-between mx-4 ">
             <div className="my-4">
                <span className="text-base text-slate-600">Tutor</span>
                <p className="font-semibold">{tutor} {rating}</p>
             </div>
             <div className="flex my-4 ">
             <p>{subject}</p><Image src={icon} alt="" width={20} height={20} className="w-[20px] ml-2" />

             </div>
             <div>
               <p>{timing}</p>
             </div>
             
           </div>
         
       </div>
     
     
    )
  }
  


const PopularClasses = () => {
    
    return (
      <div className="max-w-full  mx-auto px-4 py-24">
        <div className="w-full  flex flex-col items-center">
       
          <h2 className="text-2xl font-header text-lightGreen font-bold"> <span className="hidden  md:inline-flex w-20 md:w-60 mb-2 py-[.5px]  lgl:w-72 h-[.5px] bg-lightGreen mr-6"></span>
            Popular Classes  <span className="hidden md:inline-flex mb-2 w-20 py-[.5px] md:w-60 lgl:w-72 h-[.5px] bg-lightGreen ml-6"></span>
          </h2>
         
        </div>
        <div className="grid  grid-cols-1 md:grid-cols-3 items-center xl:grid-cols-3 gap-6 mt-10 lgl:px-10">

        {Classes.map((Class, index) => (
        <PopularClassesCard key={Class.id} {...Class} index={index} />
      ))}
       </div>
      </div>
       
     
     
  );
};

export default PopularClasses