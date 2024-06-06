import React, { useState } from "react";
import Image from "next/image";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SchoolPersonalInfo: React.FC = () => {
  const [tickBox, setTickBox] = useState(true);

  const handleTickedBox = () => {
    setTickBox(false);
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
              <p className="text-[#359C71] font-bold">School Information</p>
            </div>
            <p className="border-[#359C71] border-l-2 h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="rounded-[50%] bg-[#359C71] px-[7px] text-white">
                2
              </span>
              <p className="text-[#359C71] font-bold">Personal Information</p>
            </div>
          </div>

          <form className="pl-[0] md:pl-[100px] mt-[40px] md:mt-[0]">
            <label className="font-bold text-[18px]">
              Personal Information
            </label>
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              className="my-2 p-4 outline-none rounded-[8px] w-full bg-white"
            />
            <br />
            <input
              type="text"
              name="PhoneNumber"
              placeholder="Phone Number"
              className="my-2 p-4 outline-none rounded-[8px] w-full bg-white"
            />
            <br />
            <input
              type="email"
              name="email"
              placeholder="Permanent House Address"
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
              <Link href={"/school-terms-and-conditions"} className="underline text-[#359C71]">
                Terms & Condition
              </Link>
            </div>
            <Link href="/">
              <Button className="bg-secondary w-full text-white text-[16px] px-6 py-7 my-3">
                Proceed
              </Button>
            </Link>
          </form>
        </div>
        <Footer />
      </Container>
    </section>
  );
};
export default SchoolPersonalInfo;
