import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../button";
import Footer from "@/components/Footer";

interface TeacherResumeProps {
  onClickButton: (view: any) => void;
}

const TeacherResume: React.FC<TeacherResumeProps> = ({ onClickButton }) => {
  const handlePaymentView = () => {
    onClickButton("Payment Details");
  };
  return (
    <section className="py-[1rem] font-subtext md:pt-[3rem]">
      <Container>
        <Link href="/">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={100}
            height={100}
            className="w-[100px] ml-10 "
          />
        </Link>
        <p className="font-bold text-[18px] pt-[40px] pb-[60px] pl-[0] md:pl-[40px]">
          Complete Account Creation
        </p>
        <div className="flex flex-col md:flex-row ml-[0] md:ml-[40px] mb-[50px]">
          <div>
            <div className="flex gap-10">
              <span className="bg-[#359C71] rounded-[50%] px-[7px] text-white">
                1
              </span>
              <p className="text-[#359C71] font-bold">Personal Information</p>
            </div>
            <p className="border-l-2 border-[#359C71] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#359C71] rounded-full px-[7px] text-white">
                2
              </span>
              <p className="text-[#359C71] font-bold">
                Resume & Qualifications
              </p>
            </div>
            <p className="border-l-2 border-[#E9ECEB] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#E9ECEB] rounded-full px-[7px] text-white">
                3
              </span>
              <p>Payment Details</p>
            </div>
            <p className="border-l-2 border-[#E9ECEB] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#E9ECEB] rounded-full px-[7px] text-white">
                4
              </span>
              <p>Payment Details</p>
            </div>
          </div>

          <form className="pl-[0] md:pl-[100px] mt-[40px] md:mt-[0]">
            <label className="font-bold text-[18px]">
              Resume & Qualifications
            </label>

            <div className="flex items-center bg-[#FFFFFF] py-4 w-full pl-2 my-2 rounded">
              <Image
                src="/svgs/upload.svg"
                width={15}
                height={15}
                alt="UplaodImage"
              />
              <div>
                <label htmlFor="file-upload" className="cursor-pointer ml-2">
                  <span className="bg-transparent py-1 pr-2 text-[12px] font-medium">
                    Upload Resume
                  </span>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  name="upload"
                  className="hidden"
                />
              </div>
            </div>

            <textarea
              rows={7}
              cols={35}
              className="w-full p-2"
              placeholder="About Yourself as a tutor"
            ></textarea>

            <Button
              onClick={handlePaymentView}
              className="bg-secondary w-full text-white text-[16px] px-6 py-7 my-3"
            >
              Proceed
            </Button>
          </form>
        </div>
        <Footer />
      </Container>
    </section>
  );
};

export default TeacherResume;
