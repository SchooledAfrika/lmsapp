"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { kycStatusSchema } from "@/constants/kycStatus";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "../../scroll-area";

export type IupdatingKYC = z.infer<typeof kycStatusSchema> & {
  teacherId: string;
};

interface TeacherProfileProps {
  teacherData: {
    id: string;
    accountName: string;
    accountNo: string;
    bankName: string;
    address: string;
    createdAt: string;
    details: string | null;
    email: string;
    gender: string;
    grade: string[];
    hours: string;
    kyc: {
      createdAt: string;
      docImg: string;
      docType: string;
      status: string;
      verifiedImg: string;
      teacherId: string;
    };
  };
}

const ApproveKYC: React.FC<TeacherProfileProps> = ({ teacherData }) => {
  const { id } = useParams();
  const [loadingApprove, setLoadingApprove] = useState<boolean>(false);
  const [loadingReject, setLoadingReject] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IupdatingKYC>({
    resolver: zodResolver(kycStatusSchema),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["updateKYC"],
    mutationFn: async (data: IupdatingKYC) => {
      const result = await fetch(`/api/teachers/approve-kyc`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!result.ok) {
        const errorResponse = await result.json();
        throw new Error(errorResponse.message || "Error updating KYC Status");
      }

      return result.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["updateKYC"] });
      setLoadingApprove(false);
      setLoadingReject(false);
      reset();
      toast.success(data.message);
    },
    onError: (error: Error) => {
      setLoadingApprove(false);
      setLoadingReject(false);
      toast.error(error.message);
    },
  });

  const approveSubmit = async () => {
    setLoadingApprove(true);
    mutation.mutate({
      teacherId: teacherData.kyc.teacherId,
      status: "APPROVED",
    });
  };

  const rejectSubmit = async () => {
    setLoadingReject(true);
    mutation.mutate({
      teacherId: teacherData.kyc.teacherId,
      status: "REJECTED",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-lightGreen text-white">
          <ShieldCheck className="mr-2" />
          View KYC
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[500px] w-[380px] font-header">
        <ScrollArea className="h-[500px]">
          <DialogHeader>
            <DialogTitle className="font-bold text-[30px] my-3">
              View KYC
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 text-[14px]">
            <p>
              View and approve or reject the KYC for the teacher based on
              submitted documents.
            </p>
            <div className="flex flex-col items-center gap-4">
              {teacherData.kyc?.docType && (
                <p className="px-2 mt-2 font-semibold w-full text-center text-[14px] py-2 rounded-md bg-[rgba(0,0,0,0.6)] text-white">
                  Document Type: {teacherData.kyc.docType}
                </p>
              )}
              <div className="flex space-x-2">
                {teacherData.kyc?.docImg && (
                  <div>
                    <label className="font-bold">Document Image</label>
                    <Image
                      src={teacherData.kyc.docImg}
                      alt="Document Image"
                      width={300}
                      height={300}
                      className="rounded-md"
                    />
                  </div>
                )}
                {teacherData.kyc?.verifiedImg && (
                  <div>
                    <label className="font-bold">Captured Image</label>
                    <Image
                      src={teacherData.kyc.verifiedImg}
                      alt="Verified Document"
                      width={300}
                      height={300}
                      className="rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            {teacherData.kyc ? (
              <form onSubmit={handleSubmit((data) => {})} noValidate>
                {teacherData.kyc.status && (
                  <div className="flex md:flex-row flex-col gap-4 pt-4">
                    <Button
                      type="button"
                      className="bg-green-500 text-white w-full py-7"
                      onClick={approveSubmit}
                      disabled={loadingApprove}
                    >
                      {loadingApprove ? "Approving KYC..." : "Approve KYC"}
                    </Button>
                    <Button
                      type="button"
                      className="bg-red-500 text-white w-full py-7"
                      onClick={rejectSubmit}
                      disabled={loadingReject}
                    >
                      {loadingReject ? "Rejecting KYC..." : "Reject KYC"}
                    </Button>
                  </div>
                )}
              </form>
            ) : (
              <div className="w-full flex items-center justify-center flex-col gap-2">
                <Image
                  priority
                  src="/noitem.avif"
                  alt="noitem"
                  width={200}
                  height={200}
                  className="w-[200px] h-[200px]"
                />
                <div className="px-4 py-2 border border-green-700 rounded-md text-sm">
                  <p>No KYC data here.</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  );
};

export default ApproveKYC;
