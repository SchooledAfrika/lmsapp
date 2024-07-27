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
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Idelete {
  offerId: string;
}

const RemoveStudent: React.FC<Idelete> = ({ offerId }) => {
  console.log(offerId);

  const [loading, setloading] = useState<boolean>(false);

  //   instance of client
  const queryClient = useQueryClient();
  //   creating a delete using mutation to the backend
  const { mutate } = useMutation({
    mutationFn: async (offerId: string) => {
      const result = await fetch(`/api/add-student-by-school`, {
        method: "DELETE",
        body: JSON.stringify({
          offerId: offerId,
        }),
      });
      return result;
      console.log(offerId);
    },

    onSuccess: async (result) => {
      queryClient.invalidateQueries({ queryKey: ["addStudent"] });
      if (result.ok) {
        setloading(false);
        return toast.success("Student Successfully Deleted");
      } else {
        setloading(false);
        return toast.error("error deleting student");
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
    mutate(offerId);
    console.log(offerId);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="inline text-[14px] cursor-pointer  font-semibold">
          <Trash2 className="inline w-4 h-4 mr-2 ml-0 text-lightGreen " />
          Remove
        </p>
      </DialogTrigger>
      <DialogContent className="sm:w-[500px] w-[380px] font-subtext">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">Remove</DialogTitle>
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
              Are you sure you want to remove Student?
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
            {loading ? "Deleting Student..." : "Delete Student"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveStudent;
