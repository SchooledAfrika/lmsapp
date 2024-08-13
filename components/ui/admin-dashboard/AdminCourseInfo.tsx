"use client";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FaEllipsisH } from "react-icons/fa";
import EditCourseCategory from "./courses/editCourseCategory/editCourseCategory";
import DeleteCourseCategory from "./courses/deleteCourseCategory/deleteCourseCategory";

const AdminCourseInfo = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="border-none" variant="outline">
          <FaEllipsisH className="ml-3 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40">
        <div className="grid gap-4 font-header">
          <div className="grid gap-2">
            <div className="flex justify-start">
              <EditCourseCategory />
            </div>
            <hr className="bg-black" />
            <div className="flex justify-start">
              <DeleteCourseCategory />
            </div>
            <hr className="bg-black" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AdminCourseInfo;
