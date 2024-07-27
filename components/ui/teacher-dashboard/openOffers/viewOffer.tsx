"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye } from "react-icons/fa";
import Image from "next/image"
import RemoveOffer from "./RemoveOffer";


const ViewOffer = () => {
 

  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button  className="bg-lightGreen inline text-[13px] text-white font-bold my-2 w-full p-3 text-center rounded-md shadow-md">View More <FaEye className="inline" /></Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[500px] w-[380px] font-subtext">
      <ScrollArea className="h-[400px] w-full ">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            JOB OFFER
          </DialogTitle>
        </DialogHeader>

        <div className="w-full mt-2">
            <Image 
                   src="/schoolpic.png" 
                   alt="schoolpic"
                   width={200} height={200} 
                   className="h-[100px] w-[100px] rounded-md"
             />
            
              <div className=" flex flex-col py-2">
                <h2 className="font-bold pb-2">INSTITUTION: THE BRILLIANT KIDS ACADEMY</h2>
                <p className="font-semibold text-[14px]">JOB TITLE: <span className="text-[13px] text-slate-800">MATHEMATICS TEACHER</span></p>
                <p className="font-semibold text-[14px] pb-2">STATE: <span className="text-[13px] text-slate-800">LAGOS</span></p>
                <p className="font-semibold text-[14px] pb-2">GRADE: <span className="text-[13px] text-slate-800">GRADE 12</span> </p>
                <p className="font-semibold text-[14px] pb-2">QUALIFICATION(S): <span className="text-[13px] text-slate-800">Bsc Hons, NCE.</span></p>
                <p className="font-semibold text-[14px] pb-2">JOB DESCRIPTION: <span className="text-[13px] text-slate-800">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>
                <p className="font-semibold text-[14px] pb-1">JOB TYPE: <span className="text-[13px] text-slate-800">Hybrid, Hourly-based</span> </p>
                <p className="font-semibold text-[14px] pb-1">SALARY RANGE: <span className="text-[13px] text-slate-800">₦200,000 - ₦600,000</span> </p>

                 
        <div className="flex justify-between py-3 ">
            <Button className="py-2 bg-lightGreen hover:bg-green-400 px-6 text-[13px]">Accept</Button>
            <RemoveOffer/>
        </div>

                
              </div>
             
              
              
              
              
              

             

              
              
              
            
          </div>
          </ScrollArea>
       </DialogContent>
      <ToastContainer />
    </Dialog>
  );
}

export default ViewOffer;
