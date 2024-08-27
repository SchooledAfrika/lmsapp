"use client";

import React, { useState } from "react";
import Payment from "@/components/ui/book-teacher/Payment";
import Scheduling from "@/components/ui/book-teacher/Scheduling";

import ProgressLine from "./ui/PrograssLine";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { BookSessionInfo, sessionbookingSchema } from "@/constants/bookSession";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChildDetails from "@/components/ui/book-teacher/ChildDetails";
import Details from "@/components/ui/book-teacher/Details";
export type Isession = z.infer<typeof sessionbookingSchema>;

// component for rendering btn for payment and next page
const ControlBtn: React.FC<{
  currentPage: number;
  handleNextPage: () => void;
  method: string;
  sessionId: string;
}> = ({ currentPage, handleNextPage, method, sessionId }) => {
  return (
    <div>
      {currentPage <= 3 ? (
        <Button
          onClick={handleNextPage}
          type="button"
          className="px-8 py-3 md:my-2 my-4 flex md:w-28 w-full md:justify-end float-right bg-lightGreen hover:bg-green-700"
        >
          Proceed
        </Button>
      ) : (
        <div onClick={() => alert(sessionId)}>
          {method === "paystack" ? (
            <div className="px-8 py-3 text-white md:my-2 my-4 flex md:w-28 w-full md:justify-end float-right rounded-md cursor-pointer bg-lightGreen hover:bg-green-700">
              Paynow
            </div>
          ) : (
            <div className="px-8 py-3 text-white md:my-2 my-4 flex md:w-28 w-full md:justify-end float-right rounded-md cursor-pointer bg-lightGreen hover:bg-green-700">
              Paynow
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// then main component appears here
const BookSession: React.FC<{
  sessionId: string;
}> = ({ sessionId }) => {
  const { data: session, update } = useSession();
  // console.log(session?.user);
  const router = useRouter();
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [method, setMethod] = useState<string>("Paystack");
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    control,
    watch,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm<Isession>({
    resolver: zodResolver(sessionbookingSchema),
  });

  const runSubmit: SubmitHandler<Isession> = async (data) => {
    console.log(data);
    // handle file submission to the backend server
    const response = await fetch("#", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        profilePhoto: "the student photo",
      }),
    });
    if (response.ok) {
      update({ CompletedProfile: true });
      router.push("#");
      router.refresh();
    } else {
      alert("something went wrong");
    }
  };

  type fieldName = keyof Isession;
  // function to validate form on each proceed clicked
  const handleNextPage = async () => {
    const fields = BookSessionInfo[currentPage - 1].field as fieldName[];
    const isValid = await trigger(fields, { shouldFocus: true });
    if (!isValid) return;
    if (currentPage === 4) {
      console.log("entered");
      await handleSubmit(runSubmit)();
    } else {
      setcurrentPage((prev) => prev + 1);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className=" text-white w-full  bg-green-700 rounded-md px-4 py-4 sm:py-4 text-[14px] flex items-center justify-center cursor-pointer">
          Book Session
        </div>
      </DialogTrigger>

      <DialogContent className="sm:w-[900px] bg-stone-100 overflow-x-auto w-full font-subtext">
        <div className="grid gap-4  font-header py-4">
          <ScrollArea className="md:h-[500px] h-[500px]  w-full ">
            <div className=" flex  flex-col md:flex-row gap-3  md:gap-16">
              <ProgressLine
                formArrays={BookSessionInfo}
                currentPage={currentPage}
                setcurrentPage={setcurrentPage}
              />
              <form onSubmit={handleSubmit(runSubmit)} className=" flex-1">
                {/* conditionaly rendering each form */}
                {currentPage === 1 ? (
                  <Details
                    watch={watch}
                    register={register}
                    errors={errors}
                    control={control}
                    clearErrors={clearErrors}
                    setValue={setValue}
                    getValues={getValues}
                  />
                ) : currentPage === 2 ? (
                  <ChildDetails
                    watch={watch}
                    register={register}
                    errors={errors}
                    control={control}
                    clearErrors={clearErrors}
                    setValue={setValue}
                    getValues={getValues}
                  />
                ) : currentPage === 3 ? (
                  <Scheduling
                    watch={watch}
                    register={register}
                    errors={errors}
                    control={control}
                    clearErrors={clearErrors}
                    setValue={setValue}
                    getValues={getValues}
                  />
                ) : (
                  <Payment
                    watch={watch}
                    register={register}
                    errors={errors}
                    control={control}
                    clearErrors={clearErrors}
                    setValue={setValue}
                    getValues={getValues}
                    method={method}
                    setmethod={setMethod}
                  />
                )}
                <ControlBtn
                  currentPage={currentPage}
                  handleNextPage={handleNextPage}
                  method={method}
                  sessionId={sessionId}
                />
              </form>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookSession;
