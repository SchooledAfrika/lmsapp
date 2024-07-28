import React from "react";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { IExamSubSub } from "./TestType";

const TestFinalization: React.FC<IExamSubSub> = ({ getValues }) => {
  return (
    <div className="flex flex-col  mt-[40px] md:mt-[0] w-full md:w-3/5 cursor-not-allowed">
      <span className="font-bold text-[18px]">Set up your Test !</span>
      <div className="bg-[#FFFFFF] py-3 px-8 rounded-[8px] mt-4">
        <span className="font-bold text-[14px]">Test Summary</span>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Total Questions</TableHead>
              <TableHead className="px-8 text-center">Duration</TableHead>
              <TableHead>Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-center">
                {getValues("test").length}
              </TableCell>
              <TableCell className="px-8 text-center">
                {getValues("duration")} mins
              </TableCell>
              <TableCell>{getValues("grade")}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="flex w-full items-center justify-center">
          <div className=" px-4 py-3 bg-green-700 text-white rounded-md">
            <p>this is the summary of your exams</p>
            <p>please go through this before submission</p>
            <p>thanks!!! best regards schoolAfrika</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestFinalization;
