"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import Link from "next/link";
import React, { useState } from "react";
import { useConversion } from "@/data-access/conversion";
import { LoadingTable } from "./TeachersTable";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MdMoreHoriz } from "react-icons/md";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { IoWarning } from "react-icons/io5";
import TableStatus from "./ui/TableStatus";
import Container from "./Container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IVacancyTeacher {
  createdAt: string;
  id: string;
  teacher: {
    name: string;
    phoneNo: string;
    profilePhoto: string;
    rating: string;
    email: string;
    id: string;
  };
}

// dialog to accept a teacher into the school platform
const AcceptDialog: React.FC<{
  setShowAccept: React.Dispatch<React.SetStateAction<boolean>>;
  showAccept: boolean;
  vacancyId: string;
}> = ({ setShowAccept, showAccept, vacancyId }) => {
  const queryClient = useQueryClient();
  // here we accept a teacher or admit the teacher
  const mutation = useMutation({
    mutationKey: ["accept-teacher-by-vacancy"],
    mutationFn: async (id: string) => {
      const response = await fetch("/api/advert-application", {
        method: "PUT",
        body: JSON.stringify({
          vacancyTeacherId: id,
          status: "ACCEPTED",
        }),
      });
      return response;
    },
    onSuccess: async (response) => {
      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message);
      }
      setShowAccept(false);
      return toast.success(result.message);
    },
  });
  // this is to close the dialog
  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setShowAccept(false);
  };
  return (
    <Dialog open={showAccept} onOpenChange={() => setShowAccept(false)}>
      <DialogTrigger asChild>
        <p className=" text-[14px] text-green-700 font-bold cursor-pointer">
          Accept
        </p>
      </DialogTrigger>
      <DialogContent className=" w-full px-2 sm:w-2/3 md:w-1/3">
        <div className=" w-full flex items-center flex-col gap-5">
          <IoWarning className=" text-[70px] text-yellow-500" />
          <div className=" flex flex-col items-center justify-center">
            <p className=" font-bold">
              Are you sure you want to accept this Teacher
            </p>
            <p className=" text-[14px]">
              This action can not be reversed, be sure before you proceed
            </p>
          </div>
          <div
            onClick={() => mutation.mutate(vacancyId)}
            className=" cursor-pointer hover:bg-green-800 transition-all transform ease-in-out duration-700 w-full flex items-center justify-center py-4 text-white bg-green-700 rounded-md"
          >
            <p>Proceed</p>
          </div>
          <div onClick={handleClose} className=" cursor-pointer">
            <p className=" text-black font-bold">Cancel</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
// dialog to reject a teacher into the school platform
const RejectDialog: React.FC<{
  setShowReject: React.Dispatch<React.SetStateAction<boolean>>;
  showReject: boolean;
  vacancyId: string;
}> = ({ showReject, setShowReject }) => {
  const mutation = useMutation({
    mutationKey: ["accept-teacher-by-vacancy"],
    mutationFn: async (id: string) => {
      const response = await fetch("/api/advert-application", {
        method: "PUT",
        body: JSON.stringify({
          vacancyTeacherId: id,
          status: "REJECTED",
        }),
      });
      return response;
    },
    onSuccess: async (response) => {
      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message);
      }
      setShowReject(false);
      return toast.success(result.message);
    },
  });
  // this is to close the dialog
  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setShowReject(false);
  };
  return (
    <Dialog open={showReject} onOpenChange={() => setShowReject(false)}>
      <DialogTrigger asChild>
        <p className=" text-[14px] text-red-700 font-bold cursor-pointer">
          Reject
        </p>
      </DialogTrigger>
      <DialogContent className="w-full px-2 sm:w-2/3 md:w-1/3">
        <div className=" w-full flex items-center flex-col gap-5">
          <IoWarning className=" text-[70px] text-yellow-500" />
          <div className=" flex flex-col items-center justify-center">
            <p className=" font-bold">
              Are you sure you want to reject this Teacher
            </p>
            <p className=" text-[14px]">
              This action can not be reversed, be sure before you proceed
            </p>
          </div>
          <div className=" cursor-pointer hover:bg-green-800 transition-all transform ease-in-out duration-700 w-full flex items-center justify-center py-4 text-white bg-green-700 rounded-md">
            <p>Proceed</p>
          </div>
          <div onClick={handleClose} className=" cursor-pointer">
            <p className=" text-black font-bold">Cancel</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
// component for each row for a particular information
const OneTeacher: React.FC<{ applicant: IVacancyTeacher; vacancy: string }> = ({
  applicant,
  vacancy,
}) => {
  const { handleDate } = useConversion();
  const [showAccept, setShowAccept] = useState<boolean>(false);
  const [showReject, setShowReject] = useState<boolean>(false);
  return (
    <TableRow className=" w-full flex">
      <TableCell className="font-bold text-[12px]  flex flex-1">
        <Image
          src={applicant?.teacher.profilePhoto}
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
      <TableCell className=" flex-1 text-[12px] flex justify-center">
        <div className="flex flex-col">
          <p className="inline mb-2">
            <FaEnvelope className="inline mr-1 " />
            {applicant?.teacher.email}
          </p>
          <p className="inline">
            <FaPhoneAlt className="inline mr-1" />
            {applicant?.teacher.phoneNo}
          </p>
        </div>
      </TableCell>

      <TableCell className=" flex-1 flex justify-center">
        {handleDate(applicant?.createdAt)}
      </TableCell>
      <TableCell className="text-[11px]  flex-1 flex justify-center text-center ">
        <div>
          <Popover>
            <PopoverTrigger className="">
              <MdMoreHoriz className=" text-[25px] text-black" />
            </PopoverTrigger>
            <PopoverContent className=" flex flex-col gap-1 w-fit px-4">
              <Link
                href={`/admin-dashboard/job-listing/applicant/${vacancy}/${applicant?.teacher.id}`}
                className=" text-[14px] font-bold transform transition-all duration-700 text-black hover:text-green-800"
              >
                View details
              </Link>
              <hr />
              <div onClick={() => setShowAccept(true)}>
                <AcceptDialog
                  showAccept={showAccept}
                  setShowAccept={setShowAccept}
                  vacancyId={applicant?.id}
                />
              </div>
              <hr />
              <div onClick={() => setShowReject(true)}>
                <RejectDialog
                  showReject={showReject}
                  setShowReject={setShowReject}
                  vacancyId={applicant?.id}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </TableCell>
    </TableRow>
  );
};
// no item here
export const Noitem: React.FC<{ desc: string }> = ({ desc }) => {
  return (
    <div className=" mt-32 md:mt-20 w-full flex flex-col items-center justify-center gap-2">
      <Image
        src="/noitem.avif"
        alt="no-item"
        width={200}
        height={200}
        className=" w-[300px]"
      />
      <div className=" px-4 py-2 border border-green-700 rounded-md">
        <p className=" font-bold">{desc}</p>
      </div>
    </div>
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
      <div className=" mt-10">
        <LoadingTable />
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
    <Container className=" px-0  w-full">
      {Array.isArray(data?.VacancyTeacher) && (
        <div className=" w-full">
          {data?.VacancyTeacher.length === 0 ? (
            <div>
              <Noitem desc="No applicants yet" />
            </div>
          ) : (
            <div className="!w-full overflow-x-auto flex flex-col gap-1">
              <Table className="bg-white w-full md:w-full rounded-md">
                <TableHeader className="">
                  <TableRow className=" flex  ">
                    <TableHead className=" flex-1 flex items-center justify-center ">
                      Name
                    </TableHead>
                    <TableHead className=" flex-1 flex text-center justify-center items-center ">
                      Contact
                    </TableHead>
                    <TableHead className=" flex-1 flex text-center justify-center items-center ">
                      Date
                    </TableHead>
                    <TableHead className=" flex-1 flex text-center justify-center items-center">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.isArray(data.VacancyTeacher) &&
                    data?.VacancyTeacher.map(
                      (applicant: IVacancyTeacher, index: any) => (
                        <OneTeacher
                          key={index}
                          applicant={applicant}
                          vacancy={data?.id}
                        />
                      )
                    )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      )}
      <ToastContainer />
    </Container>
  );
}
