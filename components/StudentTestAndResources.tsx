import React from "react";
import Container from "./Container";
import Image from "next/image";
import StudentTestSubject from "./StudentTestSubject";
import StudentCourseDetails from "./StudentCourseDetails";
import StudentModuleTest from "./StudentModuleTestOne";

const StudentTestAndResources = () => {
  return (
    <section>
      <Container>
        <div className="flex overflow-auto my-6 justify-end items-center font-header font-semibold text-[13px]">
          <div className="flex ">
            <input
              type="checkbox"
              className="accent-lightGreen text-white mr-1"
            />
            <p className="mr-3">All Status</p>
          </div>
          <div className="flex ">
            <input
              type="checkbox"
              className="accent-lightGreen text-white mr-1"
            />
            <p className="mr-3">Newer</p>
          </div>
          <div className="flex ">
            <input
              type="checkbox"
              className="accent-lightGreen text-white mr-1"
            />
            <p className="mr-3">Older</p>
          </div>
        </div>
        <div className="block md:flex gap-4">
          <div className="flex-2 bg-[#FFFFFF] rounded-[8px]">
            <p className="font-bold text-[12px] px-5 pt-8 pb-3 text-gray-400">
              Test
            </p>
            <div className="bg-[#359C7133]">
              <div className="flex items-center px-5 pt-3 pb-2 gap-3 ">
                <Image
                  src="/svgs/calculate.svg"
                  width={30}
                  height={30}
                  alt="Calculator"
                />
                <span className="font-bold text-[14px]">Mathematics</span>
              </div>
              <div className="flex gap-2 text-[12px] font-medium pb-3 pl-[20px] md:pl-[60px]">
                <span>April 22, 2024.</span>
                <span>12:09PM</span>
                <span>25 Minutes</span>
              </div>
            </div>
            <p className="font-bold text-[12px] px-5 py-3 text-gray-400">
              Resources
            </p>
            <div>
              <div className="flex items-center px-5 pt-3 pb-1 gap-3 ">
                <Image
                  src="/svgs/link.svg"
                  width={30}
                  height={30}
                  alt="Calculator"
                />
                <span className="font-bold text-[12px] italic cursor-pointer text-[#099ECF]">
                  docs.google.com/History of Economics/...
                </span>
              </div>
              <div className="flex gap-2 text-[12px] font-medium pb-3 pl-[20px] md:pl-[60px]">
                <span>April 22, 2024.</span>
                <span>12:09PM</span>
                <span>25 Minutes</span>
              </div>
            </div>
            <div>
              <div className="flex items-center px-5 pt-3 pb-2 gap-3 ">
                <Image
                  src="/svgs/book.svg"
                  width={30}
                  height={30}
                  alt="Calculator"
                />
                <span className="font-bold text-[14px]">
                  How Europe underdeveloped Africa
                </span>
              </div>
              <div className="flex gap-2 text-[12px] font-medium pb-3 pl-[20px] md:pl-[60px]">
                <span>April 22, 2024.</span>
                <span>12:09PM</span>
                <span>25 Minutes</span>
              </div>
            </div>
            <p className="font-bold text-[12px] px-5 pb-3 text-gray-400">
              Test
            </p>
            <div className="cursor-pointer pb-10">
              <div className="flex items-center px-5 pt-3 pb-2 gap-3 ">
                <Image
                  src="/svgs/calculate.svg"
                  width={30}
                  height={30}
                  alt="Calculator"
                />
                <span className="font-bold text-[14px]">Mathematics</span>
              </div>
              <div className="flex gap-2 text-[12px] font-medium pb-3 pl-[20px] md:pl-[60px]">
                <span>April 22, 2024.</span>
                <span>12:09PM</span>
                <span>25 Minutes</span>
              </div>
            </div>
          </div>
          <div className="flex-3 bg-[#FFFFFF] h-[70vh] rounded-[8px] p-5">
            <StudentTestSubject />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default StudentTestAndResources;
