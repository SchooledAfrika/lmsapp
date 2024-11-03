"use client";
import React, { useState } from "react";
import WardsDetail from "./ui/parent-dashoard/teachers/request-teacher/WardsDetail";
import TeacherRequest from "./ui/parent-dashoard/teachers/request-teacher/TeacherRequest";
import ProgressLine from "./ui/PrograssLine";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SubmitHandler, useForm, UseFormGetFieldState } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  RequestTeacherInfo,
  requestTeacherSchema,
} from "@/constants/teacherRequest";
import CompletePayment from "./SpecialRequest";
export type IrequestTeacher = z.infer<typeof requestTeacherSchema>;

// component for completing payment fully below here

// conponent for each summary field
const SummaryField: React.FC<{ name: string; value: string }> = ({
  name,
  value,
}) => {
  return (
    <div className=" flex flex-col text-[12px] leading-tight ">
      <p>{name}</p>
      <div className=" w-full rounded-md bg-white border border-slate-500 py-2 overflow-hidden px-1 cursor-not-allowed">
        {value}
      </div>
    </div>
  );
};
// here we will render page that summarize everything before submitting for payment
const PaySummary: React.FC<{
  getValues: UseFormGetFieldState<IrequestTeacher>;
}> = ({ getValues }) => {
  return (
    <div className=" w-full md:w-[55%]  rounded-lg px-2 py-3 shadow-md flex flex-col items-center border gap-3">
      <p className=" text-black font-semibold">Summary</p>
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-2 ">
        <SummaryField name="ward name" value={`${getValues("wardName")}`} />
        <SummaryField name="grade" value={`${getValues("grade")}`} />
        <SummaryField name="gender" value={`${getValues("gender")}`} />
        <SummaryField name="subject" value={`${getValues("selectSubject")}`} />
        <SummaryField name="time" value={`${getValues("classSchedule")}`} />
        <SummaryField
          name="language"
          value={`${getValues("selectLanguage")}`}
        />
      </div>
      <div>
        <p className=" text-green-800 font-semibold">total: $30</p>
      </div>
    </div>
  );
};

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
    getValues,
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
    return setcurrentPage((prev) => prev + 1);
  };

  return (
    <div className="mx-auto">
      <div className="flex md:mt-6 mb-12 mt-24 justify-between ml-[0] md:ml-[40px]">
        <p className="font-bold text-lg">Details</p>
        <Link href="/parents-dashboard/teachers" className="cursor-pointer">
          <Image
            src="/closeAlt.svg"
            alt="cancel"
            width={100}
            height={100}
            className="w-[20px] h-[20px]"
          />
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
              setValue={setValue}
            />
          ) : currentPage === 2 ? (
            <TeacherRequest
              register={register}
              errors={errors}
              control={control}
              watch={watch}
              clearErrors={clearErrors}
              setValue={setValue}
            />
          ) : (
            <PaySummary getValues={getValues} />
          )}
          {currentPage < 3 ? (
            <Button
              onClick={handleNextPage}
              type="button"
              className="bg-secondary w-full md:w-[55%] text-white text-[16px] px-6 py-7 my-3"
            >
              Proceed
            </Button>
          ) : (
            <CompletePayment getValues={getValues} />
          )}
        </form>
      </div>
    </div>
  );
};

export default RequestTeacher;
