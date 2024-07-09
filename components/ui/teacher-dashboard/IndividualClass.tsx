"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";


import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";



import { FaEllipsisH } from "react-icons/fa";


import Image from "next/image"
import Link from "next/link"
import { GoDotFill } from "react-icons/go";
import RemoveClass from "./RemoveClass";

interface Idelete {
  dataId: string
}


const IndividualClass: React.FC<Idelete> = ({dataId}) => {
  return (
    <Popover>
    <PopoverTrigger asChild>
      <FaEllipsisH className="ml-3" />
    </PopoverTrigger>
    <PopoverContent className="w-40">
      <div className="grid gap-4 font-subtext">
        <div className="grid gap-2">
          <div className="flex justify-start">
            <Link href={`/teacher-dashboard/classroom/individual-session/test`}>
              <p className="inline text-[14px]  font-semibold">
                <GoDotFill className="inline ml-0 text-lightGreen" />
                Details
              </p>
            </Link>
          </div>
          <hr className="bg-black" />
          <div className="flex justify-start">
            <RemoveClass dataId={dataId}/>
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
  );
}

export default IndividualClass
