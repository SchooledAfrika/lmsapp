"use client";
import React, { useContext, useState } from "react";
import { CommonDashboardContext } from "@/providers/Statecontext";
import { PiSealWarningFill } from "react-icons/pi";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export interface pricingChange {
  priceAmt: number;
  duration: string;
}
const ConfirmLogout = () => {
  const queryClient = useQueryClient();
  const { confirmLogout, setConfirmLogout } = useContext(
    CommonDashboardContext
  );
  const [loadingOut, setLoggingOut] = useState<boolean>(false);
  const router = useRouter();
  const signOutUser = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setLoggingOut(true);
    // lets clear the selected wardId for parents dashboard first
    Cookies.remove("wardId");
    queryClient.clear();
    // then continue with logging out the user
    const logOutData = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(logOutData.url);
  };
  const closeModel = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setConfirmLogout(false);
  };
  return (
    <div
      onClick={closeModel}
      className={` ${
        confirmLogout ? "flex" : "hidden"
      } px-6 md:px-24 py-3 items-center justify-center fixed top-0 left-0 w-full backdrop-blur-md h-screen bg-[rgba(0,0,0,0.4)] z-[999999]`}
    >
      <div className=" w-full md:w-[400px] rounded-md py-4 shadow-lg px-3 border flex flex-col items-center gap-5">
        <PiSealWarningFill className=" text-[60px]" />
        <div className=" flex flex-col items-center">
          <p className=" max-xs:text-[12px] text-black font-semibold">
            About to leave your dashboard
          </p>
          <p className="max-xs:text-[12px]">
            Are you sure you want to leave your dashboard
          </p>
        </div>
        <div className=" flex gap-3 w-full">
          <div
            onClick={closeModel}
            className=" cursor-pointer hover:bg-slate-200 transition-all duration-700 flex-1 py-2 flex items-center justify-center text-[14px] rounded-md bg-gray-300 font-bold"
          >
            <p>Stay on Page</p>
          </div>
          <div
            onClick={signOutUser}
            className=" flex-1 py-2 flex items-center justify-center text-[14px] text-white rounded-md bg-green-700 cursor-pointer hover:bg-green-500 duration-700 ease-in-out transition-all font-bold"
          >
            {loadingOut ? <p>Leaving page...</p> : <p>Leave Page</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLogout;
