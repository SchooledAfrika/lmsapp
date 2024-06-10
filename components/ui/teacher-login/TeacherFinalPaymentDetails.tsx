import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../button";
import Footer from "@/components/Footer";

const TeacherFinalPaymentDetails = () => {
  const [tickBox, setTickBox] = useState(false);

  const handleTickedBox = () => {
    setTickBox(true);
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
            <p className="border-l-2 border-[#359C71] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#359C71] rounded-full px-[7px] text-white">
                3
              </span>
              <p className="text-[#359C71] font-bold">Payment Details</p>
            </div>
            <p className="border-l-2 border-[#359C71] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#359C71] rounded-full px-[7px] text-white">
                4
              </span>
              <p className="text-[#359C71] font-bold">Payment Details</p>
            </div>
          </div>

          <form className="pl-[0] md:pl-[100px] w-full md:w-[50%] mt-[40px] md:mt-[0]">
            <label className="font-bold text-[16px]">Payment Details</label>
            <input
              type="text"
              name="text"
              placeholder="Bank Name"
              className="my-2 p-4 outline-none rounded-[8px] w-full bg-white"
            />
            <br />
            <input
              type="text"
              name="text"
              placeholder="Account Number"
              className="my-2 p-4 outline-none rounded-[8px] w-full bg-white"
            />
            <br />
            <input
              type="text"
              name="text"
              placeholder="Account Name"
              className="my-2 p-4 outline-none rounded-[8px] w-full bg-white"
            />

            <div
              onClick={handleTickedBox}
              className="flex items-center gap-2 font-bold text-[13px] py-4 cursor-pointer"
            >
              {tickBox ? (
                <Image src="/svgs/tick.svg" alt="Tick" width={15} height={15} />
              ) : (
                <Image
                  src="/svgs/colored-tick.svg"
                  alt="error"
                  width={15}
                  height={15}
                />
              )}
              Accept Schooled Afrika{" "}
              <Link
                href={"/school-terms-and-conditions"}
                className="underline text-[#359C71]"
              >
                Terms & Condition
              </Link>
            </div>

            <Button className="bg-secondary w-full text-white text-[16px] px-6 py-7 my-3">
              Proceed
            </Button>
          </form>
        </div>
        <Footer />
      </Container>
    </section>
  );
};

export default TeacherFinalPaymentDetails;
