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

// interface Idelete {
//   dataId: string;
// }

const PaymentCheckout = () => {
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
        <p className="inline text-[13px] cursor-pointer  font-semibold">
          <MdOutlineShoppingCartCheckout className="inline w-4 h-4 mr-2 ml-0 text-lightGreen " />
          Make Payment 
        </p>
      </DialogTrigger>
      <DialogContent className="sm:w-[500px] w-[380px] font-subtext">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">Pay $7000 To</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 font-header py-4">
          <div className="flex flex-1 items-center justify-center mx-auto gap-2">
            <Image
              src="/logo.png"
              alt="logo"
              width={200}
              height={200}
              className="w-[100px]"
            />
          </div>
          <div className="grid  items-center font-header gap-4">
            <p className="font-semibold text-[16px]  ">
              Account Number: 3067459507
            </p>
            <p className="font-semibold text-[16px]  ">
              Account Name: Odo Oluebube Maurice
            </p>
            <p className="font-semibold text-[16px]">
              Bank Name: Firstbank
            </p>

            <p className="font-medium text-[13px]">
              Made payment? go back to the 'Send Email' options to send proof of payment to beneficiary.
            </p>
          </div>
        </div>
       
      </DialogContent>
    </Dialog>
  );
};

export default PaymentCheckout;
