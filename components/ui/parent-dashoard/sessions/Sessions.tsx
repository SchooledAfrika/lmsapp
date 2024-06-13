"use client";
import { Course } from "@/constants/parentsCourse";
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

const CourseCard = ({ icon, date, teacherIcon, name, subject }: Props) => {
  return (
    <div className="w-full py-3 px-3 mt-3 bg-white shadow-md  overflow-hidden     font-header rounded-lg flex flex-col  gap-6">
      <div className="flex justify-between ">
        <div className="flex space-x-3">
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
  );
};

const Sessions = () => {
  return (
    <div className="max-w-full mt-6  mx-auto px-4  py-6">
      <div className="grid grid-cols-1 items-center  gap-6  lgl:px-10">
        {Course.map((Course, index) => (
          <CourseCard key={Course.id} {...Course} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Sessions;
