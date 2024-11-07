import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { kycStatusSchema } from "@/constants/kycStatus";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  teacherId: string; // Include teacherId in the type
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
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, reset, control, clearErrors, formState: { errors } } = useForm<IupdatingKYC>({
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
          'Content-Type': 'application/json',
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
      setLoading(false);
      reset();
      toast.success(data.message);
    },
    onError: (error: Error) => {
      setLoading(false);
      toast.error(error.message);
    },
  });

  const runSubmit: SubmitHandler<IupdatingKYC> = async (data) => {
    console.log('Form data:', data);
    setLoading(true);
    mutation.mutate({
      ...data,
      teacherId: teacherData.kyc.teacherId,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-lightGreen text-white">
          <ShieldCheck className="mr-2" />
          Approve KYC
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[500px] w-[380px] font-header">
        <ScrollArea className="h-[500px]">
          <DialogHeader>
            <DialogTitle className="font-bold text-[30px] my-3">Approve KYC</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 text-[14px]">
            <p>
              Approve the KYC for the teacher based on submitted Resume and Government-certified document.
            </p>
            <div className="flex flex-col items-center gap-4">
              {teacherData.kyc?.docType && (
                <p className="px-2 mt-2 font-semibold w-full text-center text-[14px] py-2 rounded-md bg-[rgba(0,0,0,0.6)] text-white">
                  Document Type: {teacherData.kyc.docType}
                </p>
              )}
              <div className="flex space-x-2">
                <div>
                  <label className="font-bold">Document Image</label>
                  {teacherData.kyc?.docImg && (
                    <Image
                      src={teacherData.kyc.docImg}
                      alt="Document Image"
                      width={300}
                      height={300}
                      className="rounded-md"
                    />
                  )}
                </div>
                <div>
                  <label className="font-bold">Captured Image</label>
                  {teacherData.kyc?.verifiedImg && (
                    <Image
                      src={teacherData.kyc.verifiedImg}
                      alt="Verified Document"
                      width={300}
                      height={300}
                      className="rounded-md"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit(runSubmit)} noValidate>
            <div className="flex gap-[10px] pt-4">
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value); 
                      clearErrors("status"); 
                    }}
                  >
                    <SelectTrigger className="w-full py-2">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent className="font-subtext font-medium">
                      <SelectGroup>
                        <SelectItem value="PENDING">PENDING</SelectItem>
                        <SelectItem value="APPROVED">APPROVED</SelectItem>
                        <SelectItem value="REJECTED">REJECTED</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && (
                <small className="text-red-600">{errors.status.message}</small>
              )}
            </div>

            <Button
              type="submit"
              className="bg-secondary w-full text-white text-[16px] py-7 my-3"
              disabled={loading}
            >
              {loading ? "Approving KYC..." : "Approve KYC"}
            </Button>
          </form>
        </ScrollArea>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  );
};

export default ApproveKYC;
