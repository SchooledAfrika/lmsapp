'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useState } from "react"
import { IoMailUnreadOutline } from "react-icons/io5"
 
export function PayProof() {
    const [loading, setloading] = useState<boolean>(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
      <p className="inline text-[13px]  font-semibold">
                <IoMailUnreadOutline className="inline ml-0 w-4 h-4 mr-2 text-lightGreen" />
                Send Email
              </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Payment Proof To</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <div className="flex flex-1 items-center justify-center mx-auto gap-2">
            <Image
              src="/logo.png"
              alt="warning"
              width={200}
              height={200}
              className="w-[100px]"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" value="Beneficiary Email" type="email" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="upload" className="text-right">
              Payment Proof
            </Label>
            <Input id="file" placeholder="upload payment proof" type="file" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
        <Button
            // onClick={handleDelete}
            disabled={loading}
            type="submit"
            className="w-full py-8 text-lg bg-lightGreen hover:bg-green-700"
          >
            {loading ? "Sending..." : "Send"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}