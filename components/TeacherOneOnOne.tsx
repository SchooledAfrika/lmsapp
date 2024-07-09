"use client";
import React, { useState } from "react";
import TeacherSubject from "./TeacherSubject";
import TeacherProfileData from "./TeacherProfileData";
import TeacherPrice from "./TeacherPrice";
import ProgressLine from "./ui/PrograssLine";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  oneOnOneSectionSchema,
  TeacherOneOnOneSection,
} from "@/constants/teacherOneOnOne";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type IteacherOneOnOne = z.infer<typeof oneOnOneSectionSchema>;

export const TeacherOneOnOne: React.FC = () => {
  // const [loading, setloading] = useState<boolean>(false);
  const [currentPage, setcurrentPage] = useState<number>(1);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<IteacherOneOnOne>({
    resolver: zodResolver(oneOnOneSectionSchema),
  });

  // const submittingState = (): string => {
  //   if (loading === false) {
  //     return "Submit";
  //   }
  //   return "Editing profile...";
  // };

  const runSubmit: SubmitHandler<IteacherOneOnOne> = async () => {};

  type fieldName = keyof IteacherOneOnOne;
  const handleNextPage = async () => {
    const fields = TeacherOneOnOneSection[currentPage - 1].field as fieldName[];
    const isValid = await trigger(fields, { shouldFocus: true });
    if (!isValid) return;
    if (currentPage === 3) {
      await handleSubmit(runSubmit)();
    } else {
      setcurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <span className="font-bold">Details</span>
        <Link
          href="/teacher-dashboard/one-on-one-section"
          className="cursor-pointer"
        >
          <Image src="/closeAlt.svg" alt="cancel" width={15} height={15} />
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-[60px]">
        <ProgressLine
          formArrays={TeacherOneOnOneSection}
          currentPage={currentPage}
          setcurrentPage={setcurrentPage}
        />
        <form>
          {currentPage === 1 ? (
            <TeacherProfileData
              errors={errors}
              watch={watch}
              register={register}
              control={control}
              clearErrors={clearErrors}
            />
          ) : currentPage === 2 ? (
            <TeacherSubject
              errors={errors}
              watch={watch}
              register={register}
              control={control}
              clearErrors={clearErrors}
            />
          ) : (
            <TeacherPrice
              errors={errors}
              watch={watch}
              register={register}
              control={control}
              clearErrors={clearErrors}
            />
          )}
          <Button
            onClick={handleNextPage}
            type="button"
            // disabled={loading}
            className="bg-secondary w-[60%] md:w-full text-white text-[16px] py-7 my-3"
          >
            {currentPage < 3 ? "Proceed" : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};
