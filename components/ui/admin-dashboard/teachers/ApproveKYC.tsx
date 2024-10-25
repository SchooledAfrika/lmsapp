"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShieldCheck } from "lucide-react";
import { FileText } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "../../scroll-area";

const ApproveKYC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["Approve-KYC", id],
    queryFn: async () => {
      const response = await fetch(`/api/teachers/${id}`);
      if (!response.ok) throw new Error("Failed to fetch data");
      return response.json();
    },
  });

  // Handle loading state
  if (isLoading) {
    return <div className="my-4 font-bold">Loading...</div>;
  }

  // Handle error state
  if (isError) {
    return <div className="flex-1">{(error as Error).message}</div>;
  }

  // Approve KYC function
  const handleApprove = async () => {
    setLoading(true);
    try {
      await fetch(`/api/teachers/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ approved: true }),
      });
      toast.success("KYC approved successfully!");
    } catch (err) {
      toast.error("Error approving KYC");
    } finally {
      setLoading(false);
    }
  };

  const resumeUrl = data?.resume;
  const isPdf = resumeUrl?.endsWith(".pdf");
  const isDocx = resumeUrl?.endsWith(".docx");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-[14px] cursor-pointer bg-lightGreen text-white font-semibold">
          <ShieldCheck className="inline w-4 h-4 mr-2 text-white" />
          Approve KYC
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[500px] w-[380px] font-subtext">
      <ScrollArea className="h-[500px] w-full ">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">APPROVE KYC</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 font-header py-4">
          {data && (
            <div key={data.id} className="grid items-center gap-4">
              <p className="font-semibold text-[14px]">
                Approve the KYC for the teacher based on submitted Resume, Government-certified document(NIN, Voter's card, Driver's license, International Passport etc), Profile Picture and Snapshot details.
              </p>
              <div className="flex flex-col items-center gap-4">
               
                {resumeUrl && (
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-[12px] px-3  w-full text-center py-2 rounded-md bg-[rgba(0,0,0,0.6)] text-white font-semibold"
                    download={isDocx ? "resume.docx" : undefined}
                  >
                    <FileText className="w-6 h-6 mr-2" />
                    {isPdf ? "Open PDF Resume" : "Download DOCX Resume"}
                  </a>
                )}
              </div>
              <div className="w-full flex space-x-3">

                {/* profile photo */}
                <Image
                src={data.profilePhoto}
                alt="warning"
                
                width={200}
                height={200}
                className="md:w-[500px] md:h-[300px] w-full rounded-md"
                />
                </div>
              <div className="w-full flex space-x-3">

                {/* profile photo */}
                <Image
                src={data.profilePhoto}
                alt="warning"
                
                width={200}
                height={200}
                className="md:w-[250px] md:h-[250px] w-full rounded-md"
                />

                {/* submitted kyc photo */}
                 <Image
                src={data.profilePhoto}
                alt="warning"
                
                width={200}
                height={200}
                className="md:w-[250px] md:h-[250px] w-full rounded-md"
                />
          </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            onClick={handleApprove}
            disabled={loading}
            className="w-full py-2 text-lg bg-lightGreen hover:bg-green-700"
          >
            {loading ? "Approving..." : "Approve KYC"}
          </Button>
        </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ApproveKYC;
