import Image from "next/image";
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

interface DocumentUploadProps {
  OnclickDocumentInfo: () => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ OnclickDocumentInfo }) => {
  return (
    <section className="py-[1rem] font-header md:pt-[3rem]">
      <Container>
      <div className="flex my-6 justify-between ml-[0] md:ml-[40px]">
            <p className="font-bold text-lg">Details</p>
            <Link href="/teacher-dashboard/finance" className="cursor-pointer"> 
            <Image src="/closeAlt.svg" alt="cancel" width={100} height={100} className="w-[20px] h-[20px]"  />
            </Link>
           
           
        </div>
       
       
        <div className="flex flex-col md:flex-row ml-[0] md:ml-[40px] mb-[50px]">
          <div>
            <div className="flex gap-10">
              <span className="bg-[#359C71] text-[13px] rounded-[50%] px-[10px] text-white">
                1
              </span>
              <p className="text-[#359C71] font-bold">Document Upload</p>
            </div>
            <p className="border-l-2 border-[#E9ECEB] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#E9ECEB] rounded-full px-[7px] text-white">
                2
              </span>
              <p className="">Take Photo</p>
            </div>
          </div>

          <form className="pl-[0] md:pl-[100px] mt-[40px] md:mt-[0]">
            <label className="font-bold text-[16px]">Complete Your KYC verification</label>
            <p className="md:w-[450px] text-[13.5px] py-2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
            <Select>
              <SelectTrigger className="md:w-[450px] my-2 h-[60px] w-[330px] p-4">
                <SelectValue placeholder="Select Document Type" />
              </SelectTrigger>

              <SelectContent className=" font-subtext font-medium">
                
                  <SelectGroup>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="docx">docx</SelectItem>
                    <SelectItem value="txt">Txt</SelectItem>
                   
                   
                  </SelectGroup>
               
              </SelectContent>
            </Select>
           
            <br />
            <div className=" w-full rounded-md h-[60px] font-header border bg-white flex items-center text-black justify-between px-2 ">
            <div className=" w-[50px] cursor-pointer font-bold aspect-square rounded-full flex items-center justify-center">
            <RiAttachment2 className="text-[20px]" />
      </div>
      <input
      type="file"
        placeholder="Upload Document"
        className=" w-full text-[14px] text-black bg-transparent focus:outline-none"
      />
     
    </div>
           
           
            <Button
              onClick={OnclickDocumentInfo}
              className="bg-secondary w-full hover:bg-green-800 text-white text-[16px] px-6 py-7 my-3"
            >
              Proceed
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
};
export default DocumentUpload;
