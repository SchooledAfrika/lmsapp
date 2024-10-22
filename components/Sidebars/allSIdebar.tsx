"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { CommonDashboardContext } from "@/providers/Statecontext";
import { AdminDashboardContext } from "@/providers/Admincontext";
import { useContext } from "react";
import { useConversion } from "@/data-access/conversion";
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

interface Isidebar {
  findpath: string;
}
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
  const { getInitials } = useConversion();

  // Fetch the ward list (the same query you used in AddWard)
  const { data: wards } = useQuery({
    queryKey: ["getWard"],
    queryFn: async () => {
      const response = await fetch("/api/more-wards");
      return await response.json();
    },
  });

  
  useEffect(() => {
    // Function to update the selected ward name and photo
  const updateSelectedWard = () => {
    const storedWardId = localStorage.getItem("selectedWardId");
    if (storedWardId && Array.isArray(wards)) {
      const ward = wards.find((ward: any) => ward.id === storedWardId);
      if (ward) {
        setSelectedWardName(ward.name); // Set the ward name
        setSelectedWardPhoto(ward.profilePhoto); // Set the ward photo if available
      } else {
        setSelectedWardName(""); // Reset if no matching ward
        setSelectedWardPhoto("");
      }
    }
  };
    updateSelectedWard(); // Update initially when component mounts

    // Listen for localStorage changes from other components
    const handleStorageChange = () => {
      updateSelectedWard();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [wards]); // Add `wards` as a dependency to update when fetched

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

      <div className="w-full p-2 cursor-pointer rounded-md ease-in-out transform duration-200 flex items-center space-x-2 bg-green-800 text-white  ">
      <div className="border-2 w-[40px] h-[40px] flex items-center justify-center rounded-full">
          {selectedWardPhoto ? (
            <Image
              src={selectedWardPhoto}
              alt="Ward Profile"
              width={100}
              height={100}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <span className="text-[18px]">
              {selectedWardName ? getInitials(selectedWardName) : "?"}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          {selectedWardName ? (
            <p className="text-[13px]">{selectedWardName}</p>
          ) : (
            <p>No ward selected</p>
          )}
          {/* <p className="text-[12px] underline">Switch Ward</p> */}
        </div>
      </div>
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
