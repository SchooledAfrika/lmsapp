"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Container from "@/components/Container";
import Link from "next/link";
import { IKycSub } from "./DocumentUpload";

const TakePicture: React.FC<IKycSub> = ({
  register,
  errors,
  control,
  clearErrors,
  watch,
}) => {
  return (
    <section className="py-[1rem] font-header md:pt-[3rem]">
      <Container>
        <h3 className="font-bold text-[18px] ">
          Complete Your KYC Verification
        </h3>
        <p className="md:w-[450px] text-[13.5px] py-2">
       
        We want to be sure it's you.
        Upload or take a recent picture.
        </p>

        <br />

        <div className=" w-full rounded-md  font-header  bg-transparent flex items-center text-black justify-between px-2 ">
          <div className=" w-[150px] bg-dimWhite cursor-pointer mr-3 text-[13px] aspect-square rounded-full flex items-center  justify-center">
            <div className="w-[100px] h-[100px] bg-dimWhite rounded-full pt-6 text-center">
              Image
            </div>
          </div>
          <input
            type="file"
            name="verifiedImg"
            placeholder="Upload Document"
            className=" w-full text-[14px] text-black bg-transparent focus:outline-none"
          />
        </div>
      </Container>
    </section>
  );
};
export default TakePicture;
