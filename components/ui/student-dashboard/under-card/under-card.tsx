"use client";
import PieCharts from "@/components/PieChart";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useConversion } from "@/data-access/conversion";
import { TiArrowSortedDown } from "react-icons/ti";
import { GoDotFill } from "react-icons/go";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { BsBroadcast } from "react-icons/bs";

interface ScheduleBlockProps {
  name?: string;
  classTime?: string;
  classStarts?: string;
  grade: string;
  classStart?: string;
  startTime?: string;
  sectionType?: string;
  time?: string;
  subject?: string | string[];
  subjects?: string | string[];
  borderColor: string;
}

const fetchSessions = async (endpoint: string) => {
  const response = await fetch(endpoint);
  const result = await response.json();
  return result;
};

const ScheduleBlock: React.FC<ScheduleBlockProps> = ({
  name,
  classTime,
  time,
  startTime,
  grade,
  sectionType,
  subject,
  subjects,
  borderColor,
}) => {
  const { handleTime } = useConversion();
  return (
    <div className="flex my-4 space-x-4">
      <div className="flex flex-col space-y-2">
        <p className="text-[12px] font-semibold">
          {name} {handleTime(startTime || "")} {time}
        </p>
        <p className="text-[12px] font-semibold">{sectionType}</p>
      </div>
      <div className={`border-2 ${borderColor} rounded-full`}></div>
      <div className="flex flex-col space-y-2">
        <p className="text-[13px] font-semibold">{subject} {subjects}</p>
        <p className="text-slate-500 text-[12.5px]">{grade}</p>
      </div>
    </div>
  );
};

const UnderCard = () => {
  const { data: session } = useSession();
      const studentId = session?.user?.id; 

   // Fetch data for each session type
    const { data: classesStudents, isLoading: loadingClassesStudents } = useQuery({
      queryKey: ["classesOverviewStudents"],
      queryFn: () => fetchSessions("/api/all-classes"),
    });
  
    const { data: privateSessionsStudents, isLoading: loadingPrivateSessionsStudents } = useQuery(
      {
        queryKey: ["privateSessionsOverviewStudents"],
        queryFn: () => fetchSessions("api/one-on-one-section"),
      }
    );
  
    const { data: specialRequestsStudents, isLoading: loadingSpecialRequestsStudents } = useQuery(
      {
        queryKey: ["specialRequestsOverviewStudents"],
        queryFn: () => fetchSessions(`/api/student-special-request?studentId=${studentId}`),
      }
    );

    //console.log(classesStudents, privateSessionsStudents, specialRequestsStudents);
  
    // Loading and Error Handling
    if (loadingClassesStudents || loadingPrivateSessionsStudents || loadingSpecialRequestsStudents) {
      return <div></div>;
    }
  
    // Extract last item from each session
    const lastClassStudents = classesStudents?.[classesStudents.length - 1];
    const lastPrivateSessionStudents = privateSessionsStudents?.[privateSessionsStudents.length - 1];
    const lastSpecialRequestStudents = specialRequestsStudents?.[specialRequestsStudents.length - 1];
  
    const subject =
      lastPrivateSessionStudents?.subject && lastPrivateSessionStudents.subject.length > 0
        ? lastPrivateSessionStudents.subject.join(", ")
        : "Unknown Subject";
  return (
    <div className="mt-12  flex md:flex-row flex-col relative   text-[15px] gap-3   md:gap-3 rounded-md">
      <div className="flex md:flex-5     px-3 bg-white rounded-md py-6  flex-col">
        <p className="font-bold text-slate-400 text-[14px]">Ongoing Session</p>
        <div className="relative">
           <Image
           src="/tutors.jpg"
           alt="teacher"
           width={200}
           height={200}
           className="rounded-md   mt-3 w-[35rem] object-top h-[13.8rem] object-cover "
        
        /> 
         <Button
            asChild
            className=" bg-dimOrange hover:bg-dimYellow absolute bottom-4 md:right-4 md:left-4 left-4 rounded-md text-white text-[13px] mt-3   ml-3 md:w-32 w-[90%] md:mx-0 mx-auto    py-2 text-center lg:block"
          >
            <Link href="/" className="inline"><BsBroadcast className="inline mr-1" />Join Session</Link>
          </Button>
        </div>
        <p className="py-2 text-[14px] font-bold">Mathematics Class, Grade 10</p>
        
        

       
      </div>
      {/* second flex */}

      <div className="bg-white  rounded-md flex-3  py-6  px-4 ">
        <div className="flex justify-between ">
          <p className="text-slate-500 text-[14px] font-semibold">Schedule</p>
          <Link href="/student-dashboard/sessions" className="text-[11.5px] text-lightGreen ">
            View More
          </Link>
        </div>
        {/* 1st Div */}

        {lastClassStudents && (
          <ScheduleBlock
            name={lastClassStudents.name}
            classTime={lastClassStudents.classTime}
            subjects={lastClassStudents.subjects}
            grade={lastClassStudents.grade}
            borderColor="border-lightGreen"
          />
        )}

        {/* 2nd Div */}
        {lastSpecialRequestStudents && (
          <ScheduleBlock
            time={lastSpecialRequestStudents.time}
            subject={lastSpecialRequestStudents.subject}
            grade={lastSpecialRequestStudents.grade}
            borderColor="border-amber-500"
          />
        )}

        {/* 3rd Div */}

        {lastPrivateSessionStudents && (
          <ScheduleBlock
            startTime={lastPrivateSessionStudents.startTime}
            sectionType={lastPrivateSessionStudents.sectionType}
            subject={subject}
            grade={lastPrivateSessionStudents.grade}
            borderColor="border-orange-500"
          />
        )}

        

        
      </div>

      

      
      
    </div>
  );
};

export default UnderCard;
