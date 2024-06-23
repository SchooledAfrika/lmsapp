"use client";
import React, { useState } from "react";
import StudentInfo from "./ui/student-login/StudentInfo";
import StudentProfileData from "./ui/student-login/StudentProfileData";
import Image from "next/image";
import Link from "next/link";
import ProgressLine from "./ui/PrograssLine";
import { Button } from "./ui/button";
import Container from "./Container";
import Footer from "./Footer";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudentMoreInfo, studentSchema } from "@/constants/completeReg";
import { z } from "zod";

export type Istudent = z.infer<typeof studentSchema>;

const StudentAccount = () => {
  const [currentPage, setcurrentPage] = useState<number>(1);
  const {
    register,
    handleSubmit,
    trigger,
    control,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<Istudent>({
    resolver: zodResolver(studentSchema),
  });

  const runSubmit: SubmitHandler<Istudent> = async (data) => {};

  type fieldName = keyof Istudent;
  // function to validate form on each proceed clicked
  const handleNextPage = async () => {
    const fields = StudentMoreInfo[currentPage - 1].field as fieldName[];
    const isValid = await trigger(fields, { shouldFocus: true });
    if (!isValid) return;
    if (currentPage === 2) {
      await handleSubmit(runSubmit)();
    } else {
      setcurrentPage((prev) => prev + 1);
    }
  };

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
            formArrays={StudentMoreInfo}
            currentPage={currentPage}
            setcurrentPage={setcurrentPage}
          />
          <form onSubmit={handleSubmit(runSubmit)} className=" flex-1">
            {/* conditionaly rendering each form */}
            {currentPage === 1 ? (
              <StudentInfo
                register={register}
                errors={errors}
                control={control}
                watch={watch}
                clearErrors={clearErrors}
              />
            ) : (
              <StudentProfileData
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
              {currentPage < 2 ? "Proceed" : "Submit"}
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

export default StudentAccount;
