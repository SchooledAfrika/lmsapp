"use client";
import { useState, FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { RegisterType } from "@/constants/registerType";
import { Button } from "./ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export enum registerType {
  Student = "Student",
  Teacher = "Teacher",
  School = "School",
  Parents = "Parents",
}

const accountTypeToLink: { [key: string]: string } = {
  "School Account": "/school-account",
  "Student Account": "/student-account",
  "Parent Account": "/parent-account",
  "Teacher Account": "/teacher-account",
};

const Register: FC = () => {
  const [selectAccountType, setSelectAccountType] = useState<
    registerType | undefined
  >(undefined);
  const router = useRouter();

  const handleSelectedItem = (accountType: registerType) => {
    setSelectAccountType(accountType);
  };

  const getButtonBackgroundColor = () => {
    if (selectAccountType !== undefined) {
      return "#359C71";
    } else {
      return "#359F61";
    }
  };

  const handleContinue = () => {
    if (selectAccountType === undefined) {
      return alert("please select your role");
    }
    // set cookies for a role
    Cookies.set("role", selectAccountType);
    // then direct the user to the path to complete the registration process
    router.push("/continue-reg");
  };

  return (
    <div>
      <div className="flex font-subtext flex-col md:flex-row justify-between items-center gap-3 px-[1rem] md:px-[6rem] py-[1rem] md:py-[5rem] w-full">
        <div className="sm:w-full md:w-[45%]">
          <p className="pb-2 font-bold text-orange-400">Get Started</p>
          <span className="font-bold text-[20px] md:text-[26px]">
          Join in shaping the future of Education.

          </span>
          <p className="text-gray-500 py-6 text-[13px]">
          At Schooled Afrika, we're dedicated to empowering learners, educators, and institutions with the
          tools they need to thrive in the digital age. Join us in shaping the future of education, one click at
          a time.
          </p>
          <Image src={"/careers.svg"} alt="career" width={200} height={200} className="hidden w-[400px] sm:block" />
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
              onClick={() => handleSelectedItem(registered.role)}
            >
              <div>
                <Image
                  src={registered.Images}
                  width={200}
                  height={200}
                  alt="School Account"
                  className="w-[80px]"
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
                {selectAccountType === registered.role ? (
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
          <Button
            onClick={handleContinue}
            className={`bg-secondary w-full text-white text-[16px] px-6 py-6 my-6 ${
              selectAccountType !== undefined ? "" : "opacity-50"
            }`}
            style={{ backgroundColor: getButtonBackgroundColor() }}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
