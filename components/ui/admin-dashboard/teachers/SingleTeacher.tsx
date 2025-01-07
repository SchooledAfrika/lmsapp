"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useConversion } from "@/data-access/conversion";

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
import MakeAdmin from "./MakeAdmin";
import ApproveKYC from "./ApproveKYC";
import { LoadingSkeleton } from "../sessions/SingleSessionAdmin";

const CommonDivs: React.FC<{
  name: string;
  value: string;
  inactive?: boolean;
}> = ({ name, value, inactive }) => {
  return (
    <div className=" flex gap-2 text-[14px]">
      <p className=" font-medium">{name}:</p>
      <p className={` font-semibold ${inactive && " text-red-600"}`}>{value}</p>
    </div>
  );
};

const SingleTeacher = () => {
  const { id } = useParams();
  //console.log(id);
  const { handleDate } = useConversion();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["SingleTeacher"],
    queryFn: async () => {
      const response = await fetch(`/api/teachers/${id}`);

      const result = await response.json();
      return result;
    },
  });

  //console.log(data);
  //   if is loading
  if (isLoading) {
    return <LoadingSkeleton title="Teacher's Details" />;
  }
  // if is error
  if (isError) {
    return <div className=" flex-1">{error.message}</div>;
  }

  //console.log(data);

  const grade =
    data.grade && data.grade.length > 0
      ? data.grade.join(", ")
      : "Unknown Grade";

  const language =
    data.language && data.language.length > 0
      ? data.language.join(", ")
      : "Unknown Lnguage";

  const subject =
    data.subject && data.subject.length > 0
      ? data.subject.join(", ")
      : "Unknown Subject";
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
            defaultValue="personal-information"
            className="md:w-[100%] w-full"
          >
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
            </TabsList>
            <TabsContent value="personal-information">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[18px]">Personal Data</CardTitle>
                  <CardDescription className="md:hidden block">
                    <div className=" flex justify-end">
                      <p className="text-[14px] font-semibold">
                        {data.teachingRole === "INTERNAL" ? (
                          <MakeAdmin dataId={data.id} />
                        ) : (
                          ""
                        )}
                      </p>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                    <CommonDivs name="Name" value={data.name} />
                    <CommonDivs name="Phone Number" value={data.phoneNo} />
                    <CommonDivs name="Gneder" value={data.gender} />
                    <CommonDivs name="Email" value={data.email} />
                    <CommonDivs name="Preferred Grades" value={grade} />
                    <CommonDivs name="Languages" value={language} />
                    <CommonDivs name="Details" value={data.details} />
                    <CommonDivs name="Email" value={data.email} />
                    <CommonDivs
                      name="Joined On"
                      value={handleDate(data?.createdAt)}
                    />
                    <CommonDivs name="Address" value={data.address} />
                    <CommonDivs name="Subjects" value={subject} />

                    {data.subscriped ? (
                      <CommonDivs name="Active plan" value={data?.subscriped} />
                    ) : (
                      <CommonDivs
                        name="Active plan"
                        value="No plans currentlly"
                        inactive={true}
                      />
                    )}
                    {data.subscriped ? (
                      <CommonDivs
                        name="Plan expires on"
                        value={data?.subscriptionDuration}
                      />
                    ) : (
                      <CommonDivs
                        name="Plan expires on"
                        value="No plans currentlly"
                        inactive={true}
                      />
                    )}
                    <CommonDivs
                      name="Total Hours Taught Online"
                      value={data.hours}
                    />
                    <CommonDivs
                      name="Teaching Role"
                      value={data.teachingRole}
                    />

                    {data.kyc ? (
                      <CommonDivs name="Kyc status" value={data.kyc.status} />
                    ) : (
                      <CommonDivs
                        name="Kyc status"
                        value="No kyc"
                        inactive={true}
                      />
                    )}
                    <CommonDivs name="Role" value={data.role} />

                    <div className=" flex space-x-12">
                      <ApproveKYC teacherData={data} />
                    </div>
                    <div className="hidden md:flex space-x-12">
                      <p className="text-[14px] font-semibold">
                        {data.teachingRole === "INTERNAL" ? (
                          <MakeAdmin dataId={data.id} />
                        ) : (
                          ""
                        )}
                      </p>
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
                  <SingleTeacherClasses
                    dataId={data.id}
                    classes={data.Classes}
                  />
                </CardContent>
                <CardFooter>
                  <DashboardPagination />
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default SingleTeacher;
