import Image from "next/image";
import Link from "next/link";
import Container from "../../Container";
import { Button } from "../button";
import Footer from "../../Footer";
import { useState } from "react";

interface SchoolInfoProps {
  onClickSchoolInfo: () => void;
}

const SchoolInfo: React.FC<SchoolInfoProps> = ({ onClickSchoolInfo }) => {
  return (
    <section className="py-[1rem] md:pt-[3rem]">
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
              <p className="text-[#359C71] font-bold">School Information</p>
            </div>
            <p className="border-l-2 border-[#E9ECEB] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#E9ECEB] rounded-full px-[7px] text-white">
                2
              </span>
              <p>Personal Information</p>
            </div>
          </div>

          <form className="pl-[0] md:pl-[100px] mt-[40px] md:mt-[0]">
            <label className="font-bold text-[18px]">School Information</label>
            <input
              type="email"
              name="email"
              placeholder="School or Institute Name"
              className="my-2 p-4 outline-none rounded-[8px] w-full bg-white"
            />
            <br />
            <input
              type="email"
              name="email"
              placeholder="Enter School Address (Optional)"
              className="my-2 p-4 outline-none rounded-[8px] w-full bg-white"
            />
            <div className="flex flex-col justify-center my-3 p-10 outline-none rounded-[8px] w-full bg-white">
              <Link href="/">
                <Image
                  src="/imageIcon.png"
                  alt="logo"
                  width={60}
                  height={60}
                  className="mx-auto"
                />
              </Link>
              <p className="py-4 text-center">School or Institute Cover</p>
              <p className="flex items-center justify-center gap-2 text-[12px]">
                {" "}
                <Image
                  src="/svgs/error.svg"
                  alt="error"
                  width={15}
                  height={15}
                />{" "}
                Note that the cover is visible as a banner to everyone.
              </p>
            </div>
            <Button
              onClick={onClickSchoolInfo}
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
export default SchoolInfo;
