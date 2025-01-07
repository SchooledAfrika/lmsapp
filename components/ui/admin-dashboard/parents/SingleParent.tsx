"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useConversion } from "@/data-access/conversion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Image from "next/image";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import { MdOutlinePayments } from "react-icons/md";
import { useParams } from "next/navigation";
import DashboardPagination from "@/components/DashboardPagination";
import SingleParentCourses from "./SingleParentCourses";
import Payments from "./Payments";
import WardOptions from "./WardInfo";
import WardInfo from "./WardInfo";
import { LoadingSkeleton } from "../sessions/SingleSessionAdmin";

const SingleParent = () => {
  const { id } = useParams();
  const { handleDate } = useConversion();
 
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["SingleParent"],
    queryFn: async () => {
      const response = await fetch(`/api/parents/${id}`);

      const result = await response.json();
      return result;
    },
  });

  

  //   if is loading
  if (isLoading) {
    return <LoadingSkeleton title="Parents details" />;
  }
  // if is error
  if (isError) {
    return <div className=" flex-1">{error.message}</div>;
  }
  return (
    <div>
      {data && (
        <div key={data.id} className="font-header md:my-12 mt-24 mb-12">
          <div className="flex md:my-12 mt-24 mb-12 justify-between">
            <p className="font-bold text-lg">Parent Details</p>
            <Link href="/admin-dashboard/parents" className="cursor-pointer">
              <Image
                src="/closeAlt.svg"
                alt="cancel"
                width={100}
                height={100}
                className="w-[20px] h-[20px]"
              />
            </Link>
          </div>

          <Tabs
            defaultValue="personal-information"
            className="md:w-[100%] w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal-information">
                {" "}
                <FaRegEye className="mr-2 w-5 h-5" /> Personal Data
              </TabsTrigger>

              <TabsTrigger value="payments">
                {" "}
                <MdOutlinePayments className="mr-2 w-5 h-5" /> Payments
              </TabsTrigger>
            </TabsList>
            <TabsContent value="personal-information">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[18px]">Personal Data</CardTitle>
                  {/* <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription> */}
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid md:grid-cols-2 grid-cols-1 space-y-3">
                    {/* <div className=" flex space-x-12">
                  <p className="text-[13px] font-medium">Profile Picture</p>
                  <p className="text-[14px] font-semibold">{data.profilePhoto}</p>
                </div> */}
                    <div className=" flex space-x-12">
                      <p className="text-[13px] font-medium">Name</p>
                      <p className="text-[14px] font-semibold">{data.name}</p>
                    </div>
                    <div className=" flex space-x-12">
                      <p className="text-[13px] font-medium">Phone Number</p>
                      <p className="text-[14px] font-semibold">
                        {data.phoneNo}
                      </p>
                    </div>
                    <div className=" flex space-x-12">
                      <p className="text-[13px] font-medium">Email</p>
                      <p className="text-[14px] font-semibold">{data.email}</p>
                    </div>
                    <div className=" flex space-x-12">
                      <p className="text-[13px] font-medium">Joined On</p>
                      <p className="text-[14px] font-semibold">
                      {handleDate(data?.createdAt)}
                        
                      </p>
                    </div>
                    <div className=" flex space-x-12">
                      <p className="text-[13px] font-medium">Address</p>
                      <p className="text-[14px] font-semibold">
                        {data.address}
                      </p>
                    </div>
                    
                    <div className=" flex space-x-12">
                      <p className="text-[13px] font-medium">Total Wards</p>
                      <WardInfo dataId={data.id} wards={data.wards} />
                    </div>
                    <div className=" flex space-x-12">
                      <p className="text-[13px] font-medium">Active Plan</p>
                      <p className="text-[14px] font-semibold">{data.plan}</p>
                    </div>
                    <div className=" flex space-x-12">
                      <p className="text-[13px] font-medium">Plan expires on</p>
                      <p className="text-[14px] font-semibold"></p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[18px]">Payments</CardTitle>
                  <CardDescription>Keep track of all payments.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Payments />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default SingleParent;
