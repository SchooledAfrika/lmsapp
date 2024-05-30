'use client'
import React, { useContext } from "react";
import { CommonDashboardContext } from "@/providers/Statecontext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";



import { GoDotFill } from "react-icons/go";

import Image from "next/image"
import Link from "next/link"
export function NotVerified() {
    const { verified, setVerified } = useContext(CommonDashboardContext);
  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button className={`${
                        verified
                          ? "bg-lightGreen opacity-50 hover:bg-green-700 cursor-not-allowed text-[13px] px-6 py-2 md:w-36  "
                          : "bg-lightGreen hover:bg-green-700 text-[13px] px-6 py-2 w-full  md:w-36 text-white"
                      }`}>Request Withdrawal</Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[500px] w-[380px] font-subtext">
        <DialogHeader>
          <DialogTitle className="text-2xl mt-6 font-bold inline">
          <Image src="/warn.png" alt="warning" width={200} height={100} className="w-[40px] inline" /> You are not Verified
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 font-header py-4">
          <div className="grid  items-center gap-4">
            <p className="text-[14px]">You are not yet verified and will not be able to withdraw, please complete registarion by filling in the KYC form to be able to withdraw. </p>
          </div>
          </div>
        
        <DialogFooter className="">
         
             <Button type="submit" className="w-full py-8 text-lg bg-lightGreen hover:bg-green-700">Complete KYC</Button>
         
       
         
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
