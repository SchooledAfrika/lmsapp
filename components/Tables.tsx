import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Image from "next/image";
import Link from "next/link";
import { OptionsDialog } from "./OptionsDialog";
import { AssignDialog } from "./AssignDialog";
const ClassroomType = [
  {
    id: "1",
    icon: "/maths.png",
    subject: "Mathematics",
    name: "Daisy",
    Grade: "Grade 12",
    TeacherInitial: ["0Y", "OM", "JP"],

    students: "0",
    options: "...",
  },
  {
    id: "2",
    icon: "/govt.png",
    subject: "Government",
    name: "Alpha",
    Grade: "Grade 10",
    assign: "Assign",
    students: "0",
    options: "...",
  },
];

export default function Tables() {
  return (
    <Table className="bg-white overflow-x-auto    rounded-md mt-12">
      <TableHeader>
        <TableRow>
          <TableHead className="text-[12px]">Subject</TableHead>
          <TableHead className=" text-[12px]">Name</TableHead>
          <TableHead className="text-[12px] w-[150px]">Grade</TableHead>
          <TableHead className="text-[12px]">Teacher</TableHead>
          <TableHead className="text-[12px]">Students</TableHead>
          <TableHead className="text-right text-[12px]">Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ClassroomType.map((Class) => (
          <TableRow key={Class.id} className="">
            <TableCell className="font-bold flex md:w-full w-[150px] text-[13px] items-center mr-3">
              <Image
                src={Class.icon}
                alt="icon"
                width={100}
                height={100}
                className="w-[50px] h-[50px] mr-1"
              />
              {Class.subject}
            </TableCell>
            <TableCell className="text-[13px]  font-semibold">{Class.name}</TableCell>
            <TableCell className="text-[13px] w-[150px]   font-semibold">{Class.Grade}</TableCell>
            <TableCell
              className={`${
                Class.TeacherInitial
                  ? "font-bold"
                  : " border-lightGreen   cursor-pointer text-[11px]  font-bold text-lightGreen rounded-xl"
              }`}
            >
              {Class.TeacherInitial || <AssignDialog/>}
            </TableCell>

            <TableCell className="text-[13px]  font-semibold">{Class.students}</TableCell>
            <TableCell className="  text-[16px] float-right pr-3  text-lightGreen cursor-pointer">
             <OptionsDialog/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
