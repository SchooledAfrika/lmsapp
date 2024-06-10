import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";



import { GoDotFill } from "react-icons/go";

import Image from "next/image"
import Link from "next/link"
export function RemoveTeacher() {
  return (
    <Dialog>
      <DialogTrigger asChild>
      <p className="inline text-[14px] cursor-pointer  font-semibold">
                <GoDotFill className="inline ml-0 text-lightGreen " />
                Remove
              </p>
      </DialogTrigger>
      <DialogContent className="sm:w-[500px] w-[380px] font-subtext">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">
            Remove
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 font-header py-4">
          <div className="flex flex-1 items-center justify-center mx-auto gap-2">
            <Image src="/warn.png" alt="warning" width={200} height={100} className="w-[50px]" />
            
          </div>
          <div className="grid  items-center font-header gap-4">
            <p className="font-bold text-[20px]  ">Are you sure you want to remove Teacher?</p>
            <p className="text-sm">This action can not be reversed, be sure you want to remove before you confirm</p>
            
          </div>
          
          
        </div>
        <DialogFooter className="">
         
             <Button type="submit" className="w-full py-8 text-lg bg-lightGreen hover:bg-green-700">Confirm</Button>
         
       
         
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
