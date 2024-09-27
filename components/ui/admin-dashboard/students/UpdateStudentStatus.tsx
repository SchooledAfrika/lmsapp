"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FaChartPie } from "react-icons/fa6";
import { studentStatusSchema } from "@/constants/studentStatus";

export type IupdatingStudentStatus = z.infer<typeof studentStatusSchema>;

interface IUpdate {
  studentId: string;
}
const UpdateStudentStatus: React.FC<IUpdate> = ({ studentId }) => {
  const [loading, setloading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<IupdatingStudentStatus>({
    resolver: zodResolver(studentStatusSchema),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["updateStudentStatus"],
    mutationFn: async (data: IupdatingStudentStatus) => {
      const result = await fetch(`/api/students/${studentId}`, {
        method: "PUT",
        body: JSON.stringify({
          ...data,
        }),
      });

      return result;
    },
    onSuccess: async (result) => {
      queryClient.invalidateQueries({ queryKey: ["update"] });
      if (result.ok) {
        const body = await result.json();
        setloading(false);
        reset();
        return toast.success(body.message);
      } else {
        setloading(false);
        return toast.error("error updating profile");
      }
    },
  });

  const runSubmit: SubmitHandler<IupdatingStudentStatus> = async (data) => {
    setloading(true);
    mutation.mutate(data);
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <p className="inline text-[13px] cursor-pointer  font-semibold">
            <FaChartPie className="inline w-4 h-4 mr-2 ml-0 text-lightGreen " />
            Update Status
          </p>
        </DialogTrigger>
        <DialogContent className="sm:w-[500px] w-[380px] font-subtext">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">
              Update Status
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 font-header py-4">
            <div className="grid  items-center font-header gap-4">
              <p className="font-semibold text-[16px]  ">
                Are you sure you want to perform this operation?
              </p>
            </div>
            <form onSubmit={handleSubmit(runSubmit)}>
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
                      <SelectTrigger className=" w-full py-2">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>

                      <SelectContent className=" font-subtext font-medium">
                        <SelectGroup>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Suspended">Suspended</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.status && (
                  <small className="text-red-600">
                    {errors.status.message}
                  </small>
                )}
              </div>

              <Button
                type="submit"
                className="bg-secondary w-full text-white text-[16px] py-7 my-3"
                disabled={loading}
              >
                {loading ? "updating status..." : "Update Status"}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </div>
  );
};

export default UpdateStudentStatus;
