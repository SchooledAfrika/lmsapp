"use client";
import React, { useState, useEffect } from "react";
import Container from "./Container";
import { z } from "zod";
import Image from "next/image";
import ParentTestSubject from "./ParentTestSubject";
import { useQuery } from "@tanstack/react-query";
import { parentExamSchema } from "@/constants/parentExam";
import { useConversion } from "@/data-access/conversion";
import { Skeleton } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useWardId } from "@/data-access/conversion";

export type IparentExam = z.infer<typeof parentExamSchema>;

export interface modefiedExamType extends IparentExam {
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
  setShowExam: React.Dispatch<React.SetStateAction<boolean>>;
  showExam: boolean;
}
// component that will return all the test
const AllTest: React.FC<IallTest> = ({ setId, id, setShowExam, showExam }) => {
  //The wardId is already stored in the localStorage and so we initialize a state for it
  const wardId = useWardId();

  const { getTimeAgo, handleDate, handleTime } = useConversion();
  // here we get all the exams from teacher
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allAssessment", wardId],
    queryFn: async () => {
      const response = await fetch(
        `/api/wards-all-assessment?childId=${wardId}`
      );
      const result = await response.json();
      return result;
    },
  });
  if (isLoading) {
    return <LoadingView heading="Assessment" />;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  if (data && id == undefined) {
    const emptyArray = Array.isArray(data) && data.length > 0;
    if (!emptyArray) {
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
    setShowExam(true);
  };
  return (
    <div className=" pt-3 flex flex-col gap-2">
      <p className="font-bold text-[12px] px-5 text-gray-400">Assessment</p>
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
                <p>no assessment here.</p>
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
                      src={`/${
                        exam?.subject ? exam.subject.toLowerCase() : "maths"
                      }.png`}
                      width={30}
                      height={30}
                      alt="Calculator"
                    />
                    <span className="font-bold text-[14px]">{exam?.title}</span>
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

const ParentAssessment = () => {
  const [showexam, setShowexam] = useState(true);
  const [id, setId] = useState<undefined | string>(undefined);
  console.log(id);
  return (
    <section>
      <Container>
        <div className="my-6 flex flex-col md:flex-row gap-4">
          <div className="flex-2 ">
            <div className=" bg-[#FFFFFF] rounded-[8px] w-full pb-2">
              <AllTest
                setShowExam={setShowexam}
                id={id}
                setId={setId}
                showExam={showexam}
              />
            </div>
          </div>
          <div className="flex-3 bg-[#FFFFFF] h-[70vh] rounded-[8px] p-5">
            {showexam && <ParentTestSubject id={id} />}
          </div>
        </div>
      </Container>
      <ToastContainer />
    </section>
  );
};

export default ParentAssessment;
