

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Image from "next/image";
import { StudentOptions } from "./StudentOptions";
import { TableSkeleton } from "@/components/TableSkeleton";
import { useParams } from "next/navigation";

const StudentsType = [
  {
    id: "1",
    icon: "/teacher-img.png",
    name: "Alex Iwobi Samuel",
    classrooms: "Alpha",
    active: "Active",
    status: "Student",
  },
  {
    id: "2",
    icon: "/tutors.jpg",
    name: "Cole Palmer",
    classrooms: "Beta",
    pending: "pending",
    status: "Student",
    accept: "Accept",
    reject: "Reject",
  },
];

export default function StudentsTable() {
  
 
  
  return (
    <Table className="bg-white overflow-x-auto    rounded-md mt-12">
      <TableHeader>
        <TableRow>
          <TableHead className="text-[12px]">Name</TableHead>
          <TableHead className="text-[12px] ">Class</TableHead>
          <TableHead className="text-right text-[12px]">Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {StudentsType.map((Student) => (
          <TableRow key={Student.id} className="">
            <TableCell className="font-semibold w-[230px] text-[14px]  flex  mr-1">
              <Image
                src={Student.icon}
                alt="icon"
                width={100}
                height={100}
                className="w-[50px] h-[50px] rounded-md mr-1"
              />{" "}
             
                <div className="text-[13px] ml-1 flex items-center font-bold">{Student.name}</div>
               
             
            </TableCell>

            <TableCell className="text-[12.5px] font-semibold">
              {Student.classrooms}
            </TableCell>

            <TableCell className="float-right   text-[16px]  text-lightGreen cursor-pointer">
             
                <StudentOptions />
              
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
