import React from "react";
import Link from "next/link";
import Container from "./Container";
import Image from "next/image";
import Instagram from "@/images/svgs/instagram.svg";
import Twitter from "@/images/svgs/twitter.svg";
import Facebook from "@/images/svgs/facebook.svg";
import Tiktok from "@/images/svgs/tiktok.svg";
import Logo from "@/images/logo.png";

const Footer: React.FC = () => {
  return (
    <Container className="py-4">
      <nav>
        <div className="flex flex-col sm:flex-row font-subtext items-center justify-between px-[20px]">
          <div>
            <Image src={Logo} alt="logo" className="w-[100px]  mb-4 " />
          </div>
          <div className=" flex gap-[20px] xl:gap-[50px] text-[16.5px] space-x-6 justify-center items-center select-none">
            <Link href="/find-tutors">Find Tutors</Link>
            <Link href="/classes">Classes</Link>
            <Link href="/apply-to-teach">Apply to teach </Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </nav>
      <div className="block md:flex items-center justify-between px-[20px]">
        <div className="w-full md:w-[35%]">
          <span className="font-bold">About Schooled Afrika</span>
          <p className="pt-2 text-[15px]">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </p>
        </div>
        <div className="flex  items-center justify-between gap-10 py-[20px] md:py-[0]">
          <Link href="/">
            <Image src={Instagram} alt="icon" className="w-[28px]" />
          </Link>
          <Link href="/">
            <Image src={Twitter} alt="icon" className="w-[28px]" />
          </Link>
          <Link href="/">
            <Image src={Facebook} alt="icon" className="w-[28px]" />
          </Link>
          <Link href="/">
            <Image src={Tiktok} alt="icon" className="w-[28px]" />
          </Link>
        </div>
      </div>
      <hr className="border-gray-400 mx-[20px]  mt-[10px] md:mt-[50px] mb-[22px]" />
      <div className="block md:flex items-center justify-between gap-10 px-[20px]  text-[14px]">
        <span>
          Copyright © {new Date().getFullYear()}. Schooled Afrika. All Rights
          Reserved.
        </span>
        <div className="block md:flex gap-5">
          <Link href="/">
            <p>Privacy Policy</p>
          </Link>
          <Link href="/">
            <p>Terms & Conditions</p>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
