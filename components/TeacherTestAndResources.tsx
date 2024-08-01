"use client";
import React, { useState } from "react";
import Container from "./Container";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import TeacherTestSubject from "./TeacherTestSubject";
import TestResources from "./TestResources";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { GoDotFill } from "react-icons/go";
import { TestUploadResource } from "./TestUploadResource";
import { useQuery } from "@tanstack/react-query";
import { IexamZod } from "./TestDetails";
import { useConversion } from "@/data-access/conversion";
import { Skeleton } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface modefiedExamType extends IexamZod {
  createdAt: string;
  id: string;
}

const LoadingView: React.FC<{ heading: string }> = ({ heading }) => {
  const mappingArray = new Array(3).fill("");
  return (
    <div className=" flex flex-col px-2 gap-3">
      <div className="font-bold text-[12px] px-5 pt-2 pb-3 text-gray-400">
        {heading}
      </div>
      <div className=" flex flex-col gap-2">
        {mappingArray.map((item, index) => (
          <Skeleton
            variant="rectangular"
            animation={"wave"}
            height={60}
            key={index}
            className=" w-full rounded-md"
          ></Skeleton>
        ))}
      </div>
    </div>
  );
};
interface IallTest {
  setId: React.Dispatch<React.SetStateAction<string | undefined>>;
  id: string | undefined;
}
// component that will return all the test
const AllTest: React.FC<IallTest> = ({ setId, id }) => {
  const { getTimeAgo, handleDate, handleTime } = useConversion();
  // here we get all the exams from teacher
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["allexam"],
    queryFn: async () => {
      const response = await fetch("/api/exam-by-teachers");
      const result = await response.json();
      return result;
    },
  });
  if (isFetching) {
    return <LoadingView heading="Test" />;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  if (data) {
    const emptyArray = Array.isArray(data) && data.length;
    if (emptyArray === 0) {
      setId(undefined);
    } else {
      const firstId = Array.isArray(data) && data[0].id;
      if (!id) {
        setId(firstId);
      }
    }
  }
  const handleChange = (theid: string) => {
    setId(theid);
  };
  return (
    <div className=" pt-3 flex flex-col gap-2">
      <p className="font-bold text-[12px] px-5 text-gray-400">Test</p>
      {Array.isArray(data) && (
        <div>
          {data.length === 0 ? (
            <div className=" w-full flex items-center justify-center flex-col gap-2">
              <Image
                priority
                src="/noitem.avif"
                alt="noitem"
                width={200}
                height={200}
                className=" w-[120px] h-[120px]"
              />
              <div className=" px-4 py-2 border border-green-700 rounded-md text-sm">
                <p>no test, create new test</p>
              </div>
            </div>
          ) : (
            <div className=" flex flex-col gap-2">
              {data.map((exam: modefiedExamType, index) => (
                <div
                  onClick={() => handleChange(exam.id)}
                  key={index}
                  className={`cursor-pointer transition-all ease-in-out duration-700 hover:bg-[#359C7133] ${
                    id == exam.id && "bg-[#359C7133]"
                  }`}
                >
                  <div className="flex items-center px-5 pt-3 pb-2 gap-3 ">
                    <Image
                      src={`/${exam?.subject.toLowerCase()}.png`}
                      width={30}
                      height={30}
                      alt="Calculator"
                    />
                    <span className="font-bold text-[14px]">
                      {exam?.subject}
                    </span>
                  </div>
                  <div className="flex gap-2 text-[12px] font-medium pb-3 pl-[20px] md:pl-[60px]">
                    <span>{handleDate(exam?.createdAt)}</span>
                    <span>{handleTime(exam?.createdAt)}</span>
                    <span>{getTimeAgo(exam?.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// component that will return all the resources
interface IResouces {
  subject: string;
  title: string;
  sourceLink: string;
  type: string;
  createdAt: string;
}
const AllResources = () => {
  const { handleDate, handleTime, getTimeAgo } = useConversion();
  const { data, isFetching, error, isError } = useQuery({
    queryKey: ["resources"],
    queryFn: async () => {
      const response = await fetch("/api/manage-resources");
      const result = await response.json();
      return result;
    },
  });
  if (isFetching) {
    return <LoadingView heading="Resources" />;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      <p className="font-bold text-[12px] px-5 py-3 text-gray-400">Resources</p>
      {Array.isArray(data) && (
        <div>
          {data.length === 0 ? (
            <div className=" w-full flex items-center justify-center flex-col gap-2 mb-2">
              <Image
                priority
                src="/noitem.avif"
                alt="noitem"
                width={200}
                height={200}
                className=" w-[120px] h-[120px]"
              />
              <div className=" px-4 py-2 border border-green-700 rounded-md text-sm">
                <p>no resources, create a resources</p>
              </div>
            </div>
          ) : (
            <div className=" flex flex-col gap-2">
              {data.map((resource: IResouces, index) => (
                <div key={index}>
                  <div className="flex items-center px-5 pt-3 pb-1 gap-3 ">
                    <Image
                      src="/svgs/link.svg"
                      width={30}
                      height={30}
                      alt="Calculator"
                    />
                    <div className=" flex flex-col">
                      <span className=" text-[14px]">{resource?.title}</span>
                      <Link
                        href={`${resource?.sourceLink}`}
                        className="font-bold text-[12px] italic cursor-pointer text-[#099ECF]"
                      >
                        {resource?.sourceLink}
                      </Link>
                    </div>
                  </div>
                  <div className="flex gap-2 text-[12px] font-medium pb-3 pl-[20px] md:pl-[60px]">
                    <span>{handleDate(resource?.createdAt)}</span>
                    <span>{handleTime(resource?.createdAt)}</span>
                    <span>{getTimeAgo(resource?.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const TeacherTestAndResources = () => {
  const [showexam, setShowexam] = useState(true);
  const [id, setId] = useState<undefined | string>(undefined);
  const [dialog, setDialog] = useState<boolean>(false);
  return (
    <section>
      <Container>
        <div className="flex justify-end mb-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="bg-secondary text-white text-[14px] p-5 font-bold my-3 mr-0 md:mr-6">
                <Image
                  src="/svgs/test-item.svg"
                  width={20}
                  height={20}
                  className="mr-2"
                  alt="New Item"
                />
                New Item
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40">
              <div className="grid gap-4 font-subtext">
                <div className="grid gap-2">
                  <div className="flex justify-start">
                    <Link
                      href={`/teacher-dashboard/test-and-resources/details`}
                    >
                      <p className="inline text-[12px] font-semibold">
                        <GoDotFill className="inline ml-0 text-lightGreen" />
                        Create New Test
                      </p>
                    </Link>
                  </div>
                  <hr className="bg-black" />
                  <div onClick={() => setDialog(true)}>
                    <TestUploadResource dialog={dialog} setDialog={setDialog} />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className=" flex flex-col md:flex-row gap-4">
          <div className="flex-2 ">
            <div className=" bg-[#FFFFFF] rounded-[8px] w-full pb-2">
              <AllTest id={id} setId={setId} />
              <AllResources />
            </div>
          </div>
          <div className="flex-3 bg-[#FFFFFF] h-[70vh] rounded-[8px] p-5">
            {showexam ? <TeacherTestSubject id={id} /> : <TestResources />}
          </div>
        </div>
      </Container>
      <ToastContainer />
    </section>
  );
};

export default TeacherTestAndResources;
