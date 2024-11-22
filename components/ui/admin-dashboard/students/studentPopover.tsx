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
import { SendSingleMail } from "../teachers/ChangeRole";
import { IoMailUnreadOutline } from "react-icons/io5";

interface IStudent {
  studentId: string;
  email: string;
}

const StudentPopover: React.FC<IStudent> = ({ studentId, email }) => {
  const [ismailOpen, setismailOpen] = useState<boolean>(false);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="border-none" variant="outline">
          <FaEllipsisH className="ml-3 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-30 flex flex-col gap-2">
        <Link
          href={`/admin-dashboard/students/${studentId}`}
          className="text-[13px] font-bold"
        >
          <p className="inline text-[13px] font-semibold">
            <FaRegEye className="inline ml-0 w-4 h-4 mr-2 text-lightGreen" />
            View Details
          </p>
        </Link>
        <hr />
        <div className="flex justify-start">
          <div
            onClick={() => setismailOpen(true)}
            className=" flex items-center text-[13px]  font-semibold"
          >
            <IoMailUnreadOutline className="inline ml-0 w-4 h-4 mr-2 text-lightGreen" />
            <p>Send Email</p>
          </div>
          <SendSingleMail
            ismailOpen={ismailOpen}
            setIsmailOpen={setismailOpen}
            email={email}
          />
        </div>
        <hr />
        <div className="flex justify-start">
          <RemoveStudent studentId={studentId} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default StudentPopover;
