import React from "react";
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
import TeacherOptions from "./TeacherOptions";

const SingleTeacherType = [
  {
    id: "1",
    icon: "/mathematics.png",
    subject: "Mathematics",
    class: "Alpha",
    grade: "Grade 2",
    students: "20",
  },
  {
    id: "2",
    icon: "/government.png",
    subject: "Government",
    class: "Beta",
    grade: "Grade 10",
    students: "30",
  },
  {
    id: "3",
    icon: "/literature.png",
    subject: "Literature",
    class: "Omicron",
    grade: "Grade 11",
    students: "10",
  },
];

const SingleTeacherClasses = () => {
  return (
    <div>
      <Table className="bg-white overflow-x-auto rounded-md mt-12">
        <TableHeader>
          <TableRow>
            <TableHead className="text-[12px] w-[100px] text-left p-2">
              Subject
            </TableHead>
            <TableHead className="text-[12px] text-left p-2">Class</TableHead>
            <TableHead className="text-[12px] text-left p-2">Grade</TableHead>
            <TableHead className="text-[12px] text-left p-2">
              Students
            </TableHead>
            <TableHead className="text-[12px] text-right p-2">
              Options
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {SingleTeacherType.map((Teacher) => (
            <TableRow key={Teacher.id}>
              <TableCell className="text-[13px] md:w-[250px]  w-[150px] font-bold  flex items-center gap-2">
                <Image
                  src={Teacher.icon}
                  alt="icon"
                  width={25}
                  height={25}
                  className="w-[25px] h-[25px]"
                />
                {Teacher.subject}
              </TableCell>
              <TableCell className="text-[12px]  font-semibold p-2">
                {Teacher.class}
              </TableCell>

              <TableCell className="text-[12px] font-semibold p-2">
                {Teacher.grade}
              </TableCell>
              <TableCell className="text-[13px]  font-semibold p-2">
                {Teacher.students}
              </TableCell>
              <TableCell className="text-right text-[16px] text-lightGreen cursor-pointer p-2">
                <TeacherOptions dataId="" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SingleTeacherClasses;
