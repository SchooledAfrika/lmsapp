"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { SingleClassSkeleton } from "./SingleClassroom";
import { Announcement, Resources, SingleTop } from "./StudentSchoolClass";
import Image from "next/image";
import { useConversion } from "@/data-access/conversion";
import { BsBroadcast } from "react-icons/bs";
import { PiBookFill } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import { Iannoucement } from "./SingleClassroom";
import { useSession } from "next-auth/react";

export interface ITest {
  answer: string;
  question: string;
  options: string[];
  studentAnswer: string | null;
}

export interface IExam {
  answeredStudentIds: string[];
  classesId: string;
  createdAt: string;
  duration: string;
  grade: string;
  id: string;
  subject: string;
  title: string;
  updatedAt: string;
  test: ITest[];
}

interface IGroupClass {
  id: string;
  subject: string;
  className: string;
  grade: string;
  duration: string;
  classStarts: Date;
  classEnds: Date;
  schedules: string[];
  price: number;
  classBanner: string;
  rating: any;
  publicClass: boolean;
  classTime: string;
  studentIDs: string[];
  maxCapacity: number;
  currentCapacity: number;
  resourcesIds: any[];
  createdAt: Date;
  AnnouncementByTeacherClass: Iannoucement[];
  ClassExams: IExam[];
  teacher: {
    name: string;
    profilePhoto: string;
  };
}

