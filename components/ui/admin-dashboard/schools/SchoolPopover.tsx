"use client";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FaEllipsisH } from "react-icons/fa";
import Link from "next/link";

const SchoolPopover = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="border-none" variant="outline">
          <FaEllipsisH className="ml-3 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-30">
        <Link
          href={"/admin-dashboard/schools/details"}
          className="text-[13px] font-bold"
        >
          View Details
        </Link>
      </PopoverContent>
    </Popover>
  );
};

export default SchoolPopover;
