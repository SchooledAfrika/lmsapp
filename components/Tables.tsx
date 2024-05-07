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
    name: "Mathematics Class",
    subject: "Mathematics $ Further Maths",
    Grade: "Grade 12",
    TeacherInitial: ["0Y", "OM", "JP"],

    students: "0",
    options: "...",
  },
  {
    id: "2",
    icon: "/govt.png",
    name: "Government Class",
    subject: "Government",
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
          <TableHead>Name</TableHead>
          <TableHead className="w-[100px]">Subject</TableHead>
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
              {Class.name}
            </TableCell>
            <TableCell>{Class.subject}</TableCell>
            <TableCell>{Class.Grade}</TableCell>
            <TableCell
              className={`${
                Class.TeacherInitial
                  ? ""
                  : " border-lightGreen cursor-pointer text-lightGreen rounded-xl"
              }`}
            >
              {Class.TeacherInitial || <AssignDialog/>}
            </TableCell>

            <TableCell>{Class.students}</TableCell>
            <TableCell className="flex justify-end text-[14px]  text-lightGreen cursor-pointer">
             <OptionsDialog/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
