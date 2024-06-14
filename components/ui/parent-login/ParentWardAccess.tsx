import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../button";
import Footer from "@/components/Footer";

interface ParentWardAccessProps {
  onClickButton: (view: any) => void;
}

const ParentWardAccess: React.FC<ParentWardAccessProps> = ({
  onClickButton,
}) => {
  const handleWardProfile = () => {
    onClickButton("Ward Profile Data");
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
              <p className="text-[#359C71] font-bold">Wards Account Access</p>
            </div>
            <p className="border-l-2 border-[#E9ECEB] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#E9ECEB] rounded-full px-[7px] text-white">
                3
              </span>
              <p>Wards Profile Data</p>
            </div>
          </div>

          <form className="pl-[0] md:pl-[100px] mt-[40px] md:mt-[0] w-full md:w-[50%]">
            <label className="font-bold text-[16px]">
              Pre-existing Account
            </label>
            <input
              type="text"
              name="text"
              placeholder="Enter Ward Access ID"
              className="my-2 px-4 py-5 outline-none rounded-[8px] w-full bg-white"
            />
            <span className="text-[14px] font-medium my-2">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </span>

            <br />

            <div className="mt-5">
              <label className="font-bold text-[16px]">New Account</label>
              <input
                type="text"
                name="text"
                placeholder="Wards Email Address"
                className="mt-4 mb-2 p-4 outline-none rounded-[8px] w-full bg-white"
              />
              <br />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="my-2 p-4 outline-none rounded-[8px] w-full bg-white"
              />
              <br />
              <input
                type="Cpassword"
                name="password"
                placeholder="Confirm Password"
                className="my-2 p-4 outline-none rounded-[8px] w-full bg-white"
              />
            </div>

            <Button
              onClick={handleWardProfile}
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

export default ParentWardAccess;
