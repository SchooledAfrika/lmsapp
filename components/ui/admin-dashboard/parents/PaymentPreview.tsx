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
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";

// interface Idelete {
//   dataId: string;
// }

const PaymentPreview = () => {
  const [loading, setloading] = useState<boolean>(false);

  //   instance of client
  const queryClient = useQueryClient();
  //   creating a delete using mutation to the backend
  //   const { mutate } = useMutation({
  //     mutationFn: async (id: string) => {
  //       const result = await fetch(`/api/class`, {
  //         method: "DELETE",
  //         body: JSON.stringify({
  //           id: dataId,
  //         }),
  //       });
  //       return result;
  //       console.log(dataId);
  //     },

  //     onSuccess: async (result) => {
  //       queryClient.invalidateQueries({ queryKey: ["add"] });
  //       if (result.ok) {
  //         setloading(false);
  //         return toast.success("Class Successfully Deleted");
  //       } else {
  //         setloading(false);
  //         return toast.error("error deleting class");
  //       }
  //     },
  //     onError: (error) => {
  //       console.error("Error deleting data:", error);
  //       setloading(false);

  //       // Handle error as needed
  //     },
  //   });
  //   const handleDelete = () => {
  //     setloading(true);
  //     mutate(dataId);
  //     console.log(dataId);
  //   };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="inline text-[13px]  font-semibold">
          <FaRegEye className="inline ml-0 w-4 h-4 mr-2 text-lightGreen" />
          View Details
        </p>
      </DialogTrigger>
      <DialogContent className="sm:w-[500px] w-[380px] font-subtext">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">Payment For</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 font-header py-4">
          <div className="grid grid-cols-2 font-semibold items-center font-header gap-4">
            <div className="space-y-1">
              <p className="font-medium text-[13px]  ">
                Subject: <span>Mathematics</span>
              </p>
              <p className="font-medium text-[13px]  ">
                Session: <span>Homework Support</span>
              </p>
              <p className="font-medium text-[13px]">
                Grade: <span>Grade 5</span>
              </p>
              <p className="font-medium text-[13px]">
                Class: <span>Alpha</span>
              </p>
              <p className="font-medium text-[13px]">
                Ward: <span>Emenike Emmanuel</span>
              </p>
            </div>
            <div className="space-y-1">
              
              <p className="font-medium text-[13px]">
                Teacher: <span>Maurice Odo</span>
              </p>
              <p className="font-medium text-[13px]">
                Amount: <span>$1000</span>
              </p>
              <p className="font-medium text-[13px]">
                Date Paid: <span>25-04-2024</span>
              </p>
              <p className="font-medium text-[13px]">
                Class Starts: <span>25-04-2024</span>
              </p>
              <p className="font-medium text-[13px]">
                Class Ends: <span>07-06-2024</span>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentPreview;
