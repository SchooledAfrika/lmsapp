"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Career from "@/images/careers.png";
import { RegisterType } from "@/constants/registerType";
import Footer from "./Footer";
import { Button } from "./ui/button";

const Register = () => {
  const [selectAccountType, setSelectAccountType] = useState(null);

  const handleSelectedItem = (accountType: any) => {
    setSelectAccountType(accountType);
  };

  const getButtonBackgroundColor = () => {
    if (
      selectAccountType === "School Account" ||
      selectAccountType === "Student Account" ||
      selectAccountType === "Parent Account" ||
      selectAccountType === "Teacher Account"
    ) {
      return "#359C71 ";
    } else {
      return "#359F61";
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 px-[1rem] md:px-[6rem] py-[1rem] md:pt-[2rem] md:pb-[5rem] w-full">
        <div className="sm:w-full md:w-[45%]">
          <p className="pb-2 font-bold text-orange-400">Get Started</p>
          <span className="font-bold text-[20px] md:text-[26px]">
            Lorem ipsum dolor sit amet, consec tetuer adipiscing elit.
          </span>
          <p className="text-gray-500 py-6 text-[13px]">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </p>
          <Image src={Career} alt="career" />
        </div>
        <div className="sm:w-full md:w-[45%]">
          <div className="flex justify-end mb-[50px]">
            <Link href="/login">
              <Image
                src="/svgs/close.svg"
                alt="close"
                width={100}
                height={100}
                className="w-[15px]"
              />
            </Link>
          </div>

          {RegisterType.map((registered, index) => (
            <div
              key={index}
              className="flex items-center bg-white rounded-[8px] px-6 py-2 my-4 gap-8 cursor-pointer"
              onClick={() => handleSelectedItem(registered.title)}
            >
              <div>
                <Image
                  src={registered.Images}
                  width={30}
                  height={30}
                  alt="School Account"
                />
              </div>
              <div>
                <p className="font-bold text-[16px]">{registered.title}</p>
                <span className="text-[13px]">
                  {" "}
                  {registered.description}{" "}
                  {registered.link && (
                    <Link href={registered.link} className="text-[#359C71]">
                      {registered.linkText}
                    </Link>
                  )}{" "}
                  {registered.descriptionEnd}
                </span>
              </div>
              <div>
                {selectAccountType === registered.title ? (
                  <Image
                    src={registered.coloredTick}
                    width={30}
                    height={30}
                    alt="Tick"
                  />
                ) : (
                  <Image
                    src={registered.tickIcon}
                    width={30}
                    height={30}
                    alt="Tick"
                  />
                )}
              </div>
            </div>
          ))}
          <Link href="/school-account">
            <Button
              className={`bg-secondary w-full text-white text-[16px] px-6 py-6 my-6 ${
                selectAccountType === "School Account" ||
                selectAccountType === "Student Account" ||
                selectAccountType === "Parent Account" ||
                selectAccountType === "Teacher Account"
                  ? ""
                  : "opacity-50"
              }`}
              style={{ backgroundColor: getButtonBackgroundColor() }}
            >
              Continue
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
