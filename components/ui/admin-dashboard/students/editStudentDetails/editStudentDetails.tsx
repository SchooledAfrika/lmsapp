import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const editStudentDetails = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="flex items-center justify-center gap-2 bg-none cursor-pointer">
          <Image
            src="/svgs/edit-colored.svg"
            width={20}
            height={20}
            alt="Edit"
          />
        </span>
      </DialogTrigger>

      <DialogContent className="sm:w-[500px]  w-[380px] font-subtext">
        <ScrollArea className="h-[500px] w-full">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">
              Update Student
            </DialogTitle>
          </DialogHeader>
          <div className="w-full mt-2">
            <form>
              <div>
                <label className="text-[15px]">Full Name</label>
                <Input
                  id="name"
                  type="text"
                  name="className"
                  placeholder="Full name"
                  className="col-span-6 w-full mt-2 outline-none"
                />
              </div>
              <div className=" flex flex-col">
                <label className="text-[15px] pb-2 pt-5">
                  Course to Enroll
                </label>
                <Input
                  id="name"
                  type="text"
                  name="className"
                  placeholder="UI/UX Design"
                  className="col-span-6 w-full outline-none"
                />
              </div>
              <div className="flex flex-col ">
                <label className="text-[15px] pb-2 pt-5">Email Address</label>
                <Input
                  id="name"
                  type="text"
                  name="className"
                  placeholder="UI/UX Design"
                  className="col-span-6 w-full outline-none"
                />
              </div>
              <div className=" flex flex-col">
                <label className="text-[15px] pb-2 pt-5">Phone Number</label>
                <Input
                  id="name"
                  type="text"
                  name="className"
                  placeholder="+234"
                  className="col-span-6 w-full outline-none"
                />
              </div>
              <div className=" flex flex-col">
                <label className="text-[15px] pb-2 pt-5">Date of Birth</label>
                <Input
                  id="name"
                  type="text"
                  name="className"
                  placeholder="Date of Birth"
                  className="col-span-6 w-full outline-none"
                />
              </div>
              <div className=" flex flex-col">
                <label className="text-[15px] pb-2 pt-5">Address</label>
                <Input
                  id="name"
                  type="text"
                  name="className"
                  placeholder="address"
                  className="col-span-6 w-full outline-none"
                />
              </div>
              <Button className="my-5 bg-lightGreen">Update Student</Button>
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default editStudentDetails;