// this component below shows the exam in the class
export const Exams: React.FC<{ exams: IExam[] }> = ({ exams }) => {
  const { getTimeAgo } = useConversion();
  const { data } = useSession();
  const router = useRouter();
  // lets push to the exam page for student to start exam
  const handleMoveToExam = (id: string) => {
    router.push(`/student-dashboard/classroom/start-exam?examId=${id}`);
  };
  return (
    <div className=" flex-1 flex flex-col gap-2 bg-white rounded-md p-5">
      <p className=" text-slate-500 font-semibold">Exams</p>
      {exams.length === 0 ? (
        <div className=" w-full flex items-center justify-center flex-col gap-2">
          <Image
            src="/noitem.avif"
            alt="no-item"
            width={200}
            height={200}
            className=" w-[200px] aspect-square rounded-md"
          />
          <p className=" text-slate-500 font-semibold">No exams yet</p>
        </div>
      ) : (
        <div className=" w-full flex flex-col gap-2">
          {exams.map((exam, index) => (
            <div
              key={index}
              className=" px-3 py-3 rounded-lg flex items-center justify-between  border "
            >
              <div className=" flex flex-col">
                <p className=" text-black font-bold text-[14px] md:text-[18px]">
                  {exam.title}
                </p>
                <p className=" text-slate-600 text-[14px]">
                  {getTimeAgo(exam.createdAt)}
                </p>
              </div>
              <div>
                {exam.answeredStudentIds.includes(data?.user.id!) ? (
                  <div className=" max-ss:text-[12px] bg-slate-500 text-slate-300 rounded-md px-2 md:px-4 py-2 cursor-not-allowed">
                    <p>Answered</p>
                  </div>
                ) : (
                  <div
                    onClick={() => handleMoveToExam(exam.id)}
                    className=" max-ss:text-[12px] bg-green-700 text-white  px-2 md:px-4 py-2 rounded-md cursor-pointer"
                  >
                    <p>Start now</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// information about the class
export const ClassInfo: React.FC<{
  name: string;
  banner: string;
  grade: string;
  duration: string;
  createdAt: Date;
}> = ({ name, banner, grade, duration, createdAt }) => {
  const { handleDate } = useConversion();
  return (
    <div className=" bg-white w-full rounded-md px-5 py-3 flex flex-col gap-4">
      {/* first part */}
      <div className=" flex items-center justify-between">
        <p className=" text-slate-400 font-semibold text-[12px]">Overview</p>
        <div className=" text-white w-[40px] aspect-square rounded-md flex items-center justify-center bg-green-700">
          <PiBookFill />
        </div>
      </div>
      {/* second part */}
      <div className=" flex flex-col gap-3">
        <div className=" flex  items-center gap-4">
          <Image
            className=" w-[110px] h-[90px] aspect-square rounded-md"
            src={banner}
            alt=""
            width={200}
            height={200}
          />
          <div className=" flex flex-col gap-1">
            <div className=" flex items-center gap-1 font-bold">
              <SiGoogleclassroom className=" text-[14px]" />
              <p className=" text-[12px]">{name}</p>
            </div>
            <p className=" text-[12px]">{grade}</p>
          </div>
        </div>
        <p className=" text-[12px] font-semibold ">Duration: {duration}</p>
      </div>
      {/* last part */}
      <div className=" flex flex-col gap-2">
        <p className=" text-[12px] text-slate-600">
          Date created: {handleDate(createdAt.toString())}
        </p>
        <div className=" flex items-center gap-2 px-4 py-2 bg-orange-500 rounded-md w-fit text-white text-[12px] font-bold">
          <BsBroadcast />
          <p>Join Session</p>
        </div>
      </div>
    </div>
  );
};

// this will show more information
const ClassDetails: React.FC<{
  subject: string;
  studentNo: string[];
  teacherName: string;
  teacherPhoto: string;
}> = ({ subject, studentNo, teacherName, teacherPhoto }) => {
  return (
    <div className=" bg-white p-5 flex flex-col gap-4">
      <p className="text-slate-400 font-semibold text-[12px]">Class Details</p>
      <div className=" flex items-center justify-between">
        <p className=" text-[16px] font-semibold text-slate-600">Subject</p>
        <div className=" flex gap-1 items-center">
          <Image
            className=" w-[20px] h-[20px] aspect-square rounded-md"
            src={`/${subject.toLowerCase()}.png`}
            alt=""
            width={200}
            height={200}
          />
          <p className=" text-[12px] font-bold">{subject}</p>
        </div>
      </div>
      <div className=" flex items-center justify-between">
        <p className=" text-[16px] font-semibold text-slate-600">
          Total student
        </p>
        <p className="text-[12px] font-bold">{studentNo.length}</p>
      </div>
      <div className=" flex flex-col gap-1">
        <p className=" text-[16px] font-semibold text-slate-600">tutor</p>
        <div className=" flex items-center gap-1">
          <Image
            src={teacherPhoto}
            alt=""
            width={200}
            height={200}
            className=" w-[25px] h-[25px] rounded-full"
          />
          <p className=" font-semibold text-[14px]">{teacherName}</p>
        </div>
      </div>
    </div>
  );
};

const StudentGroupClass = () => {
  const { id } = useParams();
  const { data, isFetching, error, isError } = useQuery({
    queryKey: ["StudentGroupClass"],
    queryFn: async () => {
      const response = await fetch(
        `/api/class-action/single-group-class?classId=${id}`
      );
      const result = await response.json();
      return result;
    },
  });
  //   check for loading
  if (isFetching) {
    return (
      <div className=" mt-6">
        <SingleClassSkeleton />;
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );
  }
  const classInfo: IGroupClass = data;
  console.log(classInfo);
  return (
    <div className=" mt-6 flex flex-col gap-3">
      <SingleTop />
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-3">
        <ClassInfo
          grade={classInfo.grade}
          name={classInfo.className}
          banner={classInfo.classBanner}
          duration={classInfo.duration}
          createdAt={classInfo.createdAt}
        />
        <Announcement info={classInfo.AnnouncementByTeacherClass} />
        <ClassDetails
          subject={classInfo.subject}
          studentNo={classInfo.studentIDs}
          teacherName={classInfo.teacher.name}
          teacherPhoto={classInfo.teacher.profilePhoto}
        />
      </div>
      <div className=" w-full flex flex-col md:flex-row gap-3">
        <Exams exams={classInfo.ClassExams} />
        <Resources resources={classInfo.resourcesIds} />
      </div>
    </div>
  );
};

export default StudentGroupClass;
