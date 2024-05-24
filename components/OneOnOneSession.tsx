import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import DashboardPagination from "./DashboardPagination";
import Container from "./Container";
import { OneOnOneList } from "@/constants/oneOnOneList";

const OneOnOne = () => {
  return (
    <section className="my-[80px] md:my-4">
      <Container>
        <div className="flex justify-end mb-2">
          <Link href={"/teacher-dashboard/edit-profile"}>
            <Button className="bg-secondary text-white text-[12px] py-5 my-3 mr-0 md:mr-6">
              <Image
                src="/svgs/edit.svg"
                width={20}
                height={20}
                className="mr-2"
                alt="Edit Session Profile"
              />
              Edit Session Profile
            </Button>
          </Link>
        </div>

        <div className="flex flex-wrap gap-3">
          {OneOnOneList.map((details, index) => (
            <div
              key={index}
              className="w-full lg:w-fit bg-[#FFFFFF] py-[17px] shadow-lg px-4 rounded-[10px]"
            >
              <div className="flex justify-between">
                <div>
                  <div className="flex gap-4">
                    <Image
                      src={details.teacherImg}
                      width={50}
                      height={50}
                      alt="Teacher Image"
                    />
                    <div>
                      <p className="font-bold text-[12px]">
                        {details.teacherName}
                      </p>
                      <span className="text-[8px] bg-[#359C714D] rounded px-3 font-bold text-green-700 py-1">
                        {details.active}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center pt-5 pb-3">
                    <span className="flex gap-1 items-center font-bold border-r-2 pr-4 text-[12px] mr-4">
                      <Image
                        src={details.calIcon}
                        width={20}
                        height={20}
                        alt="Teacher Image"
                      />
                      {details.subject}
                    </span>
                    <span className="font-bold text-[12px]">
                      {details.grade}
                    </span>
                  </div>
                  <div className="pb-4 pl-6">
                    <p className="text-green-600 text-[12px] font-bold">
                      {details.classType}
                    </p>
                  </div>
                  <div>
                    <div className="flex gap-3">
                      <Image
                        src={details.clockIcon}
                        width={15}
                        height={15}
                        alt="Teacher Image"
                      />
                      <span className="font-medium text-[12px]">
                        {details.duration}
                      </span>
                    </div>
                    <div className="flex gap-3 pt-5 pb-3">
                      <Image
                        src={details.clockIcon}
                        width={15}
                        height={15}
                        alt="Teacher Image"
                      />
                      <span className="font-medium text-[12px]">
                        {details.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Link href={"/school-dashboard/job-listing/new"}>
                      <Button className="border bg-[#FFFFFF] border-green-700 font-medium py-5 text-[12px] px-8 my-3 text-green-700">
                        {details.viewDetails}
                      </Button>
                    </Link>
                    <Link href={"#"} className="block md:hidden">
                      <Button className="bg-[#FF6634] py-5 text-[10px] text-[#FFFFFF] px-4 my-3">
                        <Image
                          src={details.sessionsIcon}
                          width={15}
                          height={15}
                          className="mr-2"
                          alt="Start Session"
                        />
                        {details.startSession}
                      </Button>
                    </Link>
                  </div>
                </div>
                <div>
                  <Link href={"#"} className="hidden md:block pt-10">
                    <Button className="bg-[#FF6634] p-2 text-[10px] text-[#FFFFFF] ml-4">
                      <Image
                        src="/svgs/session.svg"
                        width={15}
                        height={15}
                        className="mr-2"
                        alt="Start Session"
                      />
                      {details.startSession}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <DashboardPagination />
      </Container>
    </section>
  );
};

export default OneOnOne;
