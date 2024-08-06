"use client";
import { AdminDashboardContext } from "@/providers/Admincontext";
import Image from "next/image";
import React, { useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const MobileNav = () => {
  const { showSideBar, setShowSideBar } = useContext(AdminDashboardContext);
  const handleSideBar = () => {
    setShowSideBar(true);
  };
  return (
    <div className=" sm:hidden w-full justify-between fixed top-0 left-0 h-[70px] px-4 bg-white border-b mb-10 flex items-center z-50">
      <Image
        className=" h-[40px] w-[80px]"
        src="/logo.png"
        alt="logo"
        width={200}
        height={200}
      />
      <GiHamburgerMenu
        className=" text-[30px] cursor-pointer"
        onClick={handleSideBar}
      />
    </div>
  );
};

export default MobileNav;
