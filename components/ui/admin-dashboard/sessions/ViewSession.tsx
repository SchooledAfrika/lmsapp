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
import Image from "next/image";
import RemoveSession from "./RemoveSession";
import { AssignTeacher } from "./AssignTeacher";

const ViewSession = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-lightGreen inline text-[13px] text-white font-bold my-2 w-full p-3 text-center rounded-md shadow-md">
          View More <FaEye className="inline" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[600px] w-[380px] font-subtext">
        <ScrollArea className="h-[400px] w-full ">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">SESSION DETAILS</DialogTitle>
          </DialogHeader>

          <div className="w-full mt-2">
            <Image
              src="/noavatar.png"
              alt="profile"
              width={200}
              height={200}
              className="h-[100px] w-[100px] rounded-md"
            />

            <div className=" flex flex-col py-2">
              <h2 className="font-bold pb-2">
                TITLE: MATHEMATICS TEACHER
              </h2>
              <p className="font-semibold text-[14px]">
                NAME:{" "}
                <span className="text-[13px] text-slate-800">
                  MAURICE ODO
                </span>
              </p>
              <p className="font-semibold text-[14px] pb-2">
                COUNTRY: <span className="text-[13px] text-slate-800">NIGERIA</span>
              </p>
              <p className="font-semibold text-[14px] pb-2">
                EMAIL: <span className="text-[13px] text-slate-800">odomaurice501@gmail.com</span>
              </p>
              <p className="font-semibold text-[14px] pb-2">
                GENDER: <span className="text-[13px] text-slate-800">MALE</span>
              </p>
              <p className="font-semibold text-[14px] pb-2">
                GRADE:{" "}
                <span className="text-[13px] text-slate-800">GRADE 12</span>{" "}
              </p>
              <p className="font-semibold text-[14px] pb-2">
                SESSIONTYPE:{" "}
                <span className="text-[13px] text-slate-800">
                  HOMEWORK SUPPORT.
                </span>
              </p>
              <p className="font-semibold text-[14px] pb-2">
                CURRICULUM:{" "}
                <span className="text-[13px] text-slate-800">
                  MONTESSORI.
                </span>
              </p>
              <p className="font-semibold text-[14px] pb-2">
                SPECIAL NEEDS:{" "}
                <span className="text-[13px] text-slate-800">
                  DYSLEXIA.
                </span>
              </p>
              <p className="font-semibold text-[14px] pb-2">
                LEARNING GOALS:{" "}
                <span className="text-[13px] text-slate-800">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. 
                </span>
              </p>
              <p className="font-semibold text-[14px] pb-1">
                DAY(S):{" "}
                <span className="text-[13px] text-slate-800">
                  Mon, Tue, Fri.
                </span>{" "}
              </p>
              <p className="font-semibold text-[14px] pb-1">
                TIME:{" "}
                <span className="text-[13px] text-slate-800">
                  2PM
                </span>{" "}
              </p>
              <p className="font-semibold text-[14px] pb-1">
                TIMING:{" "}
                <span className="text-[13px] text-slate-800">
                  2 hours
                </span>{" "}
              </p>
              <p className="font-semibold text-[14px] pb-1">
                DURATION:{" "}
                <span className="text-[13px] text-slate-800">
                  2 MONTHS
                </span>{" "}
              </p>
              <p className="font-semibold text-[14px] pb-1">
                JOB TYPE:{" "}
                <span className="text-[13px] text-slate-800">
                  Hybrid
                </span>{" "}
              </p>
              <p className="font-semibold text-[14px] pb-1">
                CLASS STARTS:{" "}
                <span className="text-[13px] text-slate-800">
                  8th August 2024
                </span>{" "}
              </p>

              <div className="flex justify-between py-3 ">
                <AssignTeacher/>
                
                <RemoveSession />
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  );
};

export default ViewSession;
