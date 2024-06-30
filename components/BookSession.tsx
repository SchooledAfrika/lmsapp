"use client";

import React, { useState } from "react";
import Duration from "@/components/ui/book-teacher/Duration";
import Payment from "@/components/ui/book-teacher/Payment";
import Scheduling from "@/components/ui/book-teacher/Scheduling";
import SessionDetails from "@/components/ui/book-teacher/SessionDetails";
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
export type Isession = z.infer<typeof sessionbookingSchema>;

const BookSession: React.FC = () => {
  const { data: session, update } = useSession();
  console.log(session?.user);
  const router = useRouter();
  const [currentPage, setcurrentPage] = useState<number>(1);
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    control,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<Isession>({
    resolver: zodResolver(sessionbookingSchema),
  });

  const runSubmit: SubmitHandler<Isession> = async (data) => {
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
      await handleSubmit(runSubmit)();
    } else {
      setcurrentPage((prev) => prev + 1);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" bg-lightGreen  rounded-lg hover:bg-green-500 text-white text-sm mt-6 px-3 w-32 mr-2  py-2 text-center lg:block">
          Book Session
        </Button>
      </DialogTrigger>
     
      <DialogContent className="sm:w-[800px] bg-stone-100 overflow-x-auto    w-full font-subtext">
     
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
                <Duration
                  register={register}
                  errors={errors}
                  control={control}
                  
                />
              ) : currentPage === 2 ? (
                <SessionDetails
                  register={register}
                  errors={errors}
                  control={control}
                  
                />
              ) : currentPage === 3 ? (
                <Scheduling
                  register={register}
                  errors={errors}
                  control={control}
                  
                />
              ) :  (
                <Payment
                  register={register}
                  errors={errors}
                  control={control}
                  
                />
              )}
              <Button
                onClick={handleNextPage}
                type="button"
                className="px-8 py-3 md:my-2 my-4 flex md:w-28 w-full md:justify-end float-right bg-lightGreen hover:bg-green-700"
              >
                {currentPage < 4 ? "Proceed" : "Submit"}
              </Button>
            </form>
           
          </div>
          </ScrollArea>
        </div>
      </DialogContent>
    
    </Dialog>
  );
};

export default BookSession;
