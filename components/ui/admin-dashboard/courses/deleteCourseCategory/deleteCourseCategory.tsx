import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const DeleteCourseCategory = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center justify-center gap-2 bg-none cursor-pointer">
          <Image src="/svgs/danger.svg" width={15} height={15} alt="Delete" />
          <p className="text-[12px] font-semibold">Delete Category</p>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:w-[500px]  w-[380px] font-subtext">
        <ScrollArea className="h-[300px] w-full ">
          <div className="flex flex-col justify-center items-center w-[96%]">
            <Image
              src="/svgs/danger-colored.svg"
              width={100}
              height={100}
              alt="Danger"
            />
            <h1 className="text-3xl font-bold py-5">Are You Sure?</h1>
            <span className="font-semibold text-gray-700 pb-7">
              This data will be removed permanently.
            </span>
            <div className="flex gap-3 items-center">
              <Button className="bg-[#359C71] font-semibold">
                Yes, Delete it
              </Button>
              <Button className="!bg-red-200 font-semibold !text-red-500 hover:!text-white hover:!bg-red-500">
                Cancel
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCourseCategory;
