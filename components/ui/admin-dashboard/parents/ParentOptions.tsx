"use client";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FaEllipsisH } from "react-icons/fa";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa";
// import RemoveClass from "./RemoveClass";
import { IoMailUnreadOutline } from "react-icons/io5";
import RemoveParent from "./RemoveParent";
import UpdateParentStatus from "./UpdateParentStatus";
import { SendSingleMail } from "../teachers/ChangeRole";

interface Iparent {
  dataId: string;
  email: string;
}

const ParentOptions: React.FC<Iparent> = ({ dataId, email }) => {
  const [ismailOpen, setismailOpen] = useState<boolean>(false);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="border-none bg-slate-100" variant="outline">
          <FaEllipsisH className="ml-3 text-lightGreen " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40">
        <div className="grid gap-4 font-header">
          <div className="grid gap-2">
            <div className="flex justify-start">
              <Link href={`/admin-dashboard/parents/${dataId}`}>
                <p className="inline text-[13px]  font-semibold">
                  <FaRegEye className="inline ml-0 w-4 h-4 mr-2 text-lightGreen" />
                  View
                </p>
              </Link>
            </div>
            <hr className="bg-black" />
            <div className="flex justify-start">
              <div
                onClick={() => setismailOpen(true)}
                className=" flex items-center text-[13px]  font-semibold"
              >
                <IoMailUnreadOutline className="inline ml-0 w-4 h-4 mr-2 text-lightGreen" />
                <p>Send Email</p>
              </div>
              <SendSingleMail
                ismailOpen={ismailOpen}
                setIsmailOpen={setismailOpen}
                email={email}
              />
            </div>
            <hr className="bg-black" />
            <div className="flex justify-start">
              <UpdateParentStatus dataId={dataId} />
            </div>
            <hr className="bg-black" />
            <div className="flex justify-start">
              <RemoveParent dataId={dataId} />
            </div>
            <hr className="bg-black" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ParentOptions;
