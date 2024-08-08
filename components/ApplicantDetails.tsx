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
      className="flex items-center sm:gap-4 bg-secondary px-[20px] text-white text-[12px] py-7 my-3"
    >
      <Image
        src="/svgs/pdfIcon.svg"
        width={20}
        height={20}
        className="mr-2"
        alt="Download"
      />
      <div className="text-left">
        <p>Applicants Credentials</p>
        <p className="text-[10px]">{dataSize ? dataSize : "loading"}KB</p>
      </div>

      <FaDownload />
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
    <div className="flex-1 bg-[#FFFFFF] rounded-[5px] py-5 px-8">
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
    <div className="flex-1 bg-[#FFFFFF] rounded-[5px] h-[60vh] md:h-[45vh] py-5 px-8">
      <div className="block md:flex mt-5 gap-5">
        <Image
          src={data?.profilePhoto}
          alt="Applicant Image"
          width={130}
          height={10}
          className="h-[20vh] rounded-md"
        />
        <div>
          <p className="flex gap-2 font-bold text-[17px] mb-2">
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
          <div className="flex flex-col my-5">
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
      <Container>
        <div className="flex justify-between items-center mb-5">
          <span className="font-bold">Details</span>
          <Link href="/school-dashboard/job-listing" className="cursor-pointer">
            <Image src="/closeAlt.svg" alt="cancel" width={15} height={15} />
          </Link>
        </div>
        <div className="flex md:flex gap-4">
          <div className=" flex-1">
            <VacancyDesc />
          </div>
          <div className=" flex-1">
            <TeacherInfo />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ApplicantDetails;
