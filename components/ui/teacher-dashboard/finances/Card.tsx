"use client";

import React, { useContext } from "react";
import { CommonDashboardContext } from "@/providers/Statecontext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WithdrawDialog } from "./WithdrawDialog";
import { NotVerified } from "./NotVerified";
import TransactionTable from "@/components/TransactionTable";
import { MdOutlineContactSupport } from "react-icons/md";
import KycCard from "./KycCard";

const Card = () => {
  const { verified, setVerified } = useContext(CommonDashboardContext);

  return (
    <div className="w-full bg-stone-100">
      {/* Card section */}
      <div className="md:flex md:flex-row  gap grid grid-cols-1 justify-between    gap-6">
        <div className="flex   flex-6 flex-col">
          <div className="flex md:flex-row flex-col gap-6">
            {/* First card */}
            <KycCard />
            {/* second card */}
            <div className="flex flex-3  text-sm  py-3 px-4  justify-between space-x-2  bg-white rounded-md">
              <div className="flex flex-col  justify-evenly">
                <h3 className="font-semibold text-slate-500 text-[13px] pb-2">
                  Withdrawal
                </h3>

                <p className=" text-[11.5px] my-3 font-medium">
                  Your earnings will be sent to the account details provided.
                  Please,confirm your account details before proceeding.
                </p>

                {!verified ? <WithdrawDialog /> : <NotVerified />}
              </div>
            </div>
          </div>
          <div>
            <TransactionTable />
          </div>
        </div>

        {/* Transaction */}
        <div className="flex flex-4 font-subtext  text-sm w-full pt-0 p-6  space-x-1  bg-white rounded-md">
          <div className="flex flex-col w-full justify-evenly">
            <div className="flex justify-between">
              <h3 className="font-bold text-[15px] ">Transaction Details</h3>
              <Button className="bg-lightGreen text-[12px] text-white">
                Export
              </Button>
            </div>

            <p className=" font-bold">Payment Information</p>
            <div className="font-semibold  text-[13px] flex  mr-1">
              <Image
                src="/teacher1.jpg"
                alt="icon"
                width={100}
                height={100}
                className="w-[40px] h-[40px]  rounded-md mr-1"
              />{" "}
              <div className="flex ml-1 flex-col">
                <div className="text-[12px]">Rotimi Amaechi</div>
                <div className="flex  mt-1 justify-between">
                  <p className="text-[10px] px-[10px] py-[2px] rounded-md mr-3 bg-lightGreen text-white">
                    Student
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between font-bold w-full   mt-2">
              <p className="text-[13px]">Payment Type</p>

              <p className="font-semibold text-[13px]">Tution Fee</p>
            </div>
            <div className="flex justify-between font-bold   mt-2">
              <p className="text-[13px]">Transaction ID</p>

              <p className="font-semibold text-red-500 text-[13px]">SA09786</p>
            </div>
            <div className="flex justify-between font-bold  mt-2">
              <p className="text-[13px]">Subject</p>
              <div className="flex ">
                <Image
                  src="/maths.png"
                  alt=""
                  width={100}
                  height={100}
                  className="w-[30px] mr-1  h-[30px]"
                />
                <p className="font-semibold text-[13px]">Mathematics</p>
              </div>
            </div>
            <div className="flex justify-between font-bold">
              <p className="text-[13px]">Amount</p>

              <p className="font-semibold text-lightGreen text-[13px]">
                $17.50
              </p>
            </div>

            <hr className="my-1" />

            <div className="space-y-2 font-header">
              <h3 className="font-bold">Need Help ?</h3>
              <p className="text-[13px]">
                Send us a message, we are one click away!
              </p>
              <Button
                asChild
                variant="outline"
                className="border font-bold border-lightGreen text-lightGreen hover:text-lightGreen"
              >
                <Link href="/">
                  {" "}
                  <MdOutlineContactSupport className="mr-2 text-[18px]" />{" "}
                  Contact Support
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
