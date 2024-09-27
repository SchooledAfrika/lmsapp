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
import SingleTeacherPaymentComplete from "../SingleTeacherPaymentComplete";
import SingleTeacherPaymentPending from "../SingleTeacherPaymentPending";

interface Ipayments{
    dataId: string;
}

const Payments: React.FC<Ipayments> = () => {
  const { id } = useParams();
  console.log(id);
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["SingleTeacher"],
    queryFn: async () => {
      const response = await fetch(`/api/teachers/${id}`);

      const result = await response.json();
      return result;
    },
  });

  console.log(data);

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
        <div key={data.id} className="font-header md:my-12 mt-24 mb-12">
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

          <Tabs
            defaultValue="payments"
            className="md:w-[100%] w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              
              
              <TabsTrigger value="payments">
                {" "}
                <MdOutlinePayments className="mr-2 w-5 h-5" /> Payments
              </TabsTrigger>
            </TabsList>
           
            
            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[18px]">Payments</CardTitle>
                  <CardDescription>Keep track of all payments.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Tabs defaultValue="pending-payment" className=" w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="pending-payment">
                        Pending
                      </TabsTrigger>
                      <TabsTrigger value="complete-payment">Completed</TabsTrigger>
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
                          <SingleTeacherPaymentPending dataId={data.id} photo={data.profilePhoto} name={data.name} email={data.email} bankName={data.bankName} accountName={data.accountName} accountNo={data.accountNo}  />
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
};

export default Payments;
