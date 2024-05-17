import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
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
    subject: "Mathematics Class",
    name: "Daisy",
    Grade: "Grade 12",
    TeacherInitial: ["0Y", "OM", "JP"],

    students: "0",
    options: "...",
  },
  {
    id: "2",
    icon: "/govt.png",
    subject: "Government Class",
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
          <TableHead>Subject</TableHead>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Grade</TableHead>
          <TableHead>Teacher</TableHead>
          <TableHead>Students</TableHead>
          <TableHead className="text-right">Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ClassroomType.map((Class) => (
          <TableRow key={Class.id} className="">
            <TableCell className="font-semibold flex mr-3">
              <Image
                src={Class.icon}
                alt="icon"
                width={100}
                height={100}
                className="w-[30px] h-[30px] mr-1"
              />
              {Class.subject}
            </TableCell>
            <TableCell className="text-[13px] font-semibold">{Class.name}</TableCell>
            <TableCell className="text-[13px] font-semibold">{Class.Grade}</TableCell>
            <TableCell
              className={`${
                Class.TeacherInitial
                  ? ""
                  : " border-lightGreen cursor-pointer text-[13px] font-semibold text-lightGreen rounded-xl"
              }`}
            >
              {Class.TeacherInitial || <AssignDialog/>}
            </TableCell>

            <TableCell className="text-[13px] font-semibold">{Class.students}</TableCell>
            <TableCell className="flex justify-end text-[14px]  text-lightGreen cursor-pointer">
             <OptionsDialog/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
