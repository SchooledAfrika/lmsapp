"use client";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { FaEllipsisH } from "react-icons/fa";
import { IoMailUnreadOutline } from "react-icons/io5";
import { FaUserSlash } from "react-icons/fa6";
import RemoveCourse from "./RemoveCourse";
import PaymentPreview from "./PaymentPreview";



const PaymentOptions = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="border-none bg-slate-100" variant="outline">
          <FaEllipsisH className="ml-3 text-lightGreen " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40">
        <div className="grid gap-4 font-header">
          <div className="grid gap-2">
          <div className="flex justify-start">
             <PaymentPreview/>
            </div>
            <hr className="bg-black" />
            <div className="flex justify-start">
              <p className="inline text-[13px]  font-semibold">
                <IoMailUnreadOutline className="inline ml-0 w-4 h-4 mr-2 text-lightGreen" />
                Send Email
              </p>
            </div>
            <hr className="bg-black" />
            

          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PaymentOptions;
