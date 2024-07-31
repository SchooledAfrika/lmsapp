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
import { Button } from "./ui/button";

const TestFinalization = () => {
  return (
    <div className="flex flex-col pl-[0] mt-[40px] md:mt-[0]">
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
              <TableCell className="text-center">10</TableCell>
              <TableCell className="px-8 text-center">30 (Minutes)</TableCell>
              <TableCell>Grade 11</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="flex items-center gap-10 pl-[20px] my-[40px]">
          <div>
            <p className="font-medium pb-3 text-[12px]">Start Date</p>
            <span className="font-bold text-[14px]">April 22, 2024</span>
          </div>
          <div>
            <p className="font-medium pb-3 text-[12px]">End Date</p>
            <span className="font-bold text-[14px]">April 22, 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestFinalization;
