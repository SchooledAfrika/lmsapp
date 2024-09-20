"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
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
import SingleTeacherClasses from "./SingleTeacherClasses";
import SingleTeacherPaymentComplete from "./SingleTeacherPaymentComplete";
import SingleTeacherPaymentPending from "./SingleTeacherPaymentPending";

const SingleTeacher = () => {
  const { id } = useParams();
  console.log(id)
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["SingleTeacher"],
    queryFn: async () => {
      const response = await fetch(`/api/teachers/${id}`);
     
      const result = await response.json();
      return result;
    },
    
  });
  
  console.log(data)

  //   if is loading
  if (isLoading) {
    return (
      <div className="">
        <p className="my-4 font-bold">loading...</p>

       
      </div>
    );
  }
  // if is error
  if (isError) {
    return <div className=" flex-1">{error.message}</div>;
  }
  return (
    <div>
        {data && (
   
    <div key={data.id}   className="font-header md:my-12 mt-24 mb-12">
      <div className="flex md:my-12 mt-24 mb-12 justify-between">
        <p className="font-bold text-lg">Teacher Details</p>
        <Link href="/admin-dashboard/teachers" className="cursor-pointer">
          <Image
            src="/closeAlt.svg"
            alt="cancel"
            width={100}
            height={100}
            className="w-[20px] h-[20px]"
          />
        </Link>
      </div>

      <Tabs defaultValue="personal-information" className="md:w-[100%] w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal-information">
            {" "}
            <FaRegEye className="mr-2 w-5 h-5" /> Personal Data
          </TabsTrigger>
          <TabsTrigger value="courses">
            {" "}
            <IoBookOutline className="mr-2 w-5 h-5" />
            Courses
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
                <div className=" flex space-x-12">
                  <p className="text-[13px] font-medium">Name</p>
                  <p className="text-[14px] font-semibold"></p>
                </div>
                <div className=" flex space-x-12">
                  <p className="text-[13px] font-medium">Phone Number</p>
                  <p className="text-[14px] font-semibold"></p>
                </div>
                <div className=" flex space-x-12">
                  <p className="text-[13px] font-medium">Gender</p>
                  <p className="text-[14px] font-semibold">
                    
                  </p>
                </div>
                <div className=" flex space-x-12">
                  <p className="text-[13px] font-medium">Email</p>
                  <p className="text-[14px] font-semibold">
                    
                  </p>
                </div>
                <div className=" flex space-x-12">
                  <p className="text-[13px] font-medium">Preferred Grade(s)</p>
                  <p className="text-[14px] font-semibold">
                    
                  </p>
                </div>
                <div className=" flex space-x-12">
                  <p className="text-[13px] font-medium">Language(s)</p>
                  <p className="text-[14px] font-semibold">
                    
                  </p>
                </div>
                <div className=" flex space-x-12">
                  <p className="text-[13px] font-medium">Details</p>
                  <p className="text-[14px] font-semibold">
                    
                  </p>
                </div>
                <div className=" flex space-x-12">
                  <p className="text-[13px] font-medium">Email</p>
                  <p className="text-[14px] font-semibold">
                 
                    
                  </p>
                </div>
                <div className=" flex space-x-12">
                  <p className="text-[13px] font-medium">Joined On</p>
                  <p className="text-[14px] font-semibold"></p>
                </div>
                <div className=" flex space-x-12">
                  <p className="text-[13px] font-medium">Address</p>
                  <p className="text-[14px] font-semibold"></p>
                </div>
                <div className=" flex space-x-12">
                  <p className="text-[13px] font-medium">Country</p>
                  <p className="text-[14px] font-semibold">Nigeria</p>
                </div>
                <div className=" flex space-x-12">
                  <p className="text-[13px] font-medium">
                    Active Plan
                  </p>
                  <p className="text-[14px] font-semibold">Basic</p>
                </div>
                <div className=" flex space-x-12">
                  <p className="text-[13px] font-medium">
                    Plan expires on
                  </p>
                  <p className="text-[14px] font-semibold">20th October 2023</p>
                </div>
                <div className=" flex space-x-12">
                  <p className="text-[13px] font-medium">
                    Total Hours Taught Online
                  </p>
                  <p className="text-[14px] font-semibold">2000Hrs+</p>
                </div>
                <div className=" flex space-x-12">
                  <p className="text-[13px] font-medium">
                    Total Courses Taught
                  </p>
                  <p className="text-[14px] font-semibold">20</p>
                </div>
                
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle className="text-[18px]">Courses</CardTitle>
              <CardDescription>
                All courses handled by a teacher.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <SingleTeacherClasses />
            </CardContent>
            <CardFooter>
              <DashboardPagination />
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle className="text-[18px]">Payments</CardTitle>
              <CardDescription>Keep track of all payments.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Tabs defaultValue="complete-payment" className=" w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="complete-payment">Completed</TabsTrigger>
                  <TabsTrigger value="pending-payment">Pending</TabsTrigger>
                </TabsList>
                <TabsContent value="complete-payment">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-[16px]">
                        Complete Payment
                      </CardTitle>
                      <CardDescription>
                        View all completed payment information.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <SingleTeacherPaymentComplete />
                    </CardContent>
                    <CardFooter>
                      <DashboardPagination />
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="pending-payment">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-[16px]">
                        Pending Payment
                      </CardTitle>
                      <CardDescription>
                        View all pending payment information.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <SingleTeacherPaymentPending />
                    </CardContent>
                    <CardFooter>
                      <DashboardPagination />
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
      )} 
    </div>
  );
}

export default SingleTeacher
