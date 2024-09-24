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
import RemoveStudent from "./RemoveStudent";
import { FaRegEye } from "react-icons/fa";

interface IStudent {
  studentId: string;
}

const StudentPopover: React.FC<IStudent> = ({ studentId }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="border-none" variant="outline">
          <FaEllipsisH className="ml-3 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-30">
        <Link
          href={`/admin-dashboard/students/${studentId}`}
          className="text-[13px] font-bold"
        >
          <p className="inline text-[13px] font-semibold">
            <FaRegEye className="inline ml-0 w-4 h-4 mr-2 text-lightGreen" />
            View Details
          </p>
        </Link>

        <div className="flex justify-start pt-2">
          <RemoveStudent studentId={studentId} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default StudentPopover;
