"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LuUserCog } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useConversion } from "@/data-access/conversion";

export function AdminOptions() {
  const { data } = useSession();
  const { makeSubstring } = useConversion();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className=" bg-slate-100 hover:bg-slate-100 text-black">
          <div className="flex space-x-2 font-semibold ">
            <div className="h-[35px] flex items-center  w-[35px] rounded-full bg-green-800">
              <LuUserCog className="w-[18px] mx-auto   text-white  h-[18px] cursor-pointer" />
            </div>

            <div className="flex flex-col">
              <h3 className="text-[14px]">
                {" "}
                Admin{" "}
                {data?.user &&
                  makeSubstring(data?.user.name.split(" ")[0].toString()!, 7)}
              </h3>
              <p className="text-[13px] inline">
                Administrator <IoIosArrowDown className="inline" />
              </p>
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <div className="flex space-x-4 font-semibold ">
              <div className="h-[40px] flex items-center  w-[40px] rounded-full bg-green-800">
                <LuUserCog className="w-[18px] mx-auto   text-white  h-[18px] cursor-pointer" />
              </div>

              <div className="flex flex-col">
                <h3 className="text-[14px]">
                  {" "}
                  Admin{" "}
                  {data?.user &&
                    makeSubstring(data?.user.name.split(" ")[0].toString()!, 7)}
                </h3>
                <p className="text-[13px] text-slate-600">{data?.user.email}</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="grid gap-2">
            <div className="flex space-x-3 items-center">
              <LuUserCog className="w-[20px] h-[20px]" />
              <Link
                href="/admin-dashboard/admin-profile"
                className="text-[14px] font-semibold"
              >
                View Profile
              </Link>
            </div>
            <div className="grid gap-2">
              <div className="flex space-x-3 items-center">
                <IoSettingsOutline className="w-[20px] h-[20px] font-bold" />
                <Link
                  href="/admin-dashboard/admin-setting"
                  className="text-[14px] font-semibold"
                >
                  Account Setting
                </Link>
              </div>
            </div>
            <hr />
            <div className="grid gap-2">
              <div className="flex space-x-3 items-center pt-2">
                <PiSignOutBold className="w-[20px] h-[20px] font-semibold" />
                <Link href="" className="text-[14px] font-semibold">
                  Log Out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
