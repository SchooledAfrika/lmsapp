"use client";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import { Noitem } from "./ApplicantsTable";
import { ShowSkeleton } from "./ui/teacher-dashboard/openOffers/openOffers";
import Image from "next/image";
import { useConversion } from "@/data-access/conversion";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { IoWarning } from "react-icons/io5";

interface ISchoolInfo {
  name: string;
  banner: string;
  schAddress: string;
  ownerName: string;
  briefDescription: string | null;
}

interface IOffers {
  id: string;
  schoolId: string;
  status: string;
  createdAt: string;
  school: ISchoolInfo;
}

// this dailog handles confirmation
export const Approval: React.FC<{
  id: string;
  action: string;
  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setAction: React.Dispatch<React.SetStateAction<string>>;
  name: string;
}> = ({ id, action, showDialog, setShowDialog, setAction, name }) => {
  const queryclient = useQueryClient();
  // making use of react query to mutate the database
  const mutation = useMutation({
    mutationKey: ["approve-offer"],
    mutationFn: async (item: { id: string; status: string }) => {
      const response = await fetch("/api/student-offers", {
        method: "PUT",
        body: JSON.stringify({ offerId: item.id, status: item.status }),
      });
      return response;
    },
    onSuccess: async (response) => {
      if (response.ok) {
        toast.success("you have successfully approve the offer");
        setTimeout(() => {
          setShowDialog(false);
          queryclient.invalidateQueries({
            queryKey: ["get-offers-for-student"],
          });
        }, 4000);
      } else {
        toast.error("something went wrong");
      }
    },
  });
  // here, we handle approval now
  const handleApprove = () => {
    if (action === "approve") {
      mutation.mutate({ id, status: "ACTIVE" });
    } else {
      mutation.mutate({ id, status: "REJECTED" });
    }
  };
  return (
    <Dialog open={showDialog} onOpenChange={() => setShowDialog(false)}>
      <DialogTrigger>
        <button
          className={`px-3 py-2 ${
            name == "approve" ? "bg-green-800" : "bg-red-700"
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
              Are you sure you really want to {action} this offer?
            </p>
          </div>
          <div className=" flex flex-col gap-2 w-full">
            <button
              onClick={handleApprove}
              className=" py-3 text-white flex items-center justify-center bg-green-700 rounded-md w-full"
            >
              Approve
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

const OfferCard: React.FC<{ item: IOffers }> = ({ item }) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [action, setAction] = useState(" ");
  const { handleDate } = useConversion();
  return (
    <div className=" flex rounded-md flex-col overflow-hidden gap-2 bg-white pb-2">
      <div className=" w-full h-[200px]">
        <Image
          src={item.school.banner}
          alt=""
          width={200}
          height={200}
          className=" w-full h-full"
        />
      </div>
      <div className=" w-full px-3 flex flex-col gap-3">
        <div className=" text-black font-semibold">
          <p>
            School name:{" "}
            <span className=" font-normal text-[14px]">{item.school.name}</span>
          </p>
          <p>
            Owner:{" "}
            <span className=" font-normal text-[14px]">
              {item.school.ownerName}
            </span>
          </p>
          <p>
            Address:{" "}
            <span className=" font-normal text-[14px]">
              {item.school.schAddress}
            </span>
          </p>
          <p>
            Request Date:{" "}
            <span className=" font-normal text-[14px]">
              {handleDate(item.createdAt)}
            </span>
          </p>
        </div>
        <div className=" w-full flex gap-2 items-center">
          <div
            onClick={() => {
              setAction("approve");
              setShowDialog(true);
            }}
          >
            <Approval
              showDialog={showDialog}
              setShowDialog={setShowDialog}
              id={item.id}
              action={action}
              name={"approve"}
              setAction={setAction}
            />
          </div>
          <div
            onClick={() => {
              setAction("reject");
              setShowDialog(true);
            }}
          >
            <Approval
              showDialog={showDialog}
              setShowDialog={setShowDialog}
              id={item.id}
              action={action}
              name={"reject"}
              setAction={setAction}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentAdmision = () => {
  // making use of react query to get all the offers
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["get-offers-for-student"],
    queryFn: async () => {
      const response = await fetch("/api/student-offers");
      const result = await response.json();
      return result;
    },
  });
  if (isFetching) {
    return (
      <div className=" mt-4">
        <ShowSkeleton />
      </div>
    );
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <section>
      <div className="max-w-full  py-6">
        {Array.isArray(data) && (
          <div>
            {data.length === 0 ? (
              <div className=" w-full">
                <Noitem desc="You don't have new admissions" />
              </div>
            ) : (
              <div className="grid  grid-cols-1 xs:grid-cols-2 gap-3  md:grid-cols-3">
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

export default StudentAdmision;
