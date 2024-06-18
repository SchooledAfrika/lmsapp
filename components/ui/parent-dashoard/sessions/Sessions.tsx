"use client";
import { ParentsSession } from "@/constants/parentsSession";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProgressBar } from "@/components/ProgressBar";
import { BsThreeDots } from "react-icons/bs";

interface Props {
  icon: string;
  date: string;
  teacherIcon: string;
  name: string;
  subject: string;
  index: number;
}

const SessionCard = ({ icon, date, teacherIcon, name, subject }: Props) => {
  return (
    <div className="">
      {/* Desktop screens */}
      <div className="w-full py-3 px-3 md:my-3 my-12 bg-white shadow-md  overflow-x-auto     font-header rounded-lg md:flex flex-col hidden   gap-6">
        <div className="flex justify-between  ">
          <div className="flex space-x-3 ">
            <div className="border-l-4 rounded-full leading-[100px] border-l-lightGreen"></div>
            <div className="py-3 flex flex-col">
              <div className="flex space-x-2 mb-2">
                <Image
                  src={icon}
                  alt="course"
                  width={100}
                  height={100}
                  className="w-[30px] h-[30px]"
                />
                <p className="font-bold">{subject}</p>
              </div>
              <p className="text-[12px] font-semibold">{date}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Image
              src={teacherIcon}
              alt="teacher"
              width={100}
              height={100}
              className="w-[35px] h-[35px] rounded-full"
            />
            <p className="text-[13px] font-semibold">{name}</p>
          </div>
          <div className="w-1/5 flex items-center">
            <ProgressBar />
          </div>
          <div className="flex items-center">
            <Button
              asChild
              className="bg-dimOrange hover:bg-dimYellow text-[10px]"
            >
              <Link href="/parents-dashboard/sessions/test" className="">
                Lesson in Session
              </Link>
            </Button>
          </div>

          <div className="flex items-center">
            <Link href="/parents-dashboard/sessions/test" className="">
              <BsThreeDots className="text-[25px] text-lightGreen" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile screens */}

      <div className="w-full md:hidden border-2  py-6 px-3 mt-6  overflow-hidden      font-header rounded-lg card flex flex-col justify-center gap-6 hover:-translate-y-2 transition-transform duration-300 group">
        <div className="flex flex-col justify-between    ">
          <div className="flex space-x-3 mb-2 ">
            <div className="py-3 flex flex-col">
              <div className="flex space-x-24  mb-2">
                <p className="font-bold inline text-[15px]">
                  <Image
                    src={icon}
                    alt="course"
                    width={100}
                    height={100}
                    className="w-[40px] inline h-[40px]"
                  />{" "}
                  {subject}
                </p>

                <Link href="/parents-dashboard/sessions/test" className="">
                  <BsThreeDots className="text-[25px]  text-lightGreen" />
                </Link>
              </div>
              <p className="text-[13px] font-semibold">{date}</p>
            </div>
          </div>

          <div className="flex items-center mb-2 space-x-2">
            <Image
              src={teacherIcon}
              alt="teacher"
              width={100}
              height={100}
              className="w-[40px] h-[40px] rounded-full"
            />
            <p className="text-[14px] font-semibold">{name}</p>
          </div>
          <div className=" flex items-center my-4">
            <ProgressBar />
          </div>
          <div className="flex ">
            <Button
              asChild
              className="bg-dimOrange w-full hover:bg-dimYellow text-[12px]"
            >
              <Link href="/parents-dashboard/sessions/test" className="">
                Lesson in Session
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Sessions = () => {
  return (
    <div className="max-w-full md:mt-6 mt-12  mx-auto px-4  py-3">
      <div className="grid grid-cols-1 items-center   gap-6 ">
        {ParentsSession.map((Session, index) => (
          <SessionCard key={Session.id} {...Session} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Sessions;
