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
import Link from "next/link";
export function TeacherRequestAlert() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="inline text-[14px] cursor-pointer  font-semibold">
          Cancel
        </p>
      </DialogTrigger>
      <DialogContent className="sm:w-[500px] w-[380px] font-subtext">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">Notice</DialogTitle>
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
            <p className="font-bold text-[18px] font-subtext  ">
              KYC Verification
            </p>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus.
            </p>

            <p className="font-bold text-[16px] font-subtext  ">What Next ?</p>

            <div className="flex font-subtext ">
              <div className="border border-l-4 border-dimOrange leading-[100px] rounded-full"></div>
              <div className="flex flex-col space-y-3 sm:w-[380px] ml-3 text-[13px]">
                <p>
                  Lorem ipsum dolor sit amet,. While our team verifies your
                  credentials.
                </p>
                <p>
                  You would be notified via e-mail as soon as your credentials
                  have been verified and approved. Goodluck and Welcome!
                </p>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="">
          <Button
            type="submit"
            className="w-full py-8 text-lg bg-lightGreen hover:bg-green-700"
          >
            Proceed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
