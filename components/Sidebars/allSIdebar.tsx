"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { CommonDashboardContext } from "@/providers/Statecontext";
import { AdminDashboardContext } from "@/providers/Admincontext";
import { useContext } from "react";
import { useConversion, useWardId } from "@/data-access/conversion";
import {
  AdminSideBar,
  AdminSideBarType,
  SchoolSideBar,
  SchoolSideBarType,
} from "@/constants/schoolSideBar";
import { TeacherSideBar } from "@/constants/teacherSidebar";
import { StudentSideBar } from "@/constants/studentSidebar";
import { ParentSideBar } from "@/constants/parentsSideBar";
import Image from "next/image";
import Cookies from "js-cookie";

interface Isidebar {
  findpath: string;
}

interface IwardsInfo {
  id: string;
  profilePhoto: string;
  email: string;
  name: string;
}
// component to display wards profiledata
const WardProfile = () => {
  const { getInitials, makeSubstring } = useConversion();
  const { wardId } = useWardId();
  // get the wardId from the cookies

  // Fetch the ward list (the same query you used in AddWard)
  const { data, isLoading, isError, error } = useQuery<IwardsInfo[]>({
    queryKey: ["getWards"],
    queryFn: async () => {
      const response = await fetch("/api/more-wards");
      return await response.json();
    },
    enabled: !!wardId,
  });
  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error...</div>;
  // filter out the selected ward based on the id
  const selectedWard = data?.find((ward) => ward.id === wardId);
  return (
    <div className="w-full p-2 cursor-pointer rounded-md ease-in-out transform duration-200 flex items-center space-x-2 bg-white border-[tomato]  border border-dashed  ">
      <div className="border border-[tomato] w-[40px] h-[40px] flex items-center justify-center rounded-full">
        {selectedWard?.profilePhoto ? (
          <Image
            src={selectedWard.profilePhoto}
            alt="Ward Profile"
            width={100}
            height={100}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span className="text-[18px]">
            {selectedWard?.name && getInitials(selectedWard?.name as string)}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <p className="text-[13px]">
          {selectedWard?.name && makeSubstring(selectedWard?.name as string, 9)}
        </p>
      </div>
    </div>
  );
};
export const SchoolSideBarComponent = ({ findpath }: Isidebar) => {
  const { showSideBar, setShowSideBar } = useContext(CommonDashboardContext);
  return (
    <div className=" w-full flex flex-col space-y-2">
      {SchoolSideBar.map((item: SchoolSideBarType, index) => (
        <Link
          onClick={() => {
            setShowSideBar(false);
          }}
          href={`/school-dashboard/${item.path}`}
          className={` w-full p-2 cursor-pointer flex items-center space-x-2 ${
            findpath === item.path && "bg-green-800 text-white"
          } rounded-md ease-in-out transform duration-200 ${
            findpath !== item.path && "hover:text-green-700"
          }`}
          key={index}
        >
          <div className=" text-[20px]">{item.icon && <item.icon />}</div>
          <p className=" text-[16px]">{item.name}</p>
        </Link>
      ))}
    </div>
  );
};

export const TeacherSideBarComponent = ({ findpath }: Isidebar) => {
  const { showSideBar, setShowSideBar } = useContext(CommonDashboardContext);
  return (
    <div className=" w-full flex flex-col space-y-2">
      {TeacherSideBar.map((item: SchoolSideBarType, index) => (
        <Link
          onClick={() => {
            setShowSideBar(false);
          }}
          href={`/teacher-dashboard/${item.path}`}
          className={` w-full p-2 cursor-pointer flex items-center space-x-2 ${
            findpath === item.path && "bg-green-800 text-white"
          } rounded-md ease-in-out transform duration-200 ${
            findpath !== item.path && "hover:text-green-700"
          }`}
          key={index}
        >
          <div className=" text-[20px]">{item.icon && <item.icon />}</div>
          <p className=" text-[14px]">{item.name}</p>
        </Link>
      ))}
    </div>
  );
};
export const StudentSideBarComponent = ({ findpath }: Isidebar) => {
  const { showSideBar, setShowSideBar } = useContext(CommonDashboardContext);
  return (
    <div className=" w-full flex flex-col space-y-2">
      {StudentSideBar.map((item: SchoolSideBarType, index) => (
        <Link
          onClick={() => {
            setShowSideBar(false);
          }}
          href={`/student-dashboard/${item.path}`}
          className={` w-full p-2 cursor-pointer flex items-center space-x-2 ${
            findpath === item.path && "bg-green-800 text-white"
          } rounded-md ease-in-out transform duration-200 ${
            findpath !== item.path && "hover:text-green-700"
          }`}
          key={index}
        >
          <div className=" text-[20px]">{item.icon && <item.icon />}</div>
          <p className=" text-[14px]">{item.name}</p>
        </Link>
      ))}
    </div>
  );
};
// work on the parents side bar
export const ParentSideBarComponent = ({ findpath }: Isidebar) => {
  const { showSideBar, setShowSideBar } = useContext(CommonDashboardContext);
  const [selectedWardName, setSelectedWardName] = useState<string>("");
  const [selectedWardPhoto, setSelectedWardPhoto] = useState<string>("");

  return (
    <div className=" w-full flex flex-col space-y-2">
      {ParentSideBar.map((item: SchoolSideBarType, index) => (
        <Link
          onClick={() => {
            setShowSideBar(false);
          }}
          href={`/parents-dashboard/${item.path}`}
          className={` w-full p-2 cursor-pointer flex items-center space-x-2 ${
            findpath === item.path && "bg-green-800 text-white"
          } rounded-md ease-in-out transform duration-200 ${
            findpath !== item.path && "hover:text-green-700"
          }`}
          key={index}
        >
          <div className=" text-[20px]">{item.icon && <item.icon />}</div>
          <p className=" text-[14px]">{item.name}</p>
        </Link>
      ))}
      <WardProfile />
    </div>
  );
};

export const AdminSideBarComponent = ({ findpath }: Isidebar) => {
  const { showSideBar, setShowSideBar } = useContext(AdminDashboardContext);
  return (
    <div className="w-full flex flex-col space-y-2">
      {AdminSideBar.map((item: AdminSideBarType, index) => (
        <Link
          onClick={() => {
            setShowSideBar(false);
          }}
          href={`/admin-dashboard/${item.path}`}
          className={`w-full p-2 cursor-pointer flex items-center space-x-2 ${
            findpath === item.path && "bg-green-800 text-white"
          } rounded-md ease-in-out transform duration-200 ${
            findpath !== item.path && "hover:text-green-700"
          }`}
          key={index}
        >
          <div className="text-[20px]">{item.icon && <item.icon />}</div>
          <p className="text-[15px]">{item.name}</p>
        </Link>
      ))}
    </div>
  );
};
