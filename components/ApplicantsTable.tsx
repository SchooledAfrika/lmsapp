"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import Link from "next/link";
import { Button } from "./ui/button";
import React from "react";
import { useConversion } from "@/data-access/conversion";

interface IVacancyTeacher {
  createdAt: string;
  teacher: {
    name: string;
    phoneNo: string;
    profilePhoto: string;
    rating: string;
    email: string;
  };
}

interface IOneVacancy {
  id: string;
  VacancyTeacher: IVacancyTeacher[];
}
// component for each row for a particular information
const OneTeacher: React.FC<{ applicant: IVacancyTeacher }> = ({
  applicant,
}) => {
  const { handleDate } = useConversion();
  return (
    <TableRow>
      <TableCell className="font-semibold text-[14px] w-[200px] flex mr-1">
        <Image
          src={applicant.teacher.profilePhoto}
          alt="icon"
          width={100}
          height={100}
          className="w-[60px] h-[60px] rounded-md mr-1"
        />{" "}
        <div className="flex ml-1 flex-col">
          <div>{applicant.teacher.name}</div>
          {applicant.teacher.rating ? applicant.teacher.rating : "unratted"}
        </div>
      </TableCell>
      <TableCell className="w-[250px]">
        <div className="flex flex-col">
          <p className="inline mb-2">
            <FaEnvelope className="inline mr-1 " />
            {applicant.teacher.email}
          </p>
          <p className="inline">
            <FaPhoneAlt className="inline mr-1" />
            {applicant.teacher.phoneNo}
          </p>
        </div>
      </TableCell>

      <TableCell className="w-[400px]">
        {handleDate(applicant.createdAt)}
      </TableCell>
      <TableCell className="text-[11px] w-[10px] text-center">
        <Link href={"/school-dashboard/job-listing/applicant/details"}>
          <Button className="bg-secondary w-[60px] md:w-[100px] text-white text-[12px] py-3 my-3">
            View
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  );
};
// the parents component here
export default function ApplicantsTable() {
  const { id } = useParams();
  // fetching some information about the vacancy here
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-one-vacancy"],
    queryFn: async () => {
      const response = await fetch(`/api/advertise/${id}`);
      const result = await response.json();
      return result;
    },
  });
  // loading state
  if (isLoading) {
    return (
      <div>
        <p>loading...</p>
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

  return (
    <Table className="bg-white overflow-x-auto rounded-md mt-6">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="sm:w-[100px] w-full">Contact</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.isArray(data.VacancyTeacher) &&
          data?.VacancyTeacher.map((applicant: IVacancyTeacher, index: any) => (
            <OneTeacher key={index} applicant={applicant} />
          ))}
      </TableBody>
    </Table>
  );
}
