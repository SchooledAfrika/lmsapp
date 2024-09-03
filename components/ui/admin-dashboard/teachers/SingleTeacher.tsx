import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Image from "next/image";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import { MdOutlinePayments } from "react-icons/md";
import DashboardPagination from "@/components/DashboardPagination";
import SingleTeacherClasses from "./SingleTeacherClasses";
import SingleTeacherPaymentComplete from "./SingleTeacherPaymentComplete";
import SingleTeacherPaymentPending from "./SingleTeacherPaymentPending";

export function SingleTeacher() {
  return (
    <div className="font-header md:my-12 mt-24 mb-12">
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
                  <p className="text-[14px] font-semibold">Okechukwu Okorie</p>
                </div>
                <div className=" flex space-x-12">
                  <p className="text-[13px] font-medium">Phone Number</p>
                  <p className="text-[14px] font-semibold">+2349130893924</p>
                </div>
                <div className=" flex space-x-12">
                  <p className="text-[13px] font-medium">Email</p>
                  <p className="text-[14px] font-semibold">
                    odomaurice501@gmail.com
                  </p>
                </div>
                <div className=" flex space-x-12">
                  <p className="text-[13px] font-medium">Joined On</p>
                  <p className="text-[14px] font-semibold">14th June 2024</p>
                </div>
                <div className=" flex space-x-12">
                  <p className="text-[13px] font-medium">State</p>
                  <p className="text-[14px] font-semibold">Enugu</p>
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
  );
}
