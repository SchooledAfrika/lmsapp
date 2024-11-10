import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaEllipsisH } from "react-icons/fa";
import Link from "next/link";
import { ListCollapse } from "lucide-react";
import RemoveClass from "./RemoveClass";
import { AssignStudent } from "./AssignStudent";
import { IstudentClass } from "./Tables";
import { useQuery } from "@tanstack/react-query";

export interface IActiveStudent {
  createdAt: string;
  student: {
    name: string;
    email: string;
    profilePhoto: string;
    id: string;
  };
}

interface Iinfo {
  classId: string;
  setShowStudent: React.Dispatch<React.SetStateAction<boolean>>;
  subject: string;
  SchoolClassStudent: IstudentClass[];
  showStudent: boolean;
}

const OptionsDialog: React.FC<Iinfo> = ({
  classId,
  setShowStudent,
  subject,
  SchoolClassStudent,
  showStudent,
}) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["active-students"],
    queryFn: async () => {
      const response = await fetch("/api/class-student");
      const result = await response.json();
      return result;
    },
  });
  if (isLoading) {
    <div>
      <p>Loading...</p>
    </div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  const activeStudent: IActiveStudent[] = data;
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
              <Link href={`/school-dashboard/classroom/${classId}`}>
                <p className="inline text-[14px]  font-semibold">
                  <ListCollapse className="inline ml-0 w-4 h-4 mr-2 text-lightGreen" />
                  Details
                </p>
              </Link>
            </div>
            <hr className="bg-black" />
            <div className="flex justify-start">
              <RemoveClass classId={classId} />
            </div>
            <hr className="bg-black" />
            <div
              onClick={() => {
                setShowStudent(true);
              }}
            >
              <AssignStudent
                subject={subject}
                showStudent={showStudent}
                setShowStudent={setShowStudent}
                activeStudent={activeStudent}
                SchoolClassStudent={SchoolClassStudent}
                classId={classId}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default OptionsDialog;
