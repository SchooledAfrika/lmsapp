"use client";
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

import Image from "next/image";
import Link from "next/link";
import { GiPadlock } from "react-icons/gi";
import { WithdrawAlert } from "./WithdrawAlert";
export function WithdrawDialog() {
  const { verified, setVerified } = useContext(CommonDashboardContext);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`${
            verified
              ? "bg-lightGreen opacity-50 hover:bg-green-700 cursor-not-allowed text-[13px] px-6 py-2 md:w-36  "
              : "bg-lightGreen hover:bg-green-700 text-[13px] px-6 py-2 w-full  md:w-36 text-white"
          }`}
        >
          Request Withdrawal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[500px] w-[380px] font-header">
        <DialogHeader>
          <DialogTitle className="text-2xl mt-6 font-bold">
            Withdraw Request
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 font-header py-4">
          <div className="flex justify-between items-center gap-4">
            <div className="flex flex-col space-y-4">
              <p className="text-[14.5px] font-semibold">Account Balance</p>
              <p className="text-lightGreen font-bold text-[22px]">$1,096.69</p>
            </div>
            <div className="flex justify-end">
              <p className="font-bold">
                <Image
                  src="/usflag.png"
                  alt="usflag"
                  width={100}
                  height={100}
                  className="w-[20px] h-[20px] inline rounded-full"
                />{" "}
                USD
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="amount"
              type=""
              placeholder="Amount"
              className="col-span-6 h-[60px] w-full"
            />
          </div>
          <label htmlFor="Bank details" className="text-[14px] font-semibold">
            Banking Details
          </label>
          <div className=" w-full rounded-md h-[60px] font-header border bg-white flex items-center text-black justify-between px-2 ">
            <input
              placeholder="1023456789"
              className=" w-full text-[14px] text-black bg-transparent focus:outline-none"
            />
            <div className=" w-[50px] cursor-pointer font-bold aspect-square rounded-full flex items-center justify-center">
              <GiPadlock className="w-[20px] h-[20px] rounded-full" />
            </div>
          </div>
        </div>

        <DialogFooter className="">
          <WithdrawAlert />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
