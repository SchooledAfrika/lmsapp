import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { FaEllipsisH } from "react-icons/fa";
import { ListCollapse } from "lucide-react";
import Link from "next/link";
import RemoveTeacher from "./RemoveTeacher";

interface Idelete {
  offerId: string;
}

const TeacherOptions: React.FC<Idelete> = ({ offerId }) => {
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
              <Link href={`/school-dashboard/teachers/${offerId}`}>
                <p className="inline text-[14px]  font-semibold">
                  <ListCollapse className="inline w-4 h-4 mr-2 ml-0 text-lightGreen" />
                  Details
                </p>
              </Link>
            </div>
            <hr className="bg-black" />
            <div className="flex justify-start">
              <RemoveTeacher offerId={offerId} />
            </div>
            <hr className="bg-black" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TeacherOptions;
