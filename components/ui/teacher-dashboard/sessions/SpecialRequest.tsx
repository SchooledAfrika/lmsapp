"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { Button } from "../../button";
import Container from "../../../Container";
import { useQuery } from "@tanstack/react-query";
import { FaRegClock } from "react-icons/fa";
import { IoIosRadio } from "react-icons/io";
import { Skeleton } from "@mui/material";
import { Noitem } from "../../../ApplicantsTable";
import { ModifiedNoProfile } from "../../admin-dashboard/sessions/Sessions";
import { HandleAttendance } from "@/components/HandleAddClass";
import { SharedAddLink } from "../../student-dashboard/sessions/OneOnOneSession";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

interface Imeeting {
  link: string;
  createdAt: string;
}
interface Istudent {
  name: string;
  email: string;
  status: string;
  profilePhoto: string;
}
// interface for the type we are getting from backend
interface ISpecialRequest {
  id: string;
  amt: string;
  grade: string;
  language: string;
  studentId: string;
  subject: string;
  time: string;
  student: Istudent;
  SpecialRequestMeeting: Imeeting;
}

interface IoneonOne {
  AppliedSection: ISpecialRequest[];
  sessionId: string;
}

const StartMeetingDiv: React.FC<{ subject: string; language: string }> = ({
  subject,
  language,
}) => {
  return (
    <div className=" flex  gap-1 mx-auto items-center">
      <div className=" flex  text-[12px] items-center gap-1 px-3 py-1 rounded-md bg-[tomato] text-center w-fit text-white">
        {subject}
      </div>
      <div className=" flex  text-[12px] items-center gap-1 px-3 py-1 rounded-md bg-lightGreen text-center w-fit text-white">
        {language}
      </div>
    </div>
  );
};

const TimeShow: React.FC<{
  time: string;
}> = ({ time }) => {
  return (
    <div className=" flex flex-col items-start gap-2 pl-3">
      <div className=" flex gap-3 items-center">
        <FaRegClock className=" text-gray-500" />
        <p className="text-[14px] font-medium">Time: {time}</p>
      </div>
    </div>
  );
};
// start meeting btn
const StartSession = () => {
  return (
    <Button className="bg-[tomato] mt-3 bg-none border-none rounded-lg  hover:bg-[#fd7e62]  text-white text-[13px] font-semibold  px-3 w-full    py-2 text-center lg:block transition-all ease-in-out duration-700">
      <IoIosRadio className="sm:inline-block text-[18px] hidden mr-1" />
      Start Session
    </Button>
  );
};

const ViewDetails: React.FC<{
  sessionId: string;
  isTeacher: boolean;
  name: string;
  link: Imeeting;
}> = ({ sessionId, isTeacher, name, link }) => {
  const router = useRouter();
  const navigateLink = () => {
    if (isTeacher) {
      router.push(
        `/teacher-dashboard/sessions/special-request/${sessionId}`
      );
    } else {
      router.push(
        `/student-dashboard/sessions/special-request/${sessionId}`
      );
    }
  };
  return (
    <div className=" w-full flex flex-col gap-2 px-3">
      <div className=" w-full flex  gap-2 px-3">
        <div
          onClick={navigateLink}
          className=" flex-1 py-3 flex items-center justify-center border border-green-800 rounded-md text-[14px] text-green-900 cursor-pointer hover:bg-green-800 hover:text-white transition-all ease-in-out duration-700 "
        >
          <p>View Details</p>
        </div>
        <SharedAddLink
          link={link}
          isTeacher={isTeacher}
          specialRequest={true}
          sessionId={sessionId}
        />
      </div>
      
    </div>
  );
};
// each session component here
const EachSession: React.FC<{ item: ISpecialRequest; isTeacher: boolean }> = ({
  item,
  isTeacher,
}) => {
  return (
    <div className=" py-2 px-2 rounded-md bg-white shadow-md flex flex-col gap-2">
      <div className=" flex justify-between items-center">
        <div className=" flex items-start gap-2">
          <ModifiedNoProfile userImage={item.student.profilePhoto} />
          <div className=" flex flex-col ">
            <p className="font-bold mt-3 text-[14px] ">{item.student?.name}</p>
            <div
              className={` w-fit px-3 py-1 text-[12px] rounded-md ${
                item.student?.status === "Active"
                  ? "bg-green-200 text-green-900"
                  : item.student?.status === "Pending"
                  ? "bg-yellow-200 text-yellow-600"
                  : "bg-red-200 text-red-900"
              }  font-bold flex items-center justify-center`}
            >
              <p>{item.student?.status}</p>
            </div>
          </div>
        </div>
        <div className=" bg-green-200 text-green-800 px-2 py-1 font-bold text-[12px] rounded-md">
          <p>{item.grade || ""}</p>
        </div>
      </div>
      <StartMeetingDiv subject={item.subject} language={item.language} />
      <TimeShow time={item.time} />
      <div className="flex flex-col gap-1">
      <ViewDetails
         isTeacher={isTeacher}
         name={item.student?.name}
         link={item.SpecialRequestMeeting}
         sessionId={item.id}
      />
        
        <HandleAttendance sessionId={item.id} name={item.student?.name} />
      </div>
    </div>
  );
};

export const SessionLoadings = () => {
  const dummyArrays = new Array(6).fill("");
  return (
    <div className=" w-full flex flex-col gap-3 max-ss:mt-[90px]">
      <div className=" gap-2 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {dummyArrays.map((dummy, index) => (
          <Skeleton
            key={index}
            animation="wave"
            variant="rectangular"
            height={300}
            className=" rounded-md"
          />
        ))}
      </div>
    </div>
  );
};

const SpecialRequest: React.FC<{ isTeacher: boolean }> = ({ isTeacher }) => {
  const { data: session } = useSession();
  const studentId = session?.user?.id;
  //console.log(studentId);
  // here we can now fetch our session
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getSpecialRequest"],
    queryFn: async () => {
      const response = await fetch(`/api/teacher-special-request`);
      const result = await response.json();
      return result;
    },
  });
  //console.log(data)

  if (isLoading) return <SessionLoadings />;
  if (isError)
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );

  const oneOneOneData: ISpecialRequest[] = data;

  return (
    <section className="my-[80px] md:my-4">
      <Container>
        <div>
          {Array.isArray(oneOneOneData) && (
            <div>
              {oneOneOneData.length === 0 ? (
                <div>
                  <Noitem desc="No Session at the moment" />
                </div>
              ) : (
                <div className=" w-full grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                  {oneOneOneData.map((item, index) => (
                    <EachSession
                      isTeacher={isTeacher}
                      key={index}
                      item={item}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
      <ToastContainer />
    </section>
  );
};

export default SpecialRequest;
