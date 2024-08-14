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
import { Layers3, User2 } from "lucide-react";
import { FaRegEye } from "react-icons/fa";
import { BookOpenCheck } from "lucide-react";
// import RemoveClass from "./RemoveClass";
import { IoMailUnreadOutline } from "react-icons/io5";
import { FaTableList } from "react-icons/fa6";
import { ListCollapse } from "lucide-react";
import { FaUserSlash } from "react-icons/fa6";
import RemoveTeacher from "./RemoveTeacher";

const TeacherOptions = () => {
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
              <Link href={`/admin-dashboard/teachers/test`}>
                <p className="inline text-[13px]  font-semibold">
                  <FaRegEye className="inline ml-0 w-4 h-4 mr-2 text-lightGreen" />
                  View
                </p>
              </Link>
            </div>
            <hr className="bg-black" />
            <div className="flex justify-start">
              <p className="inline text-[13px]  font-semibold">
                <IoMailUnreadOutline className="inline ml-0 w-4 h-4 mr-2 text-lightGreen" />
                Send Email
              </p>
            </div>
            <hr className="bg-black" />
            <div className="flex justify-start cursor-pointer">
              <p className="inline text-[13px]  font-semibold">
                <User2 className="inline ml-0 w-4 h-4 mr-2 text-lightGreen" />
                Make Admin
              </p>
            </div>
            <hr className="bg-black" />
            {/* <div className="flex justify-start">
              <p className="inline text-[13px]  font-semibold">
                <FaUserSlash className="inline ml-0 w-4 h-4 mr-2 text-lightGreen" />
                Suspend
              </p>
            </div>
            <hr className="bg-black" /> */}
            <div className="flex justify-start">
              <RemoveTeacher />
            </div>
            <hr className="bg-black" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TeacherOptions;
