"use client";
import React, { useState } from "react";
import WardsDetail from "./ui/parent-dashoard/teachers/request-teacher/WardsDetail";
import TeacherRequest from "./ui/parent-dashoard/teachers/request-teacher/TeacherRequest";
import ProgressLine from "./ui/PrograssLine";
import Image from "next/image"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RequestTeacherInfo, requestTeacherSchema } from "@/constants/teacherRequest";

export type IrequestTeacher = z.infer<typeof requestTeacherSchema>;

const RequestTeacher: React.FC = () => {
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
  } = useForm<IrequestTeacher>({
    resolver: zodResolver(requestTeacherSchema),
  });

  const runSubmit: SubmitHandler<IrequestTeacher> = async (data) => {
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

  type fieldName = keyof IrequestTeacher;
  // function to validate form on each proceed clicked
  const handleNextPage = async () => {
    const fields = RequestTeacherInfo[currentPage - 1].field as fieldName[];
    const isValid = await trigger(fields, { shouldFocus: true });
    if (!isValid) return;
    if (currentPage === 2) {
      await handleSubmit(runSubmit)();
    } else {
      setcurrentPage((prev) => prev + 1);
    }
  };
 

  return (
    <div className="mx-auto">
    <div className="flex md:mt-6 mb-12 mt-24 justify-between ml-[0] md:ml-[40px]">
       <p className="font-bold text-lg">Details</p>
       <Link href="/parents-dashboard/teachers" className="cursor-pointer"> 
       <Image src="/closeAlt.svg" alt="cancel" width={100} height={100} className="w-[20px] h-[20px]"  />
       </Link>
      
      
   </div>
  
   
   {/* the div holding both the form progress and the form */}
    {/* the form contains each form based on the state number above */}
   <div className=" flex flex-col md:flex-row gap-3 md:gap-16">
     <ProgressLine
       formArrays={RequestTeacherInfo}
       currentPage={currentPage}
       setcurrentPage={setcurrentPage}
     />
     <form onSubmit={handleSubmit(runSubmit)} className=" flex-1">
       {/* conditionaly rendering each form */}
       {currentPage === 1 ? (
         <WardsDetail
           register={register}
           errors={errors}
           control={control}
           watch={watch}
           clearErrors={clearErrors}
         />
       ) : (
         <TeacherRequest
           register={register}
           errors={errors}
           control={control}
           watch={watch}
           clearErrors={clearErrors}
         />
       )}
       <Button
         onClick={handleNextPage}
         type="button"
         className="bg-secondary md:w-[450px]  h-[60px] w-[330px] hover:bg-green-800 text-white text-[16px] ml-4  py-7 my-2"
       >
         {currentPage < 2 ? "Proceed" : "Submit"}
       </Button>

       <Button
              variant="outline"
              asChild
              className="border-2 border-lightGreen hover:text-green-700 md:w-[450px]  h-[60px] w-[330px] ml-4 text-lightGreen text-[15px] px-6 py-7 my-3"
            >
              <Link href="" className="font-bold ">
                Select Another Ward
              </Link>
            </Button>
     </form>
   </div>
 </div>
 
  );
};

export default RequestTeacher;
