'use client'

import DateRange from "@/components/DateRange";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { ScrollArea } from "@/components/ui/scroll-area"
import Grid from "@/components/Grid";



interface SchedulingProps {
  onClickSchedulingInfo: () => void;
}



const Scheduling: React.FC<SchedulingProps> = ({ onClickSchedulingInfo }) => {
  

  return (
   
    <div className="">
      <div className="flex space-x-32 md:justify-between">
      <h3 className="text-xl font-bold">Book Session</h3>

      <h3  className="text-base font-medium cursor-pointer">Back</h3>

      </div>
      <ScrollArea className="h-[500px] md:w-full ">
      <div className="flex  md:mx-auto mt-6 mb-8    max-w-[360px] flex-col gap-3">
      <p className="text-center font-semibold text-lightGreen">Scheduling</p>
          <p className="text-[14px] text-center font-semibold">
            Confirm Class Schedule
           
          </p>
          </div>
     
      
       
        <div className="flex justify-between">
          <div className="flex space-x-2">
            <div><p className="inline text-[12px]"><GoDotFill className="inline text-green-400 mr-1"/>Booked</p></div>
            <div><p className="inline text-[12px]"><GoDotFill className="inline text-orange-400 mr-1"/>Not Available</p></div>
          </div>
         
         
         
        </div>
        <DateRange/>
        <Grid/>
       
          <Button
            type="submit"
            onClick={onClickSchedulingInfo}
            className="px-8 py-3 my-8 flex mx-auto  md:float-right bg-lightGreen hover:bg-green-700"
          >
            Proceed
          </Button>
        
      
     </ScrollArea>
    </div>
   
  )
}

export default Scheduling