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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCloudinary } from "@/data-access/cloudinary";

export type IteacherOneOnOne = z.infer<typeof oneOnOneSectionSchema>;

export const TeacherOneOnOne: React.FC = () => {
  const [loading, setloading] = useState<boolean>(false);
  const [currentPage, setcurrentPage] = useState<number>(1);
  const { imageUpload } = useCloudinary();

  const {
    register,
    handleSubmit,
    trigger,
    control,
    watch,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<IteacherOneOnOne>({
    resolver: zodResolver(oneOnOneSectionSchema),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["teacher"],
    mutationFn: async (data: IteacherOneOnOne) => {
      console.log("Please work na", data);
      const result = await fetch("/api/one-on-one-section", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          minPrice: Number(data.minPrice),
          maxPrice: Number(data.maxPrice),
        }),
      });
      return result;
    },
    onSuccess: async (result) => {
      queryClient.invalidateQueries({ queryKey: ["teacherProfile"] });
      if (result.ok) {
        const body = await result.json();
        setloading(false);
        reset();
        return toast.success("Session profile edited successfully");
      } else {
        setloading(false);
        return toast.error("Error editing session profile");
      }
    },
  });

  // const submittingState = (): string => {
  //   if (loading === false) {
  //     return "Submit";
  //   }
  //   return "Editing profile...";
  // };

  const runSubmit: SubmitHandler<IteacherOneOnOne> = async (data) => {
    setloading(true);

    // const teacherProfileBlob = new Blob([data.teacherImg[0]]);
    // const teacherProfileUrl = await imageUpload(teacherProfileBlob);
    // data.teacherImg = teacherProfileUrl;
    // mutation.mutate(data);
  };

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
        <form onSubmit={handleSubmit(runSubmit)}>
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
          <div>
            <Button
              onClick={handleNextPage}
              type="button"
              className={`bg-secondary text-white text-[16px] py-7 my-3 ${
                currentPage < 3 ? "w-full" : "w-1/2"
              }`}
            >
              {currentPage < 3 ? "Proceed" : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
