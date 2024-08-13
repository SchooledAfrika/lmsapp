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
import { Input } from "@/components/ui/input";
import { SiGoogleclassroom } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const AddStudent = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-lightGreen mt-3 bg-none border-none rounded-lg hover:bg-green-700  text-white text-[13px] font-semibold px-3 py-2 text-start lg:block">
          <SiGoogleclassroom className="sm:inline-block text-[18px] hidden mr-2" />
          Add Student
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:w-[500px]  w-[380px] font-subtext">
        <ScrollArea className="h-[500px] w-full ">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">
              Add Students
            </DialogTitle>
          </DialogHeader>
          <div className="w-full mt-2">
            <form>
              <div className=" flex flex-col">
                <label className="text-[15px] pb-2">Full Name</label>
                <Input
                  id="name"
                  type="text"
                  name="className"
                  placeholder="Full name"
                  className="col-span-6 w-full outline-none"
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
              <Button className="my-5 bg-lightGreen">Add Student</Button>
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudent;
