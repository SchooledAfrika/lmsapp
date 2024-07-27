"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  addingClassroomSchoolSchema,
  Subject,
} from "@/constants/addClassroomSchool";
export type IaddingClassroomSchool = z.infer<typeof addingClassroomSchoolSchema>;


import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { SiGoogleclassroom } from "react-icons/si";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AddClassroom = () => {
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
  } = useForm<IaddingClassroomSchool>({
    resolver: zodResolver(addingClassroomSchoolSchema),
  });

  //   instance of client
  const queryClient = useQueryClient();
  //   creating a post using mutation to the backend
  const mutation = useMutation({
    mutationKey: ["postSchool"],
    mutationFn: async (data: IaddingClassroomSchool) => {
      console.log(data);
      const result = await fetch("/api/class-action", {
        method: "POST",
        body: JSON.stringify({
          ...data,
        }),
      });

      return result;
    },
    onSuccess: async (result) => {
      queryClient.invalidateQueries({ queryKey: ["addSchool"] });
      if (result.ok) {
        const body = await result.json();
        setloading(false);
        reset();
        return toast.success(body.message);
      } else {
        setloading(false);
        return toast.error("error creating class");
      }
    },
  });
  // here we validate the datas in our form submission
  // only if there is data, before the mutation function is called
  const runSubmit: SubmitHandler<IaddingClassroomSchool> = async (data) => {
    setloading(true);
    mutation.mutate(data);
  };

  
 

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-lightGreen mt-3 bg-none border-none rounded-lg hover:bg-green-700  text-white text-[14px] font-semibold  px-3 sm:w-36   py-2 text-start lg:block">
          <SiGoogleclassroom className="sm:inline-block hidden mr-1" />
          Add Classroom
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[500px] w-[380px] font-subtext">
      <ScrollArea className="h-[400px] w-full ">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">
            Create Classroom
          </DialogTitle>
        </DialogHeader>

        <div className="w-[96%] mt-2">
            <form
              onSubmit={handleSubmit(runSubmit)}
              className=" flex flex-col gap-2 w-full px-2"
            >
              <div className=" flex flex-col">
                <Input
                  id="name"
                  type="text"
                  {...register("name")}
                  name="name"
                  onChange={() => clearErrors("name")}
                  placeholder="Name"
                  className="col-span-6 w-full"
                />
                {errors.name && (
                  <small className="text-red-600">
                    {errors.name.message}
                  </small>
                )}
              </div>
             
              <div className="flex flex-col">
                <Controller
                  control={control}
                  name="subject"
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        clearErrors("subject");
                      }}
                    >
                      <SelectTrigger className=" w-full py-6">
                        <SelectValue placeholder="Subject" />
                      </SelectTrigger>

                      <SelectContent className=" font-subtext font-medium">
                        <ScrollArea className="h-[500px] w-full ">
                          <SelectGroup>
                            {Subject.map((item, index) => (
                              <SelectItem key={index} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.subject && (
                  <small className="text-red-600">
                    {errors.subject.message}
                  </small>
                )}
              </div>
              <div className="flex flex-col ">
                <Controller
                  control={control}
                  name="grade"
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        clearErrors("grade");
                      }}
                    >
                      <SelectTrigger className=" w-full py-6">
                        <SelectValue placeholder="Grade" />
                      </SelectTrigger>

                      <SelectContent className=" font-subtext font-medium">
                        <ScrollArea className="h-[500px] w-full ">
                          <SelectGroup>
                            <SelectItem value="Grade1">Grade 1</SelectItem>
                            <SelectItem value="Grade2">Grade 2</SelectItem>
                            <SelectItem value="Grade3">Grade 3</SelectItem>
                            <SelectItem value="Grade4">Grade 4</SelectItem>
                            <SelectItem value="Grade5">Grade 5</SelectItem>
                            <SelectItem value="Grade6">Grade 6</SelectItem>
                            <SelectItem value="Grade7">Grade 7</SelectItem>
                            <SelectItem value="Grade8">Grade 8</SelectItem>
                            <SelectItem value="Grade9">Grade 9</SelectItem>
                            <SelectItem value="Grade10">Grade 10</SelectItem>
                            <SelectItem value="Grade11">Grade 11</SelectItem>
                            <SelectItem value="Grade12">Grade 12</SelectItem>
                          </SelectGroup>
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.grade && (
                  <small className="text-red-600">{errors.grade.message}</small>
                )}
              </div>
              
              
              

             

              <div className="flex flex-col">
                <Controller
                  control={control}
                  name="time"
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        clearErrors("time");
                      }}
                    >
                      <SelectTrigger className=" w-full py-6">
                        <SelectValue placeholder="Class Timing" />
                      </SelectTrigger>

                      <SelectContent className=" font-subtext font-medium">
                        <ScrollArea className="h-[250px] w-full ">
                          <SelectGroup>
                            <SelectItem value="8AM-10AM">8AM-10AM</SelectItem>
                            <SelectItem value="10AM-12PM">10AM-12PM</SelectItem>
                            <SelectItem value="12PM-2PM">12PM-2PM</SelectItem>
                            <SelectItem value="2PM-4PM">2PM-4PM</SelectItem>
                            <SelectItem value="4PM-6PM">4PM-6PM</SelectItem>
                            <SelectItem value="6PM-8PM">6PM-8PM</SelectItem>
                            <SelectItem value="8PM-10PM">8PM-10PM</SelectItem>
                          </SelectGroup>
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.time && (
                  <small className="text-red-600">
                    {errors.time.message}
                  </small>
                )}
              </div>

             
              
              
              <Button
                type="submit"
                className="w-full py-6 mt-6 bg-lightGreen hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "creating class..." : "Add Classroom"}
              </Button>
            </form>
          </div>
          </ScrollArea>
       </DialogContent>
      <ToastContainer />
    </Dialog>
  );
}

export default AddClassroom;
