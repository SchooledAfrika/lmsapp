"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../button";
import Container from "../../../Container";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MdContentCopy } from "react-icons/md";
import { useCopy } from "@/data-access/copy";
import { FaRegClock } from "react-icons/fa";
import { useConversion } from "@/data-access/conversion";
import { IoIosRadio } from "react-icons/io";
import { Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";
import { Noitem } from "../../../ApplicantsTable";
import { HandleAttendance } from "@/components/HandleAddClass";
import { toast, ToastContainer } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import "react-toastify/dist/ReactToastify.css";

interface IstudentOneonOne {
  name: string;
  email: string;
  profilePhoto: string;
  status: string;
}
interface Imeeting {
  link: string;
  createdAt: string;
}
// interface for the type we are getting from backend
interface IAppliedSession {
  amt: number;
  classStart: string;
  createdAt: string;
  duration: string;
  grade: string;
  hoursperday: string;
  id: string;
  learningDays: string[];
  learningGoals: string;
  specialNeeds: string[];
  student: IstudentOneonOne;
  sectionOwner: {
    teacher: IstudentOneonOne;
  };
  SingleMeeting: Imeeting;
  subject: string[];
  sectionType: string;
}

interface IoneonOne {
  AppliedSection: IAppliedSession[];
  sessionId: string;
}
// component to show sessionId or create session btn
const CreateSession = () => {
  return (
    <Link href={"/teacher-dashboard/sessions/edit-profile"}>
      <Button className="bg-secondary text-white text-[12px] py-5 my-3 mr-0 md:mr-6">
        <Image
          src="/svgs/edit.svg"
          width={20}
          height={20}
          className="mr-2"
          alt="Create Session Profile"
        />
        Create Session Profile
      </Button>
    </Link>
  );
};

export const ShowUserId: React.FC<{ userId: string }> = ({ userId }) => {
  const { copied, copyText } = useCopy();
  return (
    <div className=" flex items-center gap-2 ">
      <p className=" font-bold">{userId}</p>
      <div className=" cursor-pointer">
        {copied ? (
          <p className=" text-green-700 text-[12px]">copied</p>
        ) : (
          <MdContentCopy onClick={() => copyText(userId)} />
        )}
      </div>
    </div>
  );
};

const ProfileTop: React.FC<{
  profilePhoto: string;
  name: string;
  email: string;
  status: string;
  grade: string;
}> = ({ profilePhoto, name, status, grade, email }) => {
  return (
    <div className=" flex justify-between items-center">
      <div className=" flex items-start gap-2">
        <Image
          src={profilePhoto}
          alt="ProfileDp"
          width={200}
          height={200}
          className=" w-[50px] h-[60px] rounded-md"
        />
        <div className=" flex flex-col -space-y-[3px]">
          <p className=" text-[14px] ">{name}</p>
          <div
            className={` w-fit px-3 py-1 text-[12px] rounded-md ${
              status === "Active"
                ? "bg-green-200 text-green-900"
                : status === "Pending"
                ? "bg-yellow-200 text-yellow-600"
                : "bg-red-200 text-red-900"
            }  font-bold flex items-center justify-center`}
          >
            <p>{status}</p>
          </div>
        </div>
      </div>
      <div className=" bg-green-200 text-green-800 px-2 py-1 font-bold text-[12px] rounded-md">
        <p>{grade}</p>
      </div>
    </div>
  );
};
const StartMeetingDiv: React.FC<{ subjects: string[]; type: string }> = ({
  subjects,
  type,
}) => {
  return (
    <div className=" flex flex-col gap-1 items-center">
      <div className=" flex  text-[12px] items-center gap-1 px-2 py-1 rounded-md bg-[tomato] w-fit text-white">
        {subjects.map((item, index) => (
          <p key={index}>
            {item}
            {subjects.length !== index + 1 && <span>,</span>}
          </p>
        ))}
      </div>
      <div className=" px-3 py-1 rounded-md text-[12px] bg-green-700 text-white">
        <p>{type}</p>
      </div>
    </div>
  );
};

const TimeShow: React.FC<{
  duration: string;
  start: string;
  hours: string;
}> = ({ duration, start, hours }) => {
  const { handleDate } = useConversion();
  return (
    <div className=" flex flex-col items-start gap-2 pl-3">
      <div className=" flex gap-3 items-center">
        <FaRegClock className=" text-gray-500" />
        <p className="text-[14px]">Duration: {duration}</p>
      </div>
      <div className=" flex gap-3 items-center">
        <FaRegClock className=" text-gray-500" />
        <p className="text-[14px]">Class Starts: {handleDate(start)}</p>
      </div>
      <div className=" flex gap-3 items-center">
        <FaRegClock className=" text-gray-500" />
        <p className="text-[14px]">hours/day: {hours}hours</p>
      </div>
    </div>
  );
};

// /api/teacher-special-request/class-link
// /api/one-on-one-section/class-link

const AddMettingModel: React.FC<{
  showModel: boolean;
  setShowmodel: React.Dispatch<React.SetStateAction<boolean>>;
  sessionId: string;
  specialRequest: boolean;
}> = ({ showModel, setShowmodel, sessionId, specialRequest }) => {
  const [link, setLink] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["add-class-link"],
    mutationFn: async () => {
      const response = await fetch(
        specialRequest
          ? "/api/teacher-special-request/class-link"
          : "/api/one-on-one-section/class-link",
        {
          method: "POST",
          body: JSON.stringify({ link, sessionId }),
        }
      );
      return response;
    },
    onSuccess: async (response) => {
      const message = await response.json();
      if (response.ok) {
        queryClient.invalidateQueries({ queryKey: ["getSession"] });
        queryClient.invalidateQueries({ queryKey: ["getSpecialRequest"] });
        setLink(undefined);
        setLoading(false);
        setShowmodel(false);
        return toast.success(message.message);
      }
      if (!response.ok) {
        setLoading(false);
        return toast.error(message);
      }
    },
  });
  // here we trigger submission of our data to backend
  const handleSubmitLink = () => {
    if (!link) return toast.error("please enter zoom link");
    setLoading(true);
    mutation.mutate();
  };
  return (
    <Dialog open={showModel} onOpenChange={() => setShowmodel(false)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add zoom link</DialogTitle>
          <DialogDescription>
            Please add zoom link and start class. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="items-center gap-4">
            <Input
              id="name"
              placeholder="enter zoom link here"
              className=" w-full"
              onChange={(e) => setLink(e.target.value)}
              value={link}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmitLink} disabled={loading} type="submit">
            {loading ? "Saving" : "Save"} changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// this div render for teachers to add the class link if not existing yet
const AddClassLink: React.FC<{
  isTeacher: boolean;
  sessionId: string;
  specialRequest: boolean;
}> = ({ isTeacher, sessionId, specialRequest }) => {
  const [showModel, setShowmodel] = useState<boolean>(false);
  return (
    <div className="flex-1 py-3 px-2 flex items-center justify-center border border-green-800 rounded-md text-[14px] text-green-900 cursor-pointer hover:bg-green-800 hover:text-white transition-all ease-in-out duration-700 ">
      {isTeacher ? (
        <div onClick={() => setShowmodel(true)}>
          <p>Add Class Link</p>
        </div>
      ) : (
        <p>Wait for link</p>
      )}
      {showModel && (
        <AddMettingModel
          sessionId={sessionId}
          showModel={showModel}
          setShowmodel={setShowmodel}
          specialRequest={specialRequest}
        />
      )}
    </div>
  );
};
// join class link component below here
const JoinClassLink: React.FC<{ isTeacher: boolean; link: string }> = ({
  isTeacher,
  link,
}) => {
  const handleMoveToZoom = () => {
    return (window.location.href = link);
  };
  return (
    <div
      onClick={handleMoveToZoom}
      className=" flex-1 flex gap-1 px-2 py-3 text-[14px] items-center justify-center bg-[tomato] text-white rounded-md cursor-pointer hover:bg-[#fd7e62] transition-all ease-in-out duration-700 "
    >
      <IoIosRadio />
      <p>{isTeacher ? "Start Session" : "Join Session"}</p>
    </div>
  );
};
// the btn below will be reusuable for both special request and normal one on one session
export const SharedAddLink: React.FC<{
  specialRequest: boolean;
  isTeacher: boolean;
  sessionId: string;
  link: Imeeting;
}> = ({ link, isTeacher, sessionId, specialRequest }) => {
  return (
    <div>
      {link !== null ? (
        <JoinClassLink link={link.link} isTeacher={isTeacher} />
      ) : (
        <AddClassLink
          specialRequest={specialRequest}
          isTeacher={isTeacher}
          sessionId={sessionId}
        />
      )}
    </div>
  );
};
// start meeting btn
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
        `/teacher-dashboard/sessions/one-on-one-section/${sessionId}`
      );
    } else {
      router.push(
        `/student-dashboard/sessions/one-on-one-section/${sessionId}`
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
          specialRequest={false}
          sessionId={sessionId}
        />
      </div>
      <p>
        {isTeacher && <HandleAttendance sessionId={sessionId} name={name} />}
      </p>
    </div>
  );
};
// each session component here
const EachSession: React.FC<{ item: IAppliedSession; isTeacher: boolean }> = ({
  item,
  isTeacher,
}) => {
  return (
    <div className=" py-2 px-2 rounded-md bg-white shadow-md flex flex-col gap-4">
      <ProfileTop
        profilePhoto={
          isTeacher
            ? item.student.profilePhoto
            : item.sectionOwner.teacher.profilePhoto
        }
        name={isTeacher ? item.student.name : item.sectionOwner.teacher.name}
        email={isTeacher ? item.student.email : item.sectionOwner.teacher.email}
        status={
          isTeacher ? item.student.status : item.sectionOwner.teacher.status
        }
        grade={item.grade}
      />
      <StartMeetingDiv subjects={item.subject} type={item.sectionType} />
      <TimeShow
        start={item.classStart}
        duration={item.duration}
        hours={item.hoursperday}
      />
      <ViewDetails
        isTeacher={isTeacher}
        sessionId={item.id}
        name={item.student.name}
        link={item.SingleMeeting}
      />
    </div>
  );
};

