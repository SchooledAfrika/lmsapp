"use client";
import React, { useState } from "react";
import TeacherSubject from "./TeacherSubject";
import TeacherProfileData from "./TeacherProfileData";
import ProgressLine from "./ui/PrograssLine";
import { Button } from "./ui/button";
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
import { useRouter } from "next/navigation";
import Backwards from "./ui/Backwards";

export type IteacherOneOnOne = z.infer<typeof oneOnOneSectionSchema>;

export const TeacherOneOnOne: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    trigger,
    control,
    watch,
    reset,
    clearErrors,
    formState: { errors },
    getValues,
  } = useForm<IteacherOneOnOne>({
    resolver: zodResolver(oneOnOneSectionSchema),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["teacher"],
    mutationFn: async (data: IteacherOneOnOne) => {
      const result = await fetch("/api/one-on-one-section", {
        method: "POST",
        body: JSON.stringify({
          ...data,
        }),
      });
      return result;
    },
    onSuccess: async (result) => {
      const info = await result.json();
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["teacherProfile"] });
      // if everything was successful
      if (result.ok) {
        reset();
        toast.success("Session profile edited successfully");
        setTimeout(() => {
          router.push("/teacher-dashboard/one-on-one-section");
        }, 4000);
      }
      // if there is no kyc
      if (result.status === 401) {
        return toast.error(info.message);
      }
    },
  });

  const runSubmit: SubmitHandler<IteacherOneOnOne> = async (data) => {
    setLoading(true);
    mutation.mutate(data);
  };

  type fieldName = keyof IteacherOneOnOne;
  const handleNextPage = async () => {
    const fields = TeacherOneOnOneSection[currentPage - 1].field as fieldName[];
    const isValid = await trigger(fields, { shouldFocus: true });
    if (!isValid) return;
    if (currentPage === 2) {
      await handleSubmit(runSubmit)();
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-between items-center mb-5">
        <span className="font-bold">Details</span>
        <Link
          href="/teacher-dashboard/one-on-one-section"
          className="cursor-pointer"
        >
          <Backwards />
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-[60px]">
        <ProgressLine
          formArrays={TeacherOneOnOneSection}
          currentPage={currentPage}
          setcurrentPage={setCurrentPage}
        />
        <form onSubmit={handleSubmit(runSubmit)}>
          {currentPage === 1 ? (
            <TeacherProfileData
              errors={errors}
              watch={watch}
              register={register}
              control={control}
              clearErrors={clearErrors}
              getValues={getValues}
            />
          ) : (
            <TeacherSubject
              errors={errors}
              watch={watch}
              register={register}
              control={control}
              clearErrors={clearErrors}
              getValues={getValues}
            />
          )}
          <div>
            <Button
              onClick={handleNextPage}
              type="button"
              className={`bg-secondary text-white text-[16px] py-7 my-3 w-full`}
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : currentPage < 2
                ? "Proceed"
                : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
