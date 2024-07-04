"use client";
import { useState } from "react";
import SchoolInfo from "./ui/school-login/SchoolInfo";
import SchoolPersonalInfo from "./ui/school-login/SchoolPersonalInfo";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import ProgressLine from "./ui/PrograssLine";
import { SubmitHandler, useForm } from "react-hook-form";
import { SchoolMoreInfo, schoolSchema } from "@/constants/completeReg";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Container from "./Container";
import Footer from "./Footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

export type Ischool = z.infer<typeof schoolSchema>;

const SchoolAccout: React.FC = () => {
  const router = useRouter();
  const { update } = useSession();
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [loading, setloading] = useState<boolean>(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    trigger,
    control,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<Ischool>({
    resolver: zodResolver(schoolSchema),
  });

  const runSubmit: SubmitHandler<Ischool> = async (data) => {
    setloading(true);
    const response = await fetch("/api/continue-sch-reg", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        banner: "the student banner here",
      }),
    });
    if (response.ok) {
      update({ CompletedProfile: true });
      router.push("/school-dashboard");
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

  type fieldName = keyof Ischool;
  // function to validate form on each proceed clicked
  const handleNextPage = async () => {
    const fields = SchoolMoreInfo[currentPage - 1].field as fieldName[];
    const isValid = await trigger(fields, { shouldFocus: true });
    if (!isValid) return;
    if (currentPage === 2) {
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
        <div className=" flex flex-col sm:flex-row flex-1  sm:gap-16">
          <ProgressLine
            formArrays={SchoolMoreInfo}
            currentPage={currentPage}
            setcurrentPage={setcurrentPage}
          />
          <form onSubmit={handleSubmit(runSubmit)} className=" flex-1">
            {/* conditionaly rendering each form */}
            {currentPage === 1 ? (
              <SchoolInfo
                register={register}
                errors={errors}
                control={control}
                watch={watch}
                clearErrors={clearErrors}
              />
            ) : (
              <SchoolPersonalInfo
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
              className="bg-secondary w-full md:w-[55%] text-white text-[16px] px-6 py-7 my-3"
            >
              {currentPage < 2 ? "Proceed" : submittingState()}
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

export default SchoolAccout;
