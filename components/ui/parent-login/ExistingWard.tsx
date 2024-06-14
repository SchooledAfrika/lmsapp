import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../button";
import Footer from "@/components/Footer";

const Existingward = () => {
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
              <p className="text-[#359C71] font-bold">Wards Account Access</p>
            </div>
            <p className="border-l-2 border-[#359C71] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#359C71] rounded-full px-[7px] text-white">
                3
              </span>
              <p className="text-[#359C71] font-bold">Wards Profile Data</p>
            </div>
          </div>

          <form className="pl-[0] md:pl-[100px] mt-[40px] md:mt-[0] w-full md:w-[50%]">
            <label className="font-bold text-[16px]">Profile Data</label>
            <div className="bg-[#FFFFFF] rounded-[5px] my-2 px-8 py-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/teacher1.png"
                  width={70}
                  height={70}
                  className="rounded-full"
                  alt="Teacher Picture"
                />

                <span className="text-[15px] font-bold">Victor Nwanbe</span>
              </div>
              <div className="my-3">
                <span className="font-bold text-[14px]">About</span>
                <p className="font-medium text-[12px] leading-snug py-2">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing eliLorem
                  ipsum dolor sit amet, consectetuer adipiscing eliLorem ipsum
                  dolor sit amet, consectetuer adipiscing
                </p>
              </div>
            </div>
            <input
              type="gender"
              name="text"
              placeholder="Gender"
              className="my-2 p-4 outline-none rounded-[8px] w-full bg-white"
            />
            <br />
            <input
              type="text"
              name="text"
              placeholder="Select Grade(s)"
              className="my-2 p-4 outline-none rounded-[8px] w-full bg-white"
            />
            <br />

            <Button className="bg-secondary w-full text-white text-[16px] px-6 py-7 my-3">
              This is my Ward, Proceed.
            </Button>
            <Button className="bg-transparent w-full text-[#FF6634] border border-[#FF6634] text-[16px] px-6 py-7 my-3">
              This isn’t my Ward, Cancel.
            </Button>
          </form>
        </div>
        <Footer />
      </Container>
    </section>
  );
};

export default Existingward;
