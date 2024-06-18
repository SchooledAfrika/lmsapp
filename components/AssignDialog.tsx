import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { RiErrorWarningFill } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
export function AssignDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border font-bold px-6 text-[13px] rounded-lg border-lightGreen hover:text-lightGreen"
        >
          Assign
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[500px] w-[380px] font-subtext">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">
            Assign Teacher
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 font-header py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="name"
              type="text"
              placeholder="Mathematics class"
              className="col-span-6 font-semibold w-full"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="teacher"
              list="Teacher"
              placeholder="Teacher"
              className="col-span-6 w-full"
            />
            <datalist id="Teacher" className="bg-white">
              <option>Maurice Odo</option>
              <option>Austine David</option>
              <option>Sarah Adebayor</option>
              <option>Promise Bamgbose</option>
            </datalist>
          </div>
          <div className="flex flex-col border p-6 rounded-md">
            <p className="font-semibold inline text-[14px]">
              {" "}
              <RiErrorWarningFill className="inline  text-lightGreen text-lg mr-2" />
              Can&apos;t Find Teacher Here?
            </p>
            <p className="text-[14px] mt-3">
              Go to{" "}
              <Link href="/find-tutors" className="text-red-500">
                Teachers Tab
              </Link>{" "}
              to invite them to your school
            </p>
          </div>
        </div>
        <DialogFooter className="">
          <Button
            type="submit"
            className="w-full py-8 text-lg bg-lightGreen hover:bg-green-700"
          >
            Assign Teacher
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
