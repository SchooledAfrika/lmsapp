"use client";
import React, { useContext } from "react";
import { CommonDashboardContext } from "@/providers/Statecontext";
import Sidebar from "./sidebar";

const MobileSideBar = ({ dashboard }: { dashboard: string }) => {
  const { showSideBar, setShowSideBar } = useContext(CommonDashboardContext);
  return (
    <div
      onClick={(e) => setShowSideBar(false)}
      className={` fixed sm:hidden left-0 top-0 w-full h-screen transform ease-in-out duration-300 bg-[rgba(0,0,0,0.4)] z-[999999] ${
        showSideBar ? " translate-x-0" : "-translate-x-full"
      }`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="  w-3/5 bg-white h-full font-bold px-6 py-3 overflow-auto"
      >
        <Sidebar dashboard={dashboard} />
      </div>
    </div>
  );
};

export default MobileSideBar;
