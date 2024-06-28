import Image from "next/image";
import React from "react";
import {
  UseFormClearErrors,
  UseFormRegister,
  FieldErrors,
  Control,
  Controller,
  UseFormWatch,
} from "react-hook-form";
import Link from "next/link";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoMdAttach } from "react-icons/io";
import { RiAttachment2 } from "react-icons/ri";
import { Ikyc } from "@/components/KYC";

export interface IKycSub {
  register: UseFormRegister<Ikyc>;
  errors: FieldErrors<Ikyc>;
  control?: Control<Ikyc>;
  clearErrors: UseFormClearErrors<Ikyc>;
  watch: UseFormWatch<Ikyc>;
}

const DocumentUpload: React.FC<IKycSub> = ({
  register,
  errors,
  control,
  watch,
  clearErrors,
}) => {
  watch("documentType");
  watch("documentUpload");
  return (
    <section className="py-[1rem] font-header md:pt-[3rem]">
      <Container>
        <h3 className="font-bold text-[18px] ">
          Complete Your KYC Verification
        </h3>

        <p className="md:w-[450px] text-[13.5px] py-2">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Lorem ipsum dolor sit amet, consectetuer
          adipiscing elit.
        </p>

        <Controller
          control={control}
          name="documentType"
          render={({ field }) => (
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                clearErrors("documentType");
              }}
            >
              <SelectTrigger className="md:w-[450px] my-2 h-[60px] w-[330px] p-4">
                <SelectValue placeholder="Select Document Type" />
              </SelectTrigger>

              <SelectContent className=" font-subtext font-medium">
                <SelectGroup>
                  <SelectItem value="pdf">pdf</SelectItem>
                  <SelectItem value="docx">docx</SelectItem>
                  <SelectItem value="txt">txt</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.documentType && (
          <small className="text-red-600">{errors.documentType.message}</small>
        )}
        <br />
        <div
          className={`flex items-center md:w-[450px] h-[60px] w-[330px] bg-[#FFFFFF] py-4 pl-2 my-2 rounded-[8px]`}
        >
          <input
            type="file"
            {...register("documentUpload")}
            name="documentUpload"
            placeholder="Upload Document"
            className=" w-full text-[14px] text-black bg-transparent focus:outline-none"
          />
        </div>
      </Container>
    </section>
  );
};
export default DocumentUpload;
