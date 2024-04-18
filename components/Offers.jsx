import React from "react";
import GridPattern from "./GridPattern";
import SectionIntro from "./SectionIntro";
import SectionContainer from "./SectionContainer";
import { GridList, GridListItem } from "./GridList";
import Image from "next/image"
import tutor from "@/images/tutor.png"
import Quiz from "@/images/quiz.png"
import parent from "@/images/parent.png"
import homework from "@/images/homework.png"
import Title from "./Title"
import button from "@/components/ui/button"



const Offers = () => {
  return (
    <div className="relative mt-6 pt-10 sm:mt-8 sm:pt-8 lg:mt-6 lg:pt-8">
      <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-gradient-to-b from-neutral-50">
        <GridPattern
          className="absolute inset-0 h-full w-full fill-neutral-100 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
          yOffset={-270}
        />
      </div>
     
      <SectionContainer className="mt-4 font-header">
        <GridList>
          <GridListItem title="Our Offers"> 
          <p className="mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac interdum sapien, id aliquam ligula. Maecenas eget neque id ligula egestas blandit. Suspendisse potenti. Phasellus efficitur nulla at justo aliquam placerat. In ullamcorper malesuada iaculis. Nullam consectetur in leo sit amet ornare.
          </p>
            
          </GridListItem>
          
          <GridListItem > 
            <Image src={tutor} className="w-1/5" />
           <Title title="Expert Tutoring" className="text-2xl sm:text-xl font-semibold"/>
            
            <p className="my-4">
                
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac interdum sapien, id aliquam ligula. Maecenas eget neque id ligula egestas blandit. Suspendisse potenti. Phasellus efficitur nulla at justo aliquam placerat. In ullamcorper malesuada iaculis. Nullam consectetur in leo sit amet ornare.

            </p>

            
            <button href="/register" className=" bg-green-600 rounded-xl text-white text-xl  sm:text-[16.5px] px-4  py-2 text-start lg:block">
              Register Now
              
            </button>
            
          </GridListItem>
          <GridListItem > 
            <Image src={Quiz} className="w-1/5" />
           <Title title="Virtual Quiz & Test" className="text-2xl sm:text-xl font-semibold"/>
            
            <p className="my-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac interdum sapien, id aliquam ligula. Maecenas eget neque id ligula egestas blandit. Suspendisse potenti. Phasellus efficitur nulla at justo aliquam placerat. In ullamcorper malesuada iaculis. Nullam consectetur in leo sit amet ornare.
                
            </p>
            <button href="/register" className=" bg-green-600 rounded-xl text-white text-xl  sm:text-[16.5px] px-4  py-2 text-start lg:block">
              Register Now
            </button>
            
          </GridListItem>
          <GridListItem > 
            <Image src={parent} className="w-1/5" />
           <Title title="Parental Accessibility" className="text-2xl sm:text-xl font-semibold"/>
            
            <p className="my-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac interdum sapien, id aliquam ligula. Maecenas eget neque id ligula egestas blandit. Suspendisse potenti. Phasellus efficitur nulla at justo aliquam placerat. In ullamcorper malesuada iaculis. Nullam consectetur in leo sit amet ornare.

            </p>
            <button href="/register" className=" bg-green-600 rounded-xl text-white text-xl  sm:text-[16.5px] px-4  py-2 text-start lg:block">
              Register Now
            </button>
            
          </GridListItem>
          <GridListItem > 
            <Image src={homework} className="w-1/5" />
           <Title title="Homework Support" className="text-2xl sm:text-xl font-semibold"/>
            
            <p className="my-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac interdum sapien, id aliquam ligula. Maecenas eget neque id ligula egestas blandit. Suspendisse potenti. Phasellus efficitur nulla at justo aliquam placerat. In ullamcorper malesuada iaculis. Nullam consectetur in leo sit amet ornare.

            </p>
            <button href="/register" className=" bg-green-600 rounded-xl text-white text-xl  sm:text-[16.5px] px-4  py-2 text-start lg:block">
              Register Now
            </button>
            
          </GridListItem>
         
        </GridList>
      </SectionContainer>
    </div>
  );
};

export default Offers;
