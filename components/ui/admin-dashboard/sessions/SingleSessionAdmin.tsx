"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { IOffers, StudentTeacherInfo } from "./Sessions";
import Image from "next/image";
import { useConversion } from "@/data-access/conversion";
import { MdStarRate } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";

interface ITeacherInfo {
  teacher: StudentTeacherInfo;
  sesionId: string | null;
}

interface IAllViews {
  id: string;
  sessionId: string | null;
  teacher: {
    name: string;
    profilePhoto: string;
    gender: string;
  };
}

// component to render teacher basic info
const ShowTeacher: React.FC<{ details: ITeacherInfo }> = ({ details }) => {
  return (
    <div>
      <div className=" w-full flex items-center justify-center mt-3">
        <p className=" text-[14px]">
          Session profile that was selected during booking
        </p>
      </div>
      <div className=" w-full mt-5 flex flex-col items-center justify-center">
        <Image
          src={details.teacher.profilePhoto}
          alt="teacherDP"
          width={200}
          height={200}
          className=" w-[80px] aspect-square rounded-full"
        />
        <p className=" text-black font-bold">{details.teacher.email}</p>
        <p className=" text-black font-bold">{details.teacher.name}</p>
        <div className=" flex items-center">
          <MdStarRate className=" text-[tomato]" />
          <p>{details.teacher.rating}</p>
        </div>
        <div className=" mt-4">
          <button className=" px-4 py-2 bg-green-700 rounded text-white font-bold cursor-pointer text-[12px]">
            Merge Now
          </button>
        </div>
      </div>
    </div>
  );
};

// list of all the session profile that can be merged
const ShowAllSessionProfile = () => {
  const [filterStr, setFilterStr] = useState<string>("");
  //   function to handle filtering here
  const filteredTeacher = (allItem: IAllViews[]): IAllViews[] => {
    const filtered = allItem.filter((item) =>
      item.teacher.name.toLowerCase().includes(filterStr.toLowerCase())
    );
    return filtered;
  };
  const { data } = useQuery({
    queryKey: ["get-all-session-profile"],
    queryFn: async () => {
      const response = await fetch("/api/session-view/all-session-profiles");
      const result = await response.json();
      return result;
    },
  });
  const AllTeachers: IAllViews[] = data;
  return (
    <div className=" mt-4">
      <div className=" w-full flex items-center justify-center text-[14px]">
        <p>Merge from list of Session Profiles</p>
      </div>
      <div className=" w-[70%] px-2 py-2 flex items-center border rounded-md bg-white">
        <div className=" flex-1 text-[22px] text-gray-400">
          <IoSearchSharp />
        </div>
        <input
          className=" flex-8 outline-none bg-transparent"
          placeholder="search by sessionId"
          onChange={(e) => setFilterStr(e.target.value)}
        />
      </div>
      {/* list of the teachers below here */}
      {filteredTeacher(AllTeachers).map((teacher) => (
        <div>{teacher.teacher.name}</div>
      ))}
    </div>
  );
};

// componet for teachers to merge
const TeachersToMerge: React.FC<{ infos: ITeacherInfo }> = ({ infos }) => {
  const [sessionTeacher, setSessionTeacher] = useState<boolean>(true);
  return (
    <div>
      {/* button to toggle type of merging here */}
      <div className=" w-full flex h-[40px]">
        <div
          onClick={() => setSessionTeacher(true)}
          className={` cursor-pointer font-semibold text-[14px] flex-1 h-full items-center justify-center flex rounded-bl-md rounded-tl-md ${
            sessionTeacher
              ? "bg-green-700 text-white"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          <p>Auto Merge</p>
        </div>
        <div
          onClick={() => setSessionTeacher(false)}
          className={` font-semibold text-[14px] cursor-pointer flex-1 h-full rounded-tr-md items-center justify-center flex rounded-br-md ${
            sessionTeacher
              ? "bg-gray-200 text-gray-500"
              : "bg-green-700 text-white"
          }`}
        >
          <p>Merge From List</p>
        </div>
      </div>
      {/* display component based on the selected */}
      {sessionTeacher ? (
        <ShowTeacher details={infos} />
      ) : (
        <ShowAllSessionProfile />
      )}
    </div>
  );
};

// single row without array
const SingleRowNoArray: React.FC<{ name: string; value: string | number }> = ({
  name,
  value,
}) => {
  return (
    <div className=" flex gap-2 items-center text-[14px]">
      <p className=" font-semibold">{name}:</p>
      <p className={`${name == "AMT" && " text-green-800 font-semibold"}`}>
        {value}
      </p>
    </div>
  );
};

// single row with array
const SingleRowWithArray: React.FC<{ name: string; value: string[] }> = ({
  name,
  value,
}) => {
  const joined = value.join(",");

  return (
    <div className=" flex gap-2 items-center text-[14px]">
      <p className=" font-semibold">{name}:</p>
      <p className={`${name == "AMT" && " text-green-800 font-semibold"}`}>
        {joined.toLowerCase()}
      </p>
    </div>
  );
};

// component for students info
const StudentInfos: React.FC<{ infos: IOffers }> = ({ infos }) => {
  const { handleDate } = useConversion();
  return (
    <div className=" bg-white py-3 px-2 rounded-md">
      <div className=" w-full flex items-center flex-col border-b pb-3">
        <Image
          src={infos.student.profilePhoto}
          alt="studentpic"
          width={200}
          height={200}
          className=" w-[80px] aspect-square rounded-full"
        />
        <p className=" text-[14px] font-semibold">{infos.student.email}</p>
        <p className=" text-[14px] font-semibold">{infos.student.name}</p>
      </div>
      {/* the remaining part of the card below here */}
      <div className=" flex flex-col gap-1 pt-2">
        <div className=" w-full flex items-center justify-center">
          <div className=" px-4 py-2 text-[12px] bg-green-700 text-white rounded-md">
            <p>{infos.sectionType}</p>
          </div>
        </div>
        <SingleRowNoArray name="Curriculum" value={infos.curriculum} />
        <SingleRowNoArray name="Grade" value={infos.grade} />
        <SingleRowNoArray
          name="Hours/day"
          value={infos.hoursperday + " " + "hours"}
        />
        <SingleRowNoArray
          name="Created Date"
          value={handleDate(infos.createdAt)}
        />
        <SingleRowNoArray
          name="Start Time"
          value={handleDate(infos.startTime)}
        />
        <SingleRowNoArray name="Goals" value={infos.learningGoal} />
        <SingleRowNoArray name="AMT" value={"$" + infos.amt} />
        <SingleRowNoArray name="Duration" value={infos.duration} />
        <SingleRowWithArray name="Days" value={infos.learningDays} />
        <SingleRowWithArray name="SpecialNeed" value={infos.specialNeed} />
      </div>
    </div>
  );
};

// the main component for this single session page
const SingleSessionAdmin = () => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["session-single"],
    queryFn: async () => {
      const response = await fetch(
        `/api/session-view/single-session?sessionId=${id}`
      );
      const result = await response.json();
      return result;
    },
  });
  console.log(data);
  const singleSession: IOffers = data;
  return (
    <div>
      <div className=" w-full flex items-center justify-center">
        <p className=" mb-4 text-black font-bold text-[24px]">
          Single unmerged session
        </p>
      </div>
      <div className=" w-full md:px-20">
        <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 border-2 px-4 py-2 rounded-md shadow-md ">
          <StudentInfos infos={singleSession} />
          <TeachersToMerge infos={singleSession.sectionInfo} />
        </div>
      </div>
    </div>
  );
};

export default SingleSessionAdmin;
