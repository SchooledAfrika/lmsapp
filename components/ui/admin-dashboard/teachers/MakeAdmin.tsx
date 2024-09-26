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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserCog } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ImakeAdmin {
  dataId: string;
}
const MakeAdmin: React.FC<ImakeAdmin> = ({ dataId }) => {
  const [loading, setloading] = useState<boolean>(false);

  //   instance of client
  const queryClient = useQueryClient();
  //   creating a delete using mutation to the backend
  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      const result = await fetch(` /api/teachers/make-admin`, {
        method: "PUT",
        body: JSON.stringify({
          id: dataId,
        }),
      });
      return result;
    },

    onSuccess: async (result) => {
      queryClient.invalidateQueries({ queryKey: ["makeAdmin"] });
      if (result.ok) {
        setloading(false);
        return toast.success("Admin Successfully Created");
      } else {
        setloading(false);
        return toast.error("error making admin");
      }
    },
    onError: (error) => {
      console.error("Error making admin:", error);
      setloading(false);
    },
  });
  const handleMakeAdmin = () => {
    setloading(true);
    mutate(dataId);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-dimOrange  hover:bg-dimYellow">
          <p className="inline text-[13px] cursor-pointer  font-semibold">
            <UserCog className="inline w-4 h-4 mr-1 ml-0 " />
            Make Admin
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[500px] w-[380px] font-subtext">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">Make Admin</DialogTitle>
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
              Are you sure you want to make Teacher an ADMIN?
            </p>
            <p className="text-sm">
              This action can not be reversed, be sure you want to perform this
              operation?
            </p>
          </div>
        </div>
        <DialogFooter className="">
          <Button
            onClick={handleMakeAdmin}
            disabled={loading}
            type="submit"
            className="w-full py-8 text-lg bg-lightGreen hover:bg-green-700"
          >
            {loading ? "Making Admin..." : "Make Admin"}
          </Button>
        </DialogFooter>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  );
};

export default MakeAdmin;
