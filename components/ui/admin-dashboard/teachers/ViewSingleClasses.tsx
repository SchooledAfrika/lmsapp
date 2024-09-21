"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash2 } from "lucide-react";
import { FaEllipsisH } from "react-icons/fa";
import { endOfSecond } from "date-fns";

interface IviewClasses {
  dataId: string;
  duration: string;
  starts: string;
  ends: string;
  time: string;
  studentIDs: string[];
  publicClass: boolean;
  price: number;
  resourceIds: string[];
  rating: string;
  schedules: string[];
  maxCapacity: number;
  currentCapacity: number;
  createdAt: string;
}

const ViewSingleClasses: React.FC<IviewClasses> = ({
  dataId,
  duration,
  starts,
  ends,
  time,
  studentIDs,
  publicClass,
  price,
  resourceIds,
  schedules,
  rating,
  maxCapacity,
  currentCapacity,
  createdAt,
}) => {
  console.log(dataId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="inline text-[13px] cursor-pointer  font-semibold">
          <FaEllipsisH className="inline w-4 h-4 mr-2 ml-0 text-lightGreen " />
        </p>
      </DialogTrigger>
      <DialogContent className="sm:w-[700px] w-[380px] font-subtext">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">
            More Teacher Classes Information
          </DialogTitle>
        </DialogHeader>
        <div>
          <div className="grid gap-4 font-header py-4">
            <div className="grid md:grid-cols-2 grid-cols-1 space-y-3">
              <div className=" flex space-x-12">
                <p className="text-[13px] font-medium">Duration of Class</p>
                <p className="text-[14px] font-semibold">{duration}</p>
              </div>
              <div className=" flex space-x-12">
                <p className="text-[13px] font-medium">Class Starts</p>
                <p className="text-[14px] font-semibold">{starts}</p>
              </div>
              <div className=" flex space-x-12">
                <p className="text-[13px] font-medium">Class Ends</p>
                <p className="text-[14px] font-semibold">{ends}</p>
              </div>
              <div className=" flex space-x-12">
                <p className="text-[13px] font-medium">Time of Class</p>
                <p className="text-[14px] font-semibold">{time}</p>
              </div>

              <div className=" flex space-x-12">
                <p className="text-[13px] font-medium">Schedules</p>
                <p className="text-[14px] font-semibold">
                  {schedules[0]}, {schedules[1]}, {schedules[2]}, {schedules[3]}
                </p>
              </div>
              <div className=" flex space-x-12">
                <p className="text-[13px] font-medium">Price</p>
                <p className="text-[14px] font-semibold">${price}</p>
              </div>
              {/* <div className=" flex space-x-12">
                      <p className="text-[13px] font-medium">Rating</p>
                      <p className="text-[14px] font-semibold">{rating}</p>
                    </div> */}
              <div className=" flex space-x-12">
                <p className="text-[13px] font-medium">Maximum Capacity</p>
                <p className="text-[14px] font-semibold">{maxCapacity}</p>
              </div>
              <div className=" flex space-x-12">
                <p className="text-[13px] font-medium">Current Capacity</p>
                <p className="text-[14px] font-semibold">{currentCapacity}</p>
              </div>
              <div className=" flex space-x-12">
                <p className="text-[13px] font-medium">Created At</p>
                <p className="text-[14px] font-semibold">{createdAt}</p>
              </div>
            </div>
          </div>
        </div>
        {/* <DialogFooter className="">
          <Button
            // onClick={handleDelete}
            disabled={loading}
            type="submit"
            className="w-full py-8 text-lg bg-lightGreen hover:bg-green-700"
          >
            {loading ? "Deleting Payment..." : "Delete Payment"}
          </Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default ViewSingleClasses;
