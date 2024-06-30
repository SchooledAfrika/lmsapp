"use client";
import React, { useState } from "react";
import DocumentUpload from "./ui/teacher-dashboard/finances/kyc/DocumentUpload";
import TakePicture from "./ui/teacher-dashboard/finances/kyc/TakePicture";
import Image from "next/image";
import Link from "next/link";
import ProgressLine from "./ui/PrograssLine";
import { Button } from "./ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { KycInfo, kycSchema } from "@/constants/kyc";

export type Ikyc = z.infer<typeof kycSchema>;


const KYC: React.FC = () => {
  const { data: session, update } = useSession();
  console.log(session?.user);
  const router = useRouter();
  const [currentPage, setcurrentPage] = useState<number>(1);
  const {
    register,
    handleSubmit,
    trigger,
    control,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<Ikyc>({
    resolver: zodResolver(kycSchema),
  });

  const runSubmit: SubmitHandler<Ikyc> = async (data) => {
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

  type fieldName = keyof Ikyc;
  // function to validate form on each proceed clicked
  const handleNextPage = async () => {
    const fields = KycInfo[currentPage - 1].field as fieldName[];
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
            <Link href="/teacher-dashboard/finance" className="cursor-pointer"> 
            <Image src="/closeAlt.svg" alt="cancel" width={100} height={100} className="w-[20px] h-[20px]"  />
            </Link>
           
           
        </div>
       
        
        {/* the div holding both the form progress and the form */}
         {/* the form contains each form based on the state number above */}
        <div className=" flex flex-col md:flex-row gap-3 md:gap-16">
          <ProgressLine
            formArrays={KycInfo}
            currentPage={currentPage}
            setcurrentPage={setcurrentPage}
          />
          <form onSubmit={handleSubmit(runSubmit)} className=" flex-1">
            {/* conditionaly rendering each form */}
            {currentPage === 1 ? (
              <DocumentUpload
                register={register}
                errors={errors}
                control={control}
                watch={watch}
                clearErrors={clearErrors}
              />
            ) : (
              <TakePicture
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
          </form>
        </div>
      </div>
      
    
  );
};

export default KYC;
