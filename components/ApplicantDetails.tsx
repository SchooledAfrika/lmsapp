"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Container from "./Container";
import Image from "next/image";
import { FaDownload, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { Button } from "./ui/button";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@mui/material";
import { useConversion, useGetDocument } from "@/data-access/conversion";
import Backwards from "./ui/Backwards";

const DownLoad: React.FC<{ resume: any; name: string }> = ({
  resume,
  name,
}) => {
  const { downloadDoc } = useConversion();
  const { dataSize } = useGetDocument(resume);
  const handleDownload = async () => {
    await downloadDoc(resume, name);
  };
  return (
    <Button
      onClick={handleDownload}
      className="flex items-center justify-between bg-secondary  max-lg:px-[10px] lg:px-[20px] text-white text-[12px] sm:py-3 lg:py-7"
    >
      <Image
        src="/svgs/pdfIcon.svg"
        width={20}
        height={20}
        className=" w-[10px]"
        alt="Download"
      />
      <div className="text-left max-lg:text-[10px]">
        <p>Applicants Credentials</p>
        <p className="text-[10px]">{dataSize ? dataSize : "loading"}KB</p>
      </div>

      <FaDownload className=" text-[10px]" />
    </Button>
  );
};

const VacancyDesc = () => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const params = useParams();
  const vacancyId = params.slug[0];
  // make query to get information about only one vacancy
  const { data, isFetching, error, isError } = useQuery({
    queryKey: ["get-one-vacancy"],
    queryFn: async () => {
      const response = await fetch(`/api/one-vacancy/${vacancyId}`);
      const result = await response.json();
      return result;
    },
  });
  // loading skeleton
  if (isFetching) {
    return (
      <Skeleton
        className=" w-full rounded-md"
        variant="rectangular"
        animation="wave"
        height={400}
      />
    );
  }
  //  show errors here
  if (isError) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );
  }
  return (
    <div className="flex-1 bg-[#FFFFFF] rounded-[5px] py-3 px-4  lg:py-5 lg:px-8">
      <p className="font-bold text-[18px] pb-2">{data?.jobTitle}</p>
      <div className="flex gap-6">
        <div className="flex gap-2 font-bold text-[12px]">
          <Image src="/svgs/grade.svg" width={15} height={15} alt="Grade" />
          <span>{data?.level}</span>
        </div>
        <div className="flex gap-2 font-bold text-[12px]">
          <Image
            src="/svgs/location-black.svg"
            width={9}
            height={9}
            alt="Location"
          />
          <span>{data?.state}</span>
        </div>
      </div>
      <hr className="my-[20px]" />
      <div>
        <p className="font-bold text-[16px] pb-2">Details</p>
        <span className="text-[14px] font-medium">{data?.description}</span>
        <p className="font-bold text-[16px] pb-2 pt-4">Responsibilities</p>
        <ul className="text-[14px] font-medium list-disc pl-6">
          {Array.isArray(data.responsibility) &&
            data.responsibility.map((item: string, value: any) => (
              <li key={value}>{item}</li>
            ))}
        </ul>
        {showMore && (
          <div>
            <p className="font-bold text-[16px] pb-2 pt-4">Responsibilities</p>
            <ul className="text-[14px] font-medium list-disc pl-6">
              {Array.isArray(data.qualifications) &&
                data.qualifications.map((item: string, value: any) => (
                  <li key={value}>{item}</li>
                ))}
            </ul>
          </div>
        )}
        <div
          onClick={() => setShowMore((value) => !value)}
          className="text-[#359C71] text-center pt-6 pb-2 text-[14px] cursor-pointer"
        >
          {showMore ? "Read less" : "Read More Details"}
        </div>
      </div>
    </div>
  );
};

const TeacherInfo = () => {
  const params = useParams();
  const teacherId = params.slug[1];
  const [dataSize, setDataSize] = useState<any>(null);

  // make query to get information about only one vacancy
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["get-one-teacher"],
    queryFn: async () => {
      const response = await fetch(`/api/add-teacher-by-school/${teacherId}`);
      const result = await response.json();
      return result;
    },
  });
  // loading the component
  if (isFetching) {
    return (
      <Skeleton
        className=" w-full rounded-md"
        variant="rectangular"
        animation="wave"
        height={200}
      />
    );
  }
  // this shows error in the component
  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="flex-1 bg-[#FFFFFF] rounded-[5px] py-3 px-4  lg:py-5 lg:px-8">
      <div className="flex  gap-5">
        <div>
          <Image
            src={data?.profilePhoto}
            alt="Applicant Image"
            width={130}
            height={10}
            className=" max-md:w-[80px] md:aspect-square max-md:aspect-square rounded-md"
          />
        </div>
        <div className=" flex flex-col gap-3">
          <p className="flex gap-2 font-bold text-[17px] ">
            {data?.name}
            <Image
              src="/svgs/checkMark.svg"
              width={20}
              height={20}
              alt="Check Mark"
            />
          </p>
          <span className="text-[12px] font-bold">
            ⭐ {data?.rating ? data?.rating : "unratted"}
          </span>
          <div className="flex flex-col ">
            <p className="inline mb-1 text-[12px] font-medium">
              <FaEnvelope className="inline mr-1" />
              {data?.email}
            </p>
            <p className="inline text-[12px] font-medium">
              <FaPhoneAlt className="inline mr-1" />
              {data?.phoneNo}
            </p>
          </div>
          <DownLoad resume={data?.resume} name={data?.name} />
        </div>
      </div>
    </div>
  );
};

const ApplicantDetails = () => {
  return (
    <section className="my-[80px] md:my-4">
      <Container className=" max-md:px-0">
        <div className="flex justify-end items-center">
          <Backwards />
        </div>
        <div className=" flex flex-col  gap-1 mt-5">
          <span className="font-bold">Details</span>
          <div className="flex flex-col-reverse sm:flex-row gap-4 ">
            <div className=" flex-1">
              <VacancyDesc />
            </div>
            <div className=" flex-1">
              <TeacherInfo />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ApplicantDetails;
