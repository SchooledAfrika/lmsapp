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
import Image from "next/image";
import { GoDotFill } from "react-icons/go";

export const TestUploadResource = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="inline text-[12px] font-semibold cursor-pointer">
          <GoDotFill className="inline ml-0 text-lightGreen" />
          Upload a Resource
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] font-subtext">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">
            Upload Resources
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 font-header py-4">
          <div className="relative flex items-center w-full">
            <div className="absolute left-0 pl-3">
              <Image
                src="/svgs/link-plain.svg"
                width={20}
                height={20}
                alt="Link"
              />
            </div>
            <Input
              id="id"
              type="text"
              placeholder="Paste Link Here"
              className="pl-10 w-full"
            />
          </div>
          <div className="w-full flex flex-col items-center">
            <h2 className="text-lg  text-black font-bold">
              {" "}
              <span className="hidden  md:inline-flex w-20 md:w-36 mb-2 py-[.3px]  lgl:w-72 h-[.3px] bg-slate-700 mr-6"></span>
              OR{" "}
              <span className="hidden md:inline-flex mb-2 w-20 py-[.3px] md:w-32 lgl:w-72 h-[.3px] bg-slate-700 ml-6"></span>
            </h2>
          </div>
          <div className="relative flex items-center w-full">
            <div className="absolute left-0 pl-3">
              <Image
                src="/svgs/upload.svg"
                width={20}
                height={20}
                alt="Upload"
              />
            </div>
            <Input
              id="email"
              placeholder="Upload Resources"
              className="pl-10 w-full"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="w-full py-6 bg-lightGreen hover:bg-green-700"
          >
            <TestUploadResourceContinue />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const TestUploadResourceContinue = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="inline text-[16px] font-semibold cursor-pointer">
          Upload
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] font-subtext">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">
            Upload Resources
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 font-header py-4">
          <div className="relative flex items-center w-full">
            <div className="absolute left-0 pl-3">
              <Image
                src="/svgs/upload.svg"
                width={20}
                height={20}
                alt="Upload"
              />
            </div>
            <Input
              id="email"
              placeholder="How Europe Underdeveloped Africa"
              className="pl-10 w-full"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="email"
              placeholder="Tittle"
              className="col-span-6 w-full"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="email"
              placeholder="Classroom"
              className="col-span-6 w-full"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="email"
              placeholder="Subject"
              className="col-span-6 w-full"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="email"
              placeholder="Grade"
              className="col-span-6 w-full"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="w-full py-6 bg-lightGreen hover:bg-green-700"
          >
            Add Resources
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
