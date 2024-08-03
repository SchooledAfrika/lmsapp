"use client";
import { AdminSideBarComponent } from "@/components/Sidebars/allSIdebar";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const sidebar = () => {
  const router = useRouter();
  const path = usePathname().split("/");
  let findpath: string;
  if (path.length === 2) {
    findpath = "";
  } else {
    findpath = path[2];
  }
  return (
    <div className=" flex flex-col gap-12">
      <div className=" w-full flex items-center justify-center pt-5">
        <Image
          className=" w-[95px] cursor-pointer"
          src="/logo.png"
          alt="logo"
          width={200}
          height={200}
          onClick={() => router.push("/")}
        />
      </div>

      <div className=" w-full flex flex-col space-y-2">
        <AdminSideBarComponent findpath={findpath} />
      </div>
    </div>
  );
};

export default sidebar;
