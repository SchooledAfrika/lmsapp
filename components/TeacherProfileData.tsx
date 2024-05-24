import React from "react";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";

const TeacherProfileData = () => {
  return (
    <section>
      <Container>
        <div>
          <div className="flex justify-between items-center mb-5">
            <span className="font-bold">Details</span>
            <Link
              href="/school-dashboard/job-listing"
              className="cursor-pointer"
            >
              <Image src="/closeAlt.svg" alt="cancel" width={15} height={15} />
            </Link>
          </div>
          <div>
            <div className="flex gap-10">
              <span className="bg-[#359C71] px-[7px] rounded-full text-white">
                1
              </span>
              <p className="text-[#359C71] font-bold">Profile Data</p>
            </div>
            <p className="border-l-2 border-[#E9ECEB] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#E9ECEB] rounded-full px-[7px] text-white">
                2
              </span>
              <p>Subject and Preferences</p>
            </div>
            <p className="border-l-2 border-[#E9ECEB] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#E9ECEB] rounded-full px-[7px] text-white">
                3
              </span>
              <p>Pricing Details</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TeacherProfileData;
