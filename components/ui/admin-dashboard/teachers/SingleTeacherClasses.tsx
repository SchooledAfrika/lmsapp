"use client";
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
import ViewSingleClasses from "./ViewSingleClasses";

interface ISingleTeacher {
  dataId: string;
  classes: string[];
}

const SingleTeacherClasses: React.FC<ISingleTeacher> = ({
  dataId,
  classes,
}) => {
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
              Student Capacity
            </TableHead>
            <TableHead className="text-[12px] text-right p-2">
              More Info
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classes.map((singleClass: any, index) => (
            <TableRow key={index}>
              <TableCell className="text-[13px] md:w-[250px]  w-[150px] font-bold  flex items-center gap-2">
                <Image
                  src={singleClass.classBanner}
                  alt="icon"
                  width={25}
                  height={25}
                  className="w-[25px] h-[25px] rounded-md"
                />
                {singleClass.subject}
              </TableCell>
              <TableCell className="text-[12px]  font-semibold p-2">
                {singleClass.className}
              </TableCell>

              <TableCell className="text-[12px] font-semibold p-2">
                {singleClass.grade}
              </TableCell>
              <TableCell className="text-[13px]  font-semibold p-2">
                {singleClass.maxCapacity}
              </TableCell>
              <TableCell className="text-right text-[16px] text-lightGreen cursor-pointer p-2">
                <ViewSingleClasses
                  dataId={singleClass.id}
                  duration={singleClass.duration}
                  starts={singleClass.classStarts}
                  ends={singleClass.classEnds}
                  time={singleClass.classTime}
                  schedules={singleClass.schedules}
                  studentIDs={singleClass.studentIDs}
                  price={singleClass.price}
                  rating={singleClass.rating}
                  resourceIds={singleClass.resourceIds}
                  publicClass={singleClass.publicClass}
                  maxCapacity={singleClass.maxCapacity}
                  currentCapacity={singleClass.currentCapacity}
                  createdAt={singleClass.createdAt}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SingleTeacherClasses;