export const SessionLoadings: React.FC<{ isTeacher: boolean }> = ({
  isTeacher,
}) => {
  const dummyArrays = new Array(6).fill("");
  return (
    <div className=" w-full flex flex-col gap-3 max-ss:mt-[90px]">
      {isTeacher && (
        <div className=" w-full flex items-center justify-end">
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={35}
            width={150}
            className=" rounded-xl"
          />
        </div>
      )}
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

const ShowSectionId = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-session-id"],
    queryFn: async () => {
      const response = await fetch("/api/teacher-sessionId");
      const result = await response.json();
      return result;
    },
  });
  if (isLoading) return;
  return (
    <div className="flex justify-end mb-2">
      {data ? <ShowUserId userId={data.sessionId} /> : <CreateSession />}
    </div>
  );
};

const SessionHeading = () => {
  return (
    <div className=" flex w-full items-center justify-center mb-3 font-semibold text-black">
      <p>List of your Sessions</p>
    </div>
  );
};
const OneOnOne: React.FC<{ isTeacher: boolean }> = ({ isTeacher }) => {
  // here we can now fetch our session
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getSession"],
    queryFn: async () => {
      const response = await fetch("/api/one-on-one-section");
      const result = await response.json();
      return result;
    },
  });
  //console.log(data)

  if (isLoading) return <SessionLoadings isTeacher={isTeacher} />;
  if (isError)
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );
  const oneOneOneData: IAppliedSession[] = data;
  return (
    <section className="my-[80px] md:my-4">
      <Container>
        {isTeacher && <ShowSectionId />}
        {!isTeacher && <SessionHeading />}
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

export default OneOnOne;
