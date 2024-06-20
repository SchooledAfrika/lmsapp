"use client";
import React, { FormEvent, useState } from "react";
import ParentInfo from "./ui/continue/ParentInfo";
import ParentWardAccess from "./ui/continue/ParentWardAccess";
import ParentWardProfileData from "./ui/continue/ParentWardProfileData";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";
import Footer from "./Footer";
import ProgressLine from "./ui/PrograssLine";
import { ParentsMoreInfo } from "@/constants/completeReg";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FILE } from "dns";
export const parentSchema = z
  .object({
    name: z.string().min(3, { message: "enter your name" }),
    gender: z.enum(["Male", "Female"], {
      message: "you can only enter male or female as gender",
    }),
    phoneNo: z.string().min(5, { message: "enter your phone number" }),
    address: z
      .string()
      .min(5, { message: "enter valid parmanent address please" }),
    profilePhoto: z.string({ message: "enter pix" }),
    wardId: z.string().min(4, { message: "enter a valid id" }),
    password: z
      .string()
      .min(8, { message: "password must be at least 8 characters" }),
    confirmPassword: z.string(),
    wardName: z.string().min(4, { message: "enter a valid name" }),
    wardGender: z.enum(["Male", "Female"], {
      message: "you can only enter male or female as gender",
    }),
    grade: z.string({ message: "enter grade" }),
    disable: z.boolean({ message: "select the field above" }),
    details: z.string({ message: "fill the field above" }),
    childImg: z.string({ message: "enter pix" }),
  })
  .refine((item) => item.password === item.confirmPassword, {
    path: ["confirmPassword"],
    message: "password does not match",
  });

// exporting the parentSchema type above
export type Iparents = z.infer<typeof parentSchema>;

const ParentAccount = () => {
  const [currentPage, setcurrentPage] = useState<number>(1);
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Iparents>({ resolver: zodResolver(parentSchema) });
  const runSubmit = () => {
    setcurrentPage((page) => page + 1);
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
            formArrays={ParentsMoreInfo}
            currentPage={currentPage}
            setcurrentPage={setcurrentPage}
          />
          <form onSubmit={handleSubmit(runSubmit)} className=" flex-1">
            {/* conditionaly rendering each form */}
            {currentPage === 1 ? (
              <ParentInfo register={register} errors={errors} control={control} />
            ) : currentPage === 2 ? (
              <ParentWardAccess register={register} errors={errors} />
            ) : (
              <ParentWardProfileData register={register} errors={errors} />
            )}
            <Button
              type="submit"
              className="bg-secondary w-[55%] text-white text-[16px] px-6 py-7 my-3"
            >
              {currentPage < 3 ? "Proceed" : "Submit"}
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

export default ParentAccount;
