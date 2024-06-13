import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../button";
import Footer from "@/components/Footer";

const StudentProfileData = () => {
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
              <p className="text-[#359C71] font-bold">Profile Data</p>
            </div>
          </div>

          <form className="pl-[0] md:pl-[100px] mt-[40px] md:mt-[0]">
            <label className="font-bold text-[18px]">Profile Data</label>
            <div className="flex flex-col w-[30vw]">
              <input
                type="text"
                name="text"
                placeholder="Select Grade(s)"
                className="my-2 p-4 outline-none  rounded-[8px]  bg-white"
              />
              <textarea
                rows={7}
                cols={35}
                className=" p-2"
                placeholder="Tell us about yourself"
              ></textarea>

              <Button className="bg-secondary  text-white text-[16px] px-6 py-7 my-3">
                Proceed
              </Button>
            </div>
          </form>
        </div>
        <Footer />
      </Container>
    </section>
  );
};

export default StudentProfileData;
