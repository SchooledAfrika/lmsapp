"use client";
import React, { useState } from "react";
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
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { parentSchema } from "@/constants/completeReg";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

// exporting the parentSchema type above
export type Iparents = z.infer<typeof parentSchema>;

const ParentAccount = () => {
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [loading, setloading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();
  const { update, data: session } = useSession();
  const {
    register,
    setValue,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm<Iparents>({ resolver: zodResolver(parentSchema) });
  const runSubmit: SubmitHandler<Iparents> = async (data) => {
    setloading(true);
    // handle file submission to the backend server
    const response = await fetch("/api/continue-parent-reg", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        profilePhoto: "the profile photo",
        childImg: "child image",
      }),
    });
    if (response.ok) {
      await update({ CompletedProfile: true });
      router.push("/parents-dashboard");
      router.refresh();
    } else {
      setloading(false);
      const message = await response.json();
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${message.message}`,
      });
    }
  };

  type fieldName = keyof Iparents;
  // function to validate form on each proceed clicked
  const handleNextPage = async () => {
    const fields = ParentsMoreInfo[currentPage - 1].field as fieldName[];
    const isValid = await trigger(fields, { shouldFocus: true });
    if (!isValid) return;
    if (currentPage === 3) {
      await handleSubmit(runSubmit)();
    } else {
      setcurrentPage((prev) => prev + 1);
    }
  };

  // function to display submiting
  const submittingState = (): string => {
    if (loading === false) {
      return "Submit";
    }
    return "Waiting for approval...";
  };

  return (
    <section className="py-[1rem] px-3 font-subtext md:pt-[3rem]">
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
        <div className=" flex flex-col sm:flex-row  sm:gap-16">
          <ProgressLine
            formArrays={ParentsMoreInfo}
            currentPage={currentPage}
            setcurrentPage={setcurrentPage}
          />
          <form onSubmit={handleSubmit(runSubmit)} className=" flex-1">
            {/* conditionaly rendering each form */}
            {currentPage === 1 ? (
              <ParentInfo
                register={register}
                errors={errors}
                control={control}
              />
            ) : currentPage === 2 ? (
              <ParentWardAccess
                register={register}
                errors={errors}
                control={control}
              />
            ) : (
              <ParentWardProfileData
                register={register}
                errors={errors}
                control={control}
              />
            )}
            <Button
              onClick={handleNextPage}
              type="button"
              disabled={loading}
              className="bg-secondary w-full md:w-[55%] text-white text-[16px] px-6 py-7 my-3"
            >
              {currentPage < 3 ? "Proceed" : submittingState()}
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
