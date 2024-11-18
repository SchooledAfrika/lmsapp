"use client";
import { AdminNavbar, SchoolNavType, Subtype } from "@/constants/schoolNavbar";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AdminOptions } from "./AdminOptions";

const Navbar = ({ dashboard }: { dashboard: string }) => {
  const path = usePathname().split("/");

  const [present, setPresent] = useState<SchoolNavType | Subtype>();
  useEffect(() => {
    // making use of this function and if statement to rerender our text
    const checkPath = () => {
      if (path.length === 2) {
        const getItem = AdminNavbar.find((item) => item.path === "overview");
        return setPresent(getItem);
      } else if (path.length === 3) {
        const currentPathString = path[2];
        const getItem = AdminNavbar.find(
          (item) => item.path === currentPathString
        );
        return setPresent(getItem);
      } else {
        const currentPathString = path[2];
        const getItem = AdminNavbar.find(
          (item) => item.path === currentPathString
        );
        return setPresent(getItem?.subDetails);
      }
    };
    checkPath();
  }, [path, dashboard]);
  return (
    <div className=" hidden sm:flex justify-between items-center pt-5">
      <div>
        <h1 className="font-bold text-[18px]">{present?.title}</h1>
        <span className="text-sm">{present?.description}</span>
      </div>

      <div className=" sm:hidden md:flex items-center gap-[30px]">
        <div className="flex p-3 bg-[#FFFFFF] gap-[5px] border border-#359C71 rounded-[5px] w-[450px]">
          <Image
            src="/svgs/search.svg"
            width={20}
            height={20}
            alt="search"
            className=""
          />
          <input
            type="text"
            className="w-[400px] text-sm outline-none"
            placeholder="Search for anything..."
          />
        </div>

        {/* <Image src="/circle-user.png" alt="userLogo" width={100} height={100} className=" w-[40px] h-[40px] cursor-pointer"/> */}
        <div className="">
          <AdminOptions />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
