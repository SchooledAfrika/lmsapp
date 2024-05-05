"use client";
import { SchoolNavbar } from "@/constants/schoolNavbar";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const path = usePathname();

  return (
    <div className="flex justify-between items-center pt-5">
      <div>
        <h1 className="font-bold text-[18px]">
          Welcome to Your School Dashboard
        </h1>
        <span className="text-sm">
          Lorem ipsum dolor sit amet, consectetuer adipiscing eli
        </span>
      </div>

      <div className="flex items-center gap-[30px]">
        <div className="flex p-3 bg-[#FFFFFF] gap-[5px] border border-#359C71 rounded-[5px] w-[450px]">
          <Image src="/svgs/search.svg" width={20} height={20} alt="search" />
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
