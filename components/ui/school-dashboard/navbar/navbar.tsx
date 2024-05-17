"use client";
import { SchoolNavbar, SchoolNavType, Subtype } from "@/constants/schoolNavbar";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar = () => {
  const path = usePathname().split("/");

  const [present, setPresent] = useState<SchoolNavType | Subtype>();
  useEffect(() => {
    // making use of this function and if statement to rerender our text
    const checkPath = () => {
      if (path.length === 2) {
        const getOneItem = SchoolNavbar.find(
          (item) => item.path === "overview"
        );
        return setPresent(getOneItem);
      } else if (path.length === 3) {
        const currentPathString = path[2];
        const getOneItem = SchoolNavbar.find(
          (item) => item.path === currentPathString
        );
        return setPresent(getOneItem);
      } else {
        const currentPathString = path[2];
        const getOneItem = SchoolNavbar.find(
          (item) => item.path === currentPathString
        );
        return setPresent(getOneItem?.subDetails);
      }
    };
    checkPath();
  }, [path]);
  return (
    <div className=" hidden sm:flex justify-between items-center pt-5">
      <div>
        <h1 className="font-bold text-[18px]">{present?.title}</h1>
        <span className="text-sm">{present?.description}</span>
      </div>

      <div className=" sm:hidden md:flex items-center gap-[30px]">
        <div className="flex p-3 bg-[#FFFFFF] gap-[5px] border border-#359C71 rounded-[5px] w-[450px]">
          <Image src="/svgs/search.svg" width={20} height={20} alt="search" className="" />
          <input
            type="text"
            className="w-[400px] text-sm outline-none"
            placeholder="Search tutors, classes, subjects..."
          />
        </div>
        <div className="pr-[40px]">
          <Image src="/svgs/bell.svg" width={20} height={20} alt="Bell" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
