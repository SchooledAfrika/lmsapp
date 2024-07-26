"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addingStudentSchoolSchema } from "@/constants/addStudent";
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
import { Input } from "@/components/ui/input";
import { LiaGraduationCapSolid } from "react-icons/lia";

export type IaddingStudentSchool = z.infer<typeof addingStudentSchoolSchema>;

const AddStudent = () => {
  const [loading, setloading] = useState<boolean>(false);
  // react hook form instance below here
  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IaddingStudentSchool>({
    resolver: zodResolver(addingStudentSchoolSchema),
  });

  //   instance of client
  const queryClient = useQueryClient();
  //   creating a post using mutation to the backend
  const mutation = useMutation({
    mutationKey: ["postStudent"],
    mutationFn: async (data: IaddingStudentSchool) => {
      console.log(data);
      const result = await fetch("/api/add-student-by-school", {
        method: "POST",
        body: JSON.stringify({
          ...data,
        }),
      });

      return result;
    },
    onSuccess: async (result) => {
      queryClient.invalidateQueries({ queryKey: ["addStudent"] });
      if (result.ok) {
        const body = await result.json();
        setloading(false);
        reset();
        return toast.success(body.message);
      } else {
        setloading(false);
        return toast.error("Error adding student");
      }
    },
  });
  // here we validate the datas in our form submission
  // only if there is data, before the mutation function is called
  const runSubmit: SubmitHandler<IaddingStudentSchool> = async (data) => {
    setloading(true);
    mutation.mutate(data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-lightGreen bg-none border-none rounded-lg hover:bg-green-700  text-white text-[14px] font-bold  px-3 sm:w-36 w-28  py-2 text-start lg:block">
          <LiaGraduationCapSolid className="sm:inline-block text-lg hidden mr-1" />
          Add Student
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] font-subtext">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">Add Student</DialogTitle>
        </DialogHeader>
        <div className="w-full mt-2">
          <form
            onSubmit={handleSubmit(runSubmit)}
            className=" flex flex-col gap-2 w-full px-2"
          >
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="studentId"
                type="text"
                {...register("studentId")}
                name="studentId"
                onChange={() => clearErrors("studentId")}
                placeholder="Enter Student ID"
                className="col-span-6 w-full"
              />
              {errors.studentId && (
                <small className="text-red-600">
                  {errors.studentId.message}
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
              disabled={loading}
            >
              {loading ? "Sending Invite..." : "Send Invite"}
            </Button>
          </form>
        </div>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  );
};

export default AddStudent;
