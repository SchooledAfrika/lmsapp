import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const BookSessionByStudent = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className=" text-white w-full  bg-green-700 rounded-md px-4 py-4 sm:py-4 text-[14px] flex items-center justify-center cursor-pointer">
          Book Session
        </div>
      </DialogTrigger>
      <DialogContent></DialogContent>
    </Dialog>
  );
};

export default BookSessionByStudent;
