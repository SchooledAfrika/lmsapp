"use client";
import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";
import {
  SingleRowNoArray,
  SingleRowWithArray,
} from "./ui/admin-dashboard/sessions/SingleSessionAdmin";
import { useConversion } from "@/data-access/conversion";
import { IoMdAdd } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";

// interface for the session
interface ISingleSession {
  id: string;
  subject: string[];
  grade: string;
  sectionType: string;
  classStart: string;
  specialNeed: string[];
  learningGoal: string;
  learningDays: string[];
  hoursperday: number;
  duration: string;
  startTime: string;
  resources: string[];
  amt: number;
  createdAt: string;
  updatedAt: string;
  sectionOwner: {
    teacher: {
      name: string;
      details: string;
      email: string;
      profilePhoto: string;
      phoneNo: string;
    };
  };
  student: {
    name: string;
    email: string;
    profilePhoto: string;
    phoneNo: string | null;
    details: string;
  };
  StudentExam: [];
}

// the top left session
export const TopLeftSession: React.FC<{
  dp: string;
  name: string;
  grade: string;
  contact: string;
  isTeacher: boolean;
}> = ({ dp, name, grade, contact, isTeacher }) => {
  return (
    <div className=" flex flex-col gap-3">
      <div className=" px-4 py-3 rounded-md bg-white flex gap-4">
        <Image
          src={dp}
          alt="dp"
          width={200}
          height={200}
          priority
          className=" w-[100px] aspect-square rounded-md"
        />
        <div className=" flex flex-col gap-2">
          <p className=" text-black font-semibold text-[12px]">{name}</p>
          <p className="  text-slate-700 font-semibold text-[12px] ">{grade}</p>
          <div className=" w-fit px-4 py-2 bg-green-800 text-[12px] text-white rounded-md flex items-center gap-2  ">
            <FaPhoneAlt />
            <p>{contact}</p>
          </div>
        </div>
      </div>
      <div className=" w-full flex flex-col gap-2 bg-white rounded-md px-4 py-3">
        <p className=" text-[14px] font-bold">Teachers Desc</p>
        <p className=" text-[12px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo dolorum
          quaerat aliquid tempora esse doloremque et adipisci ipsa voluptate
          quibusdam ipsam suscipit libero sint repellendus tenetur eveniet, at
          numquam reprehenderit! Tenetur, amet? Optio aut porro, quaerat
          similique nam iure, inventore qui natus dolor repellat, eos quasi
          aperiam id sit eum?
        </p>
      </div>
    </div>
  );
};
// the top middle session
export const TopMiddleSession = () => {
  const { handleDate } = useConversion();
  return (
    <div className=" h-fit bg-white px-4 py-2 rounded-md flex flex-col gap-3">
      <div className=" w-full flex items-center justify-center">
        <div className=" w-fit px-3 py-1 rounded-md bg-green-800 text-white text-[12px] font-bold">
          <p>Homework support</p>
        </div>
      </div>
      <div className=" flex flex-col gap-1">
        <SingleRowNoArray name="hours/day" value="2hrs" />
        <SingleRowNoArray name="Grade" value="Grade2" />
        <SingleRowNoArray name="Duration" value="montly" />
        <SingleRowNoArray name="AMT" value={"$" + 20} />
        <SingleRowNoArray
          name="Starts"
          value={handleDate(new Date().toISOString())}
        />
        <SingleRowNoArray
          name="Merged day"
          value={handleDate(new Date().toISOString())}
        />
        <SingleRowNoArray name="Curriculum" value={"Nigeria"} />
      </div>
    </div>
  );
};

