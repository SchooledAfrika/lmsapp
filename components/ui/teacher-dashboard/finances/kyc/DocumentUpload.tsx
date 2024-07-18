import Image from "next/image";
import React from "react";
import {
  UseFormClearErrors,
  UseFormRegister,
  FieldErrors,
  Control,
  Controller,
  UseFormWatch,
  UseFormSetValue
 
} from "react-hook-form";

import Link from "next/link";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import PreviewItem from "@/components/ui/PreviewItem";
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
  setValue: UseFormSetValue<Ikyc>;
}

const DocumentUpload: React.FC<IKycSub> = ({
  register,
  errors,
  control,
  watch,
  clearErrors,
  setValue,
}) => {
  const [docImg, setDocImg] = useState<string | undefined>(undefined);
  
  // handles remove image that is already present
  // if the user decides to remove it
  const handleRemove = () => {
    setDocImg(undefined);
    setValue("docImg", "");
  };
  // the function to generate a url for the picture
  const handleShowPix = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setValue("docImg", e.target.files);
    const blob = new Blob([file]);
    const localUrl = URL.createObjectURL(blob);
    setDocImg(localUrl);
    clearErrors("docImg");
  };
  return (
    <section className="py-[1rem] font-header md:pt-[3rem]">
      <Container>
        <h3 className="font-bold text-[18px] ">
          Complete Your KYC Verification
        </h3>

        <p className="md:w-[450px] text-[13.5px] py-2">
       
        Provide a valid means of identification.

        </p>

        <Controller
          control={control}
          name="docType"
          render={({ field }) => (
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                clearErrors("docType");
              }}
            >
              <SelectTrigger className="md:w-[450px] my-2 h-[60px] w-[330px] p-4">
                <SelectValue placeholder="Select Document Type" />
              </SelectTrigger>

              <SelectContent className=" font-subtext font-medium">
                <SelectGroup>
                  <SelectItem value="NIN">NIN</SelectItem>
                  <SelectItem value="dLicence">Driver's License</SelectItem>
                  <SelectItem value="vCard">Voter's Card</SelectItem>
                  <SelectItem value="intPassport">International Passport</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.docType && (
          <small className="text-red-600">{errors.docType.message}</small>
        )}
        <br />
        {docImg === undefined ? (
        <div
          className={`flex items-center md:w-[450px] h-[60px] w-[330px] bg-[#FFFFFF] py-4 pl-2 my-2 rounded-[8px]`}
        >
          <input
            type="file"
            multiple={false}
            accept="image/*"
            onChange={handleShowPix}
            name="docImg"
            placeholder="Upload Document"
            className=" w-full text-[14px] text-black bg-transparent focus:outline-none"
          />
           {errors.docImg && (
                    <small className="text-red-600">
                      {String(errors.docImg.message)}
                    </small>
                  )}
        </div>
         ) : (
          <PreviewItem  handleRemove={handleRemove} imageItem={docImg} />
        )}
      </Container>
    </section>
  );
};
export default DocumentUpload;
