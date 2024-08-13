"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addingTeacherSchoolSchema } from "@/constants/addTeacher";
export type IaddingTeacherSchool = z.infer<typeof addingTeacherSchoolSchema>;

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IAddTeacher {
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  openDialog: boolean;
}

const TeacherDialog: React.FC<IAddTeacher> = ({
  setOpenDialog,
  openDialog,
}) => {
  const [loading, setloading] = useState<boolean>(false);
  const [loadingB, setLoadingB] = useState<boolean>(false);
  // react hook form instance below here
  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IaddingTeacherSchool>({
    resolver: zodResolver(addingTeacherSchoolSchema),
  });

  //   instance of client
  const queryClient = useQueryClient();
  //   creating a post using mutation to the backend
  const mutation = useMutation({
    mutationKey: ["postTeacher"],
    mutationFn: async (data: IaddingTeacherSchool) => {
      const result = await fetch("/api/add-teacher-by-school", {
        method: "POST",
        body: JSON.stringify({
          ...data,
        }),
      });

      return result;
    },
    onSuccess: async (result) => {
      const body = await result.json();
      queryClient.invalidateQueries({ queryKey: ["addTeacher"] });
      if (result.ok) {
        setloading(false);
        reset();
        toast.success(body.message);
        setTimeout(() => {
          return setOpenDialog(false);
        }, 4000);
      } else {
        setloading(false);
        return toast.error(body.message);
      }
    },
  });
  // here we validate the datas in our form submission
  // only if there is data, before the mutation function is called
  const runSubmit: SubmitHandler<IaddingTeacherSchool> = async (data) => {
    setloading(true);
    mutation.mutate(data);
  };

  return (
    <Dialog open={openDialog} onOpenChange={() => setOpenDialog(false)}>
      <DialogTrigger asChild>
        <Button className="bg-lightGreen bg-none border-none rounded-lg hover:bg-green-700  text-white text-[14px]  px-3 font-bold sm:w-36 w-28  py-2 text-start lg:block">
          <LiaChalkboardTeacherSolid className="sm:inline-block text-lg hidden mr-1" />
          Add Teacher
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] font-subtext">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">Add Teacher</DialogTitle>
        </DialogHeader>
        <div className="w-full mt-2">
          <form
            onSubmit={handleSubmit(runSubmit)}
            className=" flex flex-col gap-2 w-full px-2"
          >
            <div className="flex flex-col">
              <Input
                id="teacherId"
                type="text"
                {...register("teacherId")}
                name="teacherId"
                onChange={() => clearErrors("teacherId")}
                placeholder="Enter Teacher ID"
                className="col-span-6 w-full"
              />
              {errors.teacherId && (
                <small className="text-red-600">
                  {errors.teacherId.message}
                </small>
              )}
            </div>
            <Button
              type="submit"
              className="w-full py-6 mt-6 bg-lightGreen hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Sending Invite..." : "Send Invite"}
            </Button>
            <div className="w-full flex flex-col items-center">
              <h2 className="text-lg  text-black font-bold">
                {" "}
                <span className="hidden  md:inline-flex w-20 md:w-36 mb-2 py-[.3px]  lgl:w-72 h-[.3px] bg-slate-700 mr-6"></span>
                OR{" "}
                <span className="hidden md:inline-flex mb-2 w-20 py-[.3px] md:w-32 lgl:w-72 h-[.3px] bg-slate-700 ml-6"></span>
              </h2>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="email"
                placeholder="Email Address"
                className="col-span-6 w-full"
              />
            </div>

            <Button
              type="submit"
              className="w-full py-6 mt-6 bg-lightGreen hover:bg-green-700"
              disabled={loadingB}
            >
              {loadingB ? "Sending Invite..." : "Send Invite"}
            </Button>
          </form>
        </div>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  );
};

const AddTeacher = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  return (
    <div onClick={() => setOpenDialog(true)}>
      <TeacherDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  );
};

export default AddTeacher;
