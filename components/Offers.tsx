import React from "react";

import Image from "next/image"
import tutor from "@/images/tutor.png"
import Link from "next/link"
import Quiz from "@/images/quiz.png"
import parent from "@/images/parent.png"
import homework from "@/images/homework.png"
import { Button } from "@/components/ui/button"



const Offers = () => {
  return (
    <section className="grid font-subtext  grid-cols-1 sm:px-6 md:grid-cols-3 items-center xl:grid-cols-3 gap-6 mt-10 lgl:px-10">

      <div >
        <h3 className="text-3xl sm:text-2xl font-semibold">Our Offers</h3>
        <p className="mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac interdum sapien, id aliquam ligula. Maecenas eget neque id ligula egestas blandit. Suspendisse potenti. Phasellus efficitur nulla at justo aliquam placerat. In ullamcorper malesuada iaculis. Nullam consectetur in leo sit amet ornare.
        </p>
      </div>
      <div>
      <Image alt="" src={tutor} className="w-1/5" />
           <h3 className="text-2xl sm:text-xl font-semibold">Expert tutoring</h3>
            
            <p className="my-4">
                
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac interdum sapien, id aliquam ligula. Maecenas eget neque id ligula egestas blandit. 

            </p>
             <Button asChild  className=" bg-green-600 hover:bg-green-500 rounded-xl text-white   text-[16.5px] px-4 w-32  py-2 text-center lg:block">
              
              <Link  href="/register">Register Now!</Link>
              
            </Button>

      </div>
      <div>
      <Image alt="" src={Quiz} className="w-1/5" />
           <h3 className="text-2xl sm:text-xl font-semibold">Virtual Quiz & Test</h3>
            
            <p className="my-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac interdum sapien, id aliquam ligula. Maecenas eget neque id ligula egestas blandit. Suspendisse potenti. 
                
            </p>
            <Button asChild  className=" bg-green-600 hover:bg-green-500 rounded-xl text-white   text-[16.5px] px-4 w-32  py-2 text-center lg:block">
              
              <Link  href="/register">Register Now!</Link>
              
            </Button>
      </div>
      <div>
      <Image src={parent} alt="" className="w-1/5" />
           <h3  className="text-2xl sm:text-xl font-semibold">Parental Accessibility</h3>
            
            <p className="my-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac interdum sapien, id aliquam ligula. Maecenas eget neque id ligula egestas blandit. Suspendisse potenti. 

            </p>
            <Button asChild  className=" bg-green-600 hover:bg-green-500 rounded-xl text-white   text-[16.5px] px-4 w-32  py-2 text-center lg:block">
              
              <Link  href="/register">Register Now!</Link>
              
            </Button>
      </div>
      <div>
      <Image src={homework} alt="" className="w-1/5" />
           <h3 className="text-2xl sm:text-xl font-semibold">Homework Support</h3>
            
            <p className="my-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac interdum sapien, id aliquam ligula. Maecenas eget neque id ligula egestas blandit. 

            </p>
            <Button asChild  className=" bg-green-600 hover:bg-green-500 rounded-xl text-white   text-[16.5px] px-4 w-32  py-2 text-center lg:block">
              
              <Link  href="/register">Register Now!</Link>
              
            </Button>
      </div>
      
     
     
            
           
            
            
           
           
       
      
    </section>
  );
};

export default Offers;