const SubjectsDiv: React.FC<{ subject: string }> = ({ subject }) => {
  return (
    <div className=" flex items-center gap-2">
      <Image
        src={`/${subject.toLowerCase()}.png`}
        alt="subject"
        width={200}
        height={200}
        className=" w-[25px] aspect-square"
      />
      <p className=" text-[14px] font-bold">{subject}</p>
    </div>
  );
};
// the top right session
export const TopRightSession = () => {
  const subjectsArray: string[] = ["English", "Physics", "Biology"];
  return (
    <div className=" rounded-md bg-white px-4 py-2 h-fit flex flex-col gap-2">
      <div className=" w-full flex items-center justify-center">
        <div className=" w-fit px-3 py-1 rounded-md bg-[tomato] text-white text-[12px] font-bold">
          <p>More Details</p>
        </div>
      </div>
      {/* subject div */}
      <div>
        <p className="  font-bold underline text-green-700">Subjects:</p>
        <div className=" flex flex-col gap-1">
          {subjectsArray.map((item, index) => (
            <SubjectsDiv key={index} subject={item} />
          ))}
        </div>
      </div>
      {/* specialNeed div */}
      <div className=" flex flex-col gap-1 bg-green-300 px-1 overflow-x-hidden py-2 rounded-md">
        <SingleRowWithArray
          name="SpecialNeeds"
          value={["headache", "blindness", "smartness"]}
        />
        <SingleRowNoArray
          name="Goals"
          value="I want to make sure i learn all the necessary things required from me"
        />
        <SingleRowWithArray
          name="Class-days"
          value={["Monday", "Tuesday", "Wednesday"]}
        />
      </div>
    </div>
  );
};

// the top section div div
export const TopSection = () => {
  return (
    <div className=" grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      <TopLeftSession
        dp="/bukola.jpeg"
        name="Augustine David"
        grade="Grade 10"
        contact="08145508195"
        isTeacher={true}
      />
      <TopMiddleSession />
      <TopRightSession />
    </div>
  );
};

const RenderedExam = () => {
  return (
    <div className=" w-full flex items-center text-[14px] font-semibold text-slate-500">
      <div className=" flex-1 flex items-center text-black text-[14px] gap-1 ">
        <Image
          src="/chemistry.png"
          alt="subject"
          width={200}
          height={200}
          className=" w-[25px] aspect-square"
        />
        <p>Chemistry</p>
      </div>
      <div className=" flex-1 flex items-center">
        <div className=" flex-1 flex text-[11px] items-center justify-center">
          <p>24/100</p>
        </div>
        <div className=" flex-1 flex text-[11px] items-center justify-center">
          <p>Good</p>
        </div>
      </div>
    </div>
  );
};
const Exams = () => {
  return (
    <div className=" flex-6 bg-white px-3 py-6 flex flex-col gap-3">
      <div className=" w-full flex items-center justify-between">
        <p className=" font-semibold">Assessment </p>
        <div className=" flex items-center gap-1 cursor-pointer">
          <p className=" text-[14px] font-bold text-green-800">Add</p>
          <div className=" w-[25px] aspect-square bg-green-700 items-center justify-center flex rounded-full text-white">
            <IoMdAdd className=" text-[18px] font-bold" />
          </div>
        </div>
      </div>
      <div className=" w-full flex items-center text-[14px] font-semibold text-slate-500">
        <div className=" flex-1 ">
          <p>Subject</p>
        </div>
        <div className=" flex-1 flex items-center">
          <div className=" flex-1 flex items-center justify-center">
            <p>Grade</p>
          </div>
          <div className=" flex-1 flex items-center justify-center">
            <p>Remarks</p>
          </div>
        </div>
      </div>
      {/* render all the exams below here */}
      <div className=" flex flex-col gap-2">
        <RenderedExam />
      </div>
    </div>
  );
};
const Resources = () => {
  return <div className=" flex-4"></div>;
};
const DownSection = () => {
  return (
    <div className=" flex mt-4 flex-col md:flex-row">
      <Exams />
      <Resources />
    </div>
  );
};

const SingleSessionShow = () => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["single-section-show"],
    queryFn: async () => {
      const response = await fetch(`/api/one-on-one-section/session/${id}`);
      const result = await response.json();
      return result;
    },
  });
  console.log(data);
  return (
    <div className=" w-full flex flex-col gap-3">
      <TopSection />
      <DownSection />
    </div>
  );
};

export default SingleSessionShow;
