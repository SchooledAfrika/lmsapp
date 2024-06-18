"use client";
import { useState, FC } from "react";
import Image from "next/image";
import Link from "next/link";
import Career from "@/images/careers.png";
import { RegisterType } from "@/constants/registerType";
import { Button } from "./ui/button";

interface RegisterProps {
  selectAccountType:
    | "School Account"
    | "Student Account"
    | "Parent Account"
    | "Teacher Account"
    | "";
}

const accountTypeToLink: { [key: string]: string } = {
  "School Account": "/school-account",
  "Student Account": "/student-account",
  "Parent Account": "/parent-account",
  "Teacher Account": "/teacher-account",
};

const Register: FC = () => {
  const [selectAccountType, setSelectAccountType] =
    useState<RegisterProps["selectAccountType"]>("");

  const handleSelectedItem = (
    accountType: RegisterProps["selectAccountType"]
  ) => {
    setSelectAccountType(accountType);
  };

  const link = accountTypeToLink[selectAccountType] || "#";

  const getButtonBackgroundColor = () => {
    if (selectAccountType in accountTypeToLink) {
      return "#359C71";
    } else {
      return "#359F61";
    }
  };

  return (
    <div>
      <div className="flex font-subtext flex-col md:flex-row justify-between items-center gap-3 px-[1rem] md:px-[6rem] py-[1rem] md:py-[5rem] w-full">
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
          <Image src={Career} alt="career" className="hidden sm:block" />
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
              className="flex items-center bg-white rounded-[8px] px-4 py-3 my-4 gap-8 cursor-pointer"
              onClick={() =>
                handleSelectedItem(
                  registered.title as RegisterProps["selectAccountType"]
                )
              }
            >
              <div>
                <Image
                  src={registered.Images}
                  width={100}
                  height={100}
                  alt="School Account"
                  className="w-[60px]"
                />
              </div>
              <div>
                <p className="font-bold text-[16px]">{registered.title}</p>
                <span className="text-[13px]">
                  {registered.description}
                  {registered.link && (
                    <Link href={registered.link} className="text-[#359C71]">
                      {registered.linkText}
                    </Link>
                  )}
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
          <Link href={link}>
            <Button
              className={`bg-secondary w-full text-white text-[16px] px-6 py-6 my-6 ${
                selectAccountType in accountTypeToLink ? "" : "opacity-50"
              }`}
              style={{ backgroundColor: getButtonBackgroundColor() }}
            >
              Continue
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
