"use client";

import {
  Mail,
  Map,
  MapPinned,
  MonitorPlay,
  Phone,
  User2,
  UserRoundCog,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { LuFilePieChart } from "react-icons/lu";
import EditProfile from "./EditProfile";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@mui/material";
import { useConversion } from "@/data-access/conversion";

export const LargeNoProfile = () => {
  return (
    <div className="ml-3  my-3 h-[140px] bg-white flex items-center justify-center  w-[140px] rounded-full ">
      <div className=" h-[120px] w-[120px] rounded-full  border-2 border-green-600">
        <Image
          src="/admin.svg"
          alt="Admin"
          width={200}
          height={200}
          className="w-[100px] h-[100px]"
        />
      </div>
    </div>
  );
};

const DownProfile = () => {
  const { data } = useSession();
  const { handleDate } = useConversion();
  const {
    data: basicInfo,
    isLoading,
    isError,
    error,
  } = useQuery<{ phoneNo: string; createdAt: string; status: string }>({
    queryKey: ["basic-admin-info"],
    queryFn: async () => {
      const response = await fetch("/api/admin-basic-info");
      const result = await response.json();
      return result;
    },
  });

  if (isLoading) {
    return (
      <Skeleton
        height={200}
        className=" w-full"
        variant="rectangular"
        animation="wave"
      />
    );
  }
  if (isError) {
    return (
      <div className=" w-full h-[250px] border flex items-center justify-center rounded-md">
        <p>something went wrong displaying your data</p>
      </div>
    );
  }
  return (
    <div className="grid mx-6 md:grid-cols-2 grid-cols-1 py-4 space-y-3">
      <div className=" flex space-x-12">
        <p className="text-[13px] inline font-medium">
          <User2 className="inline w-4 h-4" /> Name:
        </p>
        <p className="text-[14px] font-semibold">{data?.user.name}</p>
      </div>
      <div className=" flex space-x-12">
        <p className="text-[13px] inline font-medium">
          <Phone className="inline w-4 h-4" /> Contact:
        </p>
        <p className="text-[14px] font-semibold">{basicInfo?.phoneNo}</p>
      </div>
      <div className=" flex space-x-12">
        <p className="text-[13px] inline font-medium">
          {" "}
          <Mail className="inline w-4 h-4" /> Email:
        </p>
        <p className="text-[14px] font-semibold">{data?.user.email}</p>
      </div>
      <div className=" flex space-x-12">
        <p className="text-[13px] inline font-medium">
          {" "}
          <MonitorPlay className="inline w-4 h-4" /> Joined On:
        </p>
        <p className="text-[14px] font-semibold">
          {handleDate(basicInfo?.createdAt!)}
        </p>
      </div>
      <div className=" flex space-x-12">
        <p className="text-[13px] inline font-medium">
          <MapPinned className="inline w-4 h-4" /> State:
        </p>
        <p className="text-[14px] font-semibold">Enugu</p>
      </div>
      <div className=" flex space-x-12">
        <p className="text-[13px] inline font-medium">
          {" "}
          <Map className="inline w-4 h-4" /> Country:
        </p>
        <p className="text-[14px] font-semibold">Nigeria</p>
      </div>
      <div className=" flex space-x-12">
        <p className="text-[13px] inline font-medium">
          <UserRoundCog className="inline w-4 h-4" /> Role:
        </p>
        <p className="text-[14px] font-semibold">Administrator</p>
      </div>
      <div className=" flex space-x-12">
        <p className="text-[13px] inline font-medium">
          <LuFilePieChart className="inline w-4 h-4" /> Status:
        </p>
        <p className="text-[14px] font-semibold">{basicInfo?.status}</p>
      </div>
    </div>
  );
};

const AdminProfile = () => {
  const { data } = useSession();
  return (
    <div className=" rounded-md  bg-gray-200 font-header">
      <div className="flex bg-lightGreen rounded-md py-5 px-5 my-3 items-center justify-between">
        {data?.user.image ? (
          <Image
            src={data.user.image}
            alt="Admin"
            width={200}
            height={200}
            className="w-[100px] h-[100px] rounded-lg"
          />
        ) : (
          <LargeNoProfile />
        )}
        <EditProfile />
      </div>
      <DownProfile />
    </div>
  );
};

export default AdminProfile;
