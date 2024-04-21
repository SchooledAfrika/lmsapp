import React from "react";
import Logo from "./Logo";
import NavLinks from "../components/NavLinks";
import Container from "./Container";
import Image from "next/image";
import Instagram from "@/images/svgs/instagram.svg";
import Twitter from "@/images/svgs/twitter.svg";
import Facebook from "@/images/svgs/facebook.svg";
import Tiktok from "@/images/svgs/tiktok.svg";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="pb-10">
      <nav>
        <Container className="relative z-50 flex justify-between ">
          <div className="relative z-10 flex items-center gap-16">
            <Logo />
          </div>
          <div className="hidden lg:flex lg:gap-10 items-center">
            <NavLinks />
          </div>
        </Container>
      </nav>
      <div className="block md:flex items-center justify-between px-[20px] md:px-[70px]">
        <div className="w-full md:w-[35%]">
          <span className="font-bold">About Schooled Afrika</span>
          <p className="pt-2 text-[15px]">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </p>
        </div>
        <div className="flex items-center justify-between gap-10 py-[20px] md:py-[0]">
          <Link href="/">
            <Image src={Instagram} alt="icon" />
          </Link>
          <Link href="/">
            <Image src={Twitter} alt="icon" />
          </Link>
          <Link href="/">
            <Image src={Facebook} alt="icon" />
          </Link>
          <Link href="/">
            <Image src={Tiktok} alt="icon" />
          </Link>
        </div>
      </div>
      <hr className="border-gray-400 mx-[20px] md:mx-[70px] mt-[10px] md:mt-[50px] mb-[22px]" />
      <div className="block md:flex items-center justify-between gap-10 px-[20px] md:px-[70px] text-[14px]">
        <span>
          Copyright © {new Date().getFullYear()}. Schooled Afrika. All Rights
          Reserved.
        </span>
        <div className=" block md:flex gap-5">
          <Link href="/">
            <p>Privacy Policy</p>
          </Link>
          <Link href="/">
            <p>Terms & Condition</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
