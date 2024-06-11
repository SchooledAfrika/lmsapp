import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../button";
import Footer from "@/components/Footer";

interface TeacherPaymentProps {
  onClickButton: (view: any) => void;
}

const TeacherPaymentDetails: React.FC<TeacherPaymentProps> = ({
  onClickButton,
}) => {
  const handlePaymentView = () => {
    onClickButton("Final Payment Details");
  };
  const preferences = [
    "HomeWork Support",
    "1 on 1 Sessions",
    "Open to Jobs",
    "Group Sessions",
  ];
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
            <p className="border-l-2 border-[#E9ECEB] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#E9ECEB] rounded-full px-[7px] text-white">
                4
              </span>
              <p className="text-[#E9ECEB] font-bold">Payment Details</p>
            </div>
          </div>

          <form className="flex flex-col pl-[0] md:pl-[100px] mt-[40px] md:mt-[0]">
            <label className="font-bold text-[16px] pb-2">
              Subject & Language
            </label>
            <input
              type="text"
              name="text"
              placeholder="Language I Speak"
              className="p-4 outline-none w-full md:w-[60%] rounded-[8px] bg-white"
            />
            <br />
            <input
              type="text"
              name="text"
              placeholder="Select Subject"
              className="p-4 outline-none w-full md:w-[60%] rounded-[8px] bg-white"
            />
            <br />
            <input
              type="text"
              name="text"
              placeholder="Select Grade(s)"
              className="p-4 outline-none w-full md:w-[60%] rounded-[8px] bg-white"
            />

            <label className="font-bold text-[16px] pt-3">Pricing</label>
            <span className="text-[14px] w-[50%] font-medium py-2">
              Please note that the minimum duration for a session is 45 minutes
              and the maximum duration is 2 hours. Your price range should
              account for that.
            </span>
            <div className="flex justify-between items-center my-2 p-4 outline-none rounded-[8px] w-full md:w-[40vh] lg:w-[60%] bg-white">
              <input
                type="text"
                name="text"
                placeholder="Session Price Range"
                className="outline-none w-full pr-4"
              />
              <div className="flex items-center gap-1">
                <Image
                  src="/svgs/usaLogo.svg"
                  width={18}
                  height={18}
                  alt="Lock"
                />
                <span className="font-bold text-[16px]">USD</span>
              </div>
            </div>
            <div className="flex justify-between items-center my-2 p-4 outline-none rounded-[8px] w-full md:w-[40vh] lg:w-[60%] bg-white">
              <input
                type="text"
                name="text"
                placeholder="Homework Support Price Range"
                className="outline-none w-full pr-4"
              />
              <div className="flex items-center gap-1">
                <Image
                  src="/svgs/usaLogo.svg"
                  width={18}
                  height={18}
                  alt="Lock"
                />
                <span className="font-bold text-[16px]">USD</span>
              </div>
            </div>

            <div>
              <label className="font-bold text-[16px]">Preferences</label>
              <div className="grid grid-cols-2 gap-x-2 w-full md:w-[60%]">
                {preferences.map((preference, index) => (
                  <label
                    key={index}
                    className="flex justify-between items-center gap-2 my-2 px-4 py-3 outline-none rounded-[8px] bg-white cursor-pointer"
                  >
                    {preference}
                    <input
                      type="checkbox"
                      name="preferences"
                      value={preference}
                      className="appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-green-600 checked:border-transparent focus:outline-none"
                    />
                  </label>
                ))}
              </div>
            </div>

            <Button
              onClick={handlePaymentView}
              className="bg-secondary w-full md:w-[60%] text-white text-[16px] px-6 py-7 my-3"
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

export default TeacherPaymentDetails;
