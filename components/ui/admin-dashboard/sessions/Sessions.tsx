"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useConversion } from "@/data-access/conversion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { IoWarning } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Skeleton } from "@mui/material";
import { Noitem } from "@/components/ApplicantsTable";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface StudentTeacherInfo {
  name: string;
  profilePhoto: string;
  email: string;
}
interface IOffers {
  id: string;
  studentId: string;
  oneOnOneSectionId: string;
  merged: boolean;
  grade: string;
  curriculum: string;
  hoursperday: number;
  sectionType: string;
  duration: string;
  subject: string[];
  specialNeed: string[];
  learningDays: string[];
  learningGoal: string;
  startTime: string;
  createdAt: string;
  amt: number;
  student: StudentTeacherInfo;
  sectionInfo: {
    sesionId: string | null;
    teacher: StudentTeacherInfo;
  };
}

// this dailog handles confirmation
export const Approval: React.FC<{
  id: string;
  action: string;
  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setAction: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  item: IOffers;
}> = ({ id, action, showDialog, setShowDialog, setAction, name, item }) => {
  const queryclient = useQueryClient();
  // making use of react query to mutate the database
  const mutation = useMutation({
    mutationKey: ["match-session"],
    mutationFn: async (item: {
      id: string;
      oneOnOneSectionId: string;
      merged: boolean;
    }) => {
      const response = await fetch("/api/session-view", {
        method: "PUT",
        body: JSON.stringify({
          adminSessionId: item.id,
          teacherSessionId: item.oneOnOneSectionId,
          merged: item.merged,
        }),
      });
      return response;
    },

    onSuccess: async (response) => {
      if (response.ok) {
        toast.success("you have successfully merged teacher to session");
        setTimeout(() => {
          setShowDialog(false);
          queryclient.invalidateQueries({
            queryKey: ["get-sessions"],
          });
        }, 4000);
      } else {
        toast.error("you have successfully declined the session offer");
        setTimeout(() => {
          setShowDialog(false);
          queryclient.invalidateQueries({
            queryKey: ["get-sessions"],
          });
        }, 4000);
      }
    },
  });
  // // here, we handle approval now

  const handleApprove = () => {
    if (action === "merge") {
      mutation.mutate({
        id,
        oneOnOneSectionId: item.oneOnOneSectionId,
        merged: true,
      });
    } else {
      mutation.mutate({
        id,
        oneOnOneSectionId: item.oneOnOneSectionId,
        merged: false,
      });
    }
  };
  return (
    <Dialog open={showDialog} onOpenChange={() => setShowDialog(false)}>
      <DialogTrigger>
        <button
          className={`px-3 py-2 ${
            name == "merge" ? "bg-green-800" : "bg-red-700"
          } rounded-md text-white text-[12px]`}
        >
          {name}
        </button>
      </DialogTrigger>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        className=" w-full md:w-1/3 py-4"
      >
        <div className=" w-full flex flex-col gap-3 items-center">
          <IoWarning className=" text-[60px] text-orange-500" />
          <div className=" flex items-center flex-col gap-1">
            <p className=" text-black font-bold text-[21px]">
              This action is not reversible
            </p>
            <p className=" text-slate-500 font-semibold">
              Are you sure you really want to {action} this session?
            </p>
          </div>
          <div className=" flex flex-col gap-2 w-full">
            <button
              onClick={handleApprove}
              className=" py-3 text-white flex items-center justify-center bg-green-700 rounded-md w-full"
            >
              merge
            </button>
            <button
              onClick={() => setShowDialog(false)}
              className=" py-3 text-white flex items-center justify-center bg-red-700 rounded-md w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// component to return first subject and more if more than 1
const TotalAndMore: React.FC<{ item: string[] }> = ({ item }) => {
  // return only one item without more if one item in the array
  if (item.length === 1) {
    return (
      <div>
        <p className=" text-[14px]">{item[0].toLowerCase()}</p>
      </div>
    );
  }
  // return item and more
  return (
    <div className=" flex items-center text-[14px] gap-2">
      <p>{item[0].toLowerCase()}</p>
      <div className=" flex items-center text-green-700 font-semibold ">
        <FiPlus />
        <p>{item.length - 1}</p>
      </div>
    </div>
  );
};

const OfferCard: React.FC<{ item: IOffers }> = ({ item }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/admin-dashboard/sessions/${item.id}`);
  };
  return (
    <div className=" bg-white p-3 flex flex-col gap-5 shadow-md">
      <div className=" flex items-center gap-2">
        <div>
          <Image
            alt=""
            src={item.student.profilePhoto}
            width={200}
            height={200}
            className=" w-[40px] aspect-square rounded-full"
          />
        </div>
        <div>
          <p className=" text-[12px]">{item.student.email}</p>
          <p className=" text-[14px] font-semibold">{item.student.name}</p>
        </div>
      </div>
      <div className=" border border-gray-500 rounded-md flex flex-col w-full p-1">
        <div className=" flex items-center gap-1 ">
          <p className=" font-semibold">type:</p>
          <p className=" text-[14px]">{item.sectionType}</p>
        </div>
        <div className=" flex items-center gap-1 ">
          <p className=" font-semibold">Curruculum:</p>
          <p className=" text-[14px]">{item.curriculum}</p>
        </div>
        <div className=" flex items-center gap-1 ">
          <p className=" font-semibold">Subjects:</p>
          <TotalAndMore item={item.subject} />
        </div>
        <div className=" flex items-center gap-1 ">
          <p className=" font-semibold">Days:</p>
          <TotalAndMore item={item.learningDays} />
        </div>
      </div>
      <div>
        <button
          onClick={handleClick}
          className=" w-full py-2 text-[14px] transition-all ease-in-out duration-500 hover:bg-green-800 bg-green-700 text-white font-bold rounded-md flex items-center justify-center"
        >
          Show Details
        </button>
      </div>
    </div>
  );
};

export const ShowSkeleton = () => {
  const myArray = new Array(6).fill(" ");
  return (
    <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {myArray.map((item, index) => (
        <Skeleton
          key={index}
          className=" w-full rounded-md"
          height={250}
          variant="rectangular"
          animation="wave"
        />
      ))}
    </div>
  );
};

const Sessions = () => {
  // making use of react query to get all the offers
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["get-sessions"],
    queryFn: async () => {
      const response = await fetch("/api/session-view");
      const result = await response.json();
      return result;
    },
  });
  console.log(data);

  // if (isFetching) {
  //   return <ShowSkeleton />;
  // }
  // if (isError) {
  //   return <div>{error.message}</div>;
  // }

  return (
    <section>
      <div className="max-w-full  py-3">
        {Array.isArray(data) && (
          <div>
            {data.length === 0 ? (
              <div className=" w-full">
                <Noitem desc="you don't have any open session" />
              </div>
            ) : (
              <div className="grid  grid-cols-2 gap-3  md:grid-cols-4">
                {data.map((item: IOffers, index) => (
                  <OfferCard item={item} key={index} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default Sessions;
