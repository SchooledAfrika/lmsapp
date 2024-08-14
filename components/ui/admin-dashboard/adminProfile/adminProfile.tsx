import { Mail, Map, MapPinned, MonitorPlay, Phone, User2, UserRoundCog } from "lucide-react";
import Image from "next/image";
import React from "react";
import { LuFilePieChart } from "react-icons/lu";
import EditProfile from "./EditProfile";

const AdminProfile = () => {
  return <div className=" rounded-md space-y-2 bg-gray-200 font-header">
    <div className="flex bg-lightGreen rounded-md my-3 items-center justify-between">
    <div className="ml-3  my-3 h-[140px] bg-white flex items-center justify-center  w-[140px] rounded-full ">

    
<div className=" h-[120px] w-[120px] rounded-full  border-2 border-green-600">
   <Image src="/admin.svg" alt="Admin" width={200} height={200} className="w-[100px] h-[100px]" />
</div>
</div>

<EditProfile/>


    </div>
    
    <div className="grid mx-6 md:grid-cols-2 grid-cols-1 py-4 space-y-3">
                <div className=" flex space-x-12">
                  <p className="text-[13px] inline font-medium"><User2 className="inline w-4 h-4"/> Name:</p>
                  <p className="text-[14px] font-semibold">Okechukwu Okorie</p>
                </div>
                <div className=" flex space-x-12">
                  <p className="text-[13px] inline font-medium"><Phone className="inline w-4 h-4"/> Contact:</p>
                  <p className="text-[14px] font-semibold">+2349130893924</p>
                </div>
                <div className=" flex space-x-12">
                  <p className="text-[13px] inline font-medium"> <Mail className="inline w-4 h-4"/> Email:</p>
                  <p className="text-[14px] font-semibold">
                    odomaurice501@gmail.com
                  </p>
                </div>
                <div className=" flex space-x-12">
                  <p className="text-[13px] inline font-medium"> <MonitorPlay className="inline w-4 h-4"/> Joined On:</p>
                  <p className="text-[14px] font-semibold">14th June 2024</p>
                </div>
                <div className=" flex space-x-12">
                  <p className="text-[13px] inline font-medium"><MapPinned className="inline w-4 h-4"/> State:</p>
                  <p className="text-[14px] font-semibold">Enugu</p>
                </div>
                <div className=" flex space-x-12">
                  <p className="text-[13px] inline font-medium"> <Map className="inline w-4 h-4"/> Country:</p>
                  <p className="text-[14px] font-semibold">Nigeria</p>
                </div>
                <div className=" flex space-x-12">
                  <p className="text-[13px] inline font-medium">
                  <UserRoundCog className="inline w-4 h-4"/> Role:
                  </p>
                  <p className="text-[14px] font-semibold">Administrator</p>
                </div>
                <div className=" flex space-x-12">
                  <p className="text-[13px] inline font-medium">
                  <LuFilePieChart className="inline w-4 h-4"/> Status:
                  </p>
                  <p className="text-[14px] font-semibold">Active</p>
                </div>
              </div>
    
     
  </div>;
};

export default AdminProfile;
