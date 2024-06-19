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

const ParentAccount = () => {
  const [currentPage, setcurrentPage] = useState<number>(1);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
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
          <form onSubmit={handleSubmit} className=" flex-1">
            {/* conditionaly rendering each form */}
            {currentPage === 1 ? (
              <ParentInfo />
            ) : currentPage === 2 ? (
              <ParentWardAccess />
            ) : (
              <ParentWardProfileData />
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
