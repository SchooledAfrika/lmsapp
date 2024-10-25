"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
import Image from "next/image";

interface IdeleteCourse {
  id: string;
}

const RemoveCourse: React.FC<IdeleteCourse> = ({ id }) => {
  const [loading, setloading] = useState<boolean>(false);

  //   instance of client
  const queryClient = useQueryClient();
  //   creating a delete using mutation to the backend
  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      const result = await fetch(`/api/created-course-byteacher`, {
        method: "DELETE",
        body: JSON.stringify({
          id: id,
          
        }),
      });
      return result;
     
      
    },

    onSuccess: async (result) => {
      queryClient.invalidateQueries({ queryKey: ["getCourseByTeacher"] });
      if (result.ok) {
        setloading(false);
        return toast.success("Course Successfully Deleted");
      } else {
        setloading(false);
        return toast.error("error deleting course");
      }
    },
    onError: (error) => {
      console.error("Error deleting data:", error);
      setloading(false);

      // Handle error as needed
    },
  });
  const handleDelete = () => {
    setloading(true);
    mutate(id);
   
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button className="bg-dimOrange cursor-pointer absolute -translate-y-1/2 right-3 rounded-md text-white text-[12px] font-bold px-4 py-2 text-center lg:block">
            Delete Course
          </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[500px] w-[380px] font-subtext">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">Remove Course</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 font-header py-4">
          <div className="flex flex-1 items-center justify-center mx-auto gap-2">
            <Image
              src="/warn.png"
              alt="warning"
              width={200}
              height={100}
              className="w-[50px]"
            />
          </div>
          <div className="grid  items-center font-header gap-4">
            <p className="font-bold text-[20px]  ">
              Are you sure you want to remove Course?
            </p>
            <p className="text-sm">
              This action can not be reversed, be sure you want to remove before
              you confirm
            </p>
          </div>
        </div>

        <DialogFooter className="">
          <Button
            onClick={handleDelete}
            disabled={loading}
            type="submit"
            className="w-full py-8 text-lg bg-lightGreen hover:bg-green-700"
          >
            {loading ? "Deleting Course..." : "Delete Course"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveCourse
