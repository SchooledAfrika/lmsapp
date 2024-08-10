"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import IndividualStudentTable from "../../IndividualStudentTable";
import { SiGoogleclassroom } from "react-icons/si";
import AdminCoursesList from "../../AdminCoursesList";

const StudentDetails = () => {
  const [activeComponent, setActiveComponent] = useState("personalInfo");

  const handlePersonalInfoClick = () => {
    setActiveComponent("personalInfo");
  };

  const handleCoursesClick = () => {
    setActiveComponent("courses");
  };

  return (
    <section>
      <div className="flex justify-between items-center">
        <span className="text-[25px] font-bold my-5">
          Student/ <span className="text-[#359C71]">Abu Bin Maurice</span>
        </span>
        <Link href="/admin-dashboard/students">
          <Image
            src="/svgs/close.svg"
            alt="close"
            width={100}
            height={100}
            className="w-[15px]"
          />
        </Link>
      </div>
      <div className="flex bg-white">
        <div className="flex-1 border-r">
          <div className="py-5 pl-6">
            <span className="text-[16px] font-bold">Abu Bin Maurice</span>
            <p className="text-[12px] text-gray-500">info@gmail.com</p>
          </div>
          <hr />
          <div className="py-5 pl-6">
            <p className="font-bold text-[12px]">TOTAL BILL</p>
            <span className="text-[16px] text-[#359C71] font-bold">
              Paid 19 USD
            </span>
            <p className="text-red-600 text-[12px] font-medium">Due 10 USD</p>
          </div>
          <hr />
          <div className="py-5 cursor-pointer">
            <div
              className={`flex items-center py-2 px-6 gap-3 mb-2 ${
                activeComponent === "personalInfo" ? "bg-gray-200" : ""
              }`}
              onClick={handlePersonalInfoClick}
            >
              <Image
                src="/circle-user.png"
                alt="User"
                width={20}
                height={10}
                className="rounded-[100%] h-[20px]"
              />
              <p className="text-[16px] font-bold">Personal Information</p>
            </div>
            <div
              className={`flex items-center py-2 px-6 gap-3 mb-2 ${
                activeComponent === "courses" ? "bg-gray-200" : ""
              }`}
              onClick={handleCoursesClick}
            >
              <SiGoogleclassroom className="sm:inline-block text-[18px] hidden mr-1" />
              <p className="text-[16px] font-bold">Courses</p>
            </div>
          </div>
          <hr />
          <div className="py-5 cursor-pointer pl-6">
            <p className="font-bold text-[12px]">LAST LOGIN</p>
            <span className="text-[16px] text-[#359C71] font-bold">
              16-03-2024 02:39pm
            </span>
          </div>
        </div>
        <div className="flex-2 p-4">
          {activeComponent === "personalInfo" ? (
            <IndividualStudentTable />
          ) : (
            <AdminCoursesList />
          )}
        </div>
      </div>
    </section>
  );
};

export default StudentDetails;
