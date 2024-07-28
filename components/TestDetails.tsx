"use client";
import React, { useState } from "react";
import TestType from "./TestType";
import TestPaper from "./TestPaper";
import TestSettings from "./TestSettings";
import TestFinalization from "./TestFinalization";
import { Iexam, examSchema } from "@/constants/exams";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ProgressLine from "./ui/PrograssLine";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

// lets infer the for our zoc Resolver
export type IexamZod = z.infer<typeof examSchema>;

const TestDetails = () => {
  const [currentPage, setcurrentPage] = useState<number>(1);
  // registering our hookform
  const {
    register,
    clearErrors,
    formState: { errors },
    setValue,
    getValues,
    watch,
    control,
    trigger,
    handleSubmit,
  } = useForm<IexamZod>({ resolver: zodResolver(examSchema) });

  const runSubmit = (data: IexamZod) => {
    console.log(data);
  };

  type fieldName = keyof IexamZod;
  // function to validate form on each proceed clicked
  const handleNextPage = async () => {
    const fields = Iexam[currentPage - 1].field as fieldName[];
    const isValid = await trigger(fields, { shouldFocus: true });
    console.log(isValid);
    if (!isValid) return;
    if (currentPage === 4) {
      await handleSubmit(runSubmit)();
    } else {
      setcurrentPage((prev) => prev + 1);
    }
  };

  return (
    <Container>
      <div className="flex justify-between items-center mb-5">
        <span className="font-bold">Details</span>
        <Link
          href="/teacher-dashboard/test-and-resources"
          className="cursor-pointer"
        >
          <Image src="/closeAlt.svg" alt="cancel" width={15} height={15} />
        </Link>
      </div>
      <div className="flex flex-col md:flex-row mb-[50px] gap-20">
        <ProgressLine
          formArrays={Iexam}
          currentPage={currentPage}
          setcurrentPage={setcurrentPage}
        />
        <form className=" flex flex-col gap-2">
          {currentPage === 1 ? (
            <TestType
              register={register}
              errors={errors}
              clearErrors={clearErrors}
              setValue={setValue}
              watch={watch}
              control={control}
              getValues={getValues}
            />
          ) : currentPage === 2 ? (
            <TestPaper
              register={register}
              errors={errors}
              clearErrors={clearErrors}
              setValue={setValue}
              watch={watch}
              control={control}
              getValues={getValues}
            />
          ) : currentPage === 3 ? (
            <TestSettings />
          ) : (
            <TestFinalization />
          )}
          <Button
            onClick={handleNextPage}
            type="button"
            className="bg-secondary w-full text-white text-[16px] px-6 py-7 my-5"
          >
            Proceed
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default TestDetails;
