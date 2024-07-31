import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { FaEllipsisH } from "react-icons/fa";
import Link from "next/link";

import { ListCollapse } from "lucide-react";
import RemoveStudent from "./RemovesStudent";

interface Idelete {
  offerId: string;
}


const StudentOptions = ({offerId}:Idelete) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
      <Button className="border-none" variant="outline">
        <FaEllipsisH className="ml-3 " />
      </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40">
        <div className="grid gap-4 font-subtext">
          <div className="grid gap-2">
            <div className="flex justify-start">
              <Link href={`/school-dashboard/students/${offerId}`}>
                <p className="inline text-[14px]  font-semibold">
                <ListCollapse className="inline w-4 h-4 mr-2 ml-0 text-lightGreen" />
                  Details
                </p>
              </Link>
            </div>
            <hr className="bg-black" />
            <div className="flex justify-start">
              <RemoveStudent offerId={offerId}/>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default StudentOptions
