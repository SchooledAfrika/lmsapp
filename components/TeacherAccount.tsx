"use client";
import React, { useState } from "react";
import TeacherInfo from "./ui/teacher-login/TeacherInfo";
import TeacherResume from "./ui/teacher-login/TeacherResume";
import TeacherPaymentDetails from "./ui/teacher-login/TeacherPaymentDetails";
import TeacherFinalPaymentDetails from "./ui/teacher-login/TeacherFinalPaymentDetails";
import Link from "next/link";
import Image from "next/image";
import ProgressLine from "./ui/PrograssLine";
import { Button } from "./ui/button";
import Container from "./Container";
import Footer from "./Footer";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { teacherSchema, TeacherMoreInfo } from "@/constants/completeReg";
import { z } from "zod";

export type Iteacher = z.infer<typeof teacherSchema>;
const TeacherAccount = () => {
  const [currentPage, setcurrentPage] = useState<number>(1);
  const {
    register,
    handleSubmit,
    trigger,
    control,
    watch,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<Iteacher>({
    resolver: zodResolver(teacherSchema),
  });

  const runSubmit: SubmitHandler<Iteacher> = async (data) => {
    console.log(data);
  };

  type fieldName = keyof Iteacher;
  // function to validate form on each proceed clicked
  const handleNextPage = async () => {
    const fields = TeacherMoreInfo[currentPage - 1].field as fieldName[];
    const isValid = await trigger(fields, { shouldFocus: true });
    if (!isValid) return;
    if (currentPage === 4) {
      await handleSubmit(runSubmit)();
    } else {
      setcurrentPage((prev) => prev + 1);
    }
  };
  //
  return (
    <section className="py-[1rem] font-subtext md:pt-[3rem]">
      <div className=" max-w-[1150px] mx-auto md:px-16 pt-8">
        <Link href="/">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={100}
            height={100}
            className="w-[80px] ml-10 "
          />
        </Link>
        <p className="font-bold text-[18px] pt-[40px] pb-[60px] pl-[0] md:pl-[40px]">
          Complete Account Creation
        </p>
        {/* the div holding both the form progress and the form */}
        {/* the form contains each form based on the state number above */}
        <div className=" flex flex-col md:flex-row gap-16">
          <ProgressLine
            formArrays={TeacherMoreInfo}
            currentPage={currentPage}
            setcurrentPage={setcurrentPage}
          />
          <form onSubmit={handleSubmit(runSubmit)} className=" flex-1">
            {/* conditionaly rendering each form */}
            {currentPage === 1 ? (
              <TeacherInfo
                register={register}
                errors={errors}
                control={control}
                watch={watch}
                clearErrors={clearErrors}
              />
            ) : currentPage === 2 ? (
              <TeacherResume
                register={register}
                errors={errors}
                control={control}
                watch={watch}
                clearErrors={clearErrors}
              />
            ) : currentPage === 3 ? (
              <TeacherPaymentDetails
                register={register}
                errors={errors}
                control={control}
                watch={watch}
                clearErrors={clearErrors}
                setValue={setValue}
              />
            ) : (
              <TeacherFinalPaymentDetails
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
              className="bg-secondary w-[55%] text-white text-[16px] px-6 py-7 my-3"
            >
              {currentPage < 4 ? "Proceed" : "Submit"}
            </Button>
          </form>
        </div>
      </div>
      <Container>
        <Footer />
      </Container>
    </section>
  );
};

export default TeacherAccount;
