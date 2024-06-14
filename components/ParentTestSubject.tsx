import React from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "./ui/button";

const ParentTestSubject = () => {
  return (
    <section>
      <div className="flex items-center px-4 pt-3 pb-2 gap-3 ">
        <Image
          src="/svgs/calculate.svg"
          width={30}
          height={30}
          alt="Calculator"
        />
        <span className="font-bold text-[14px]">Mathematics</span>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Test Title</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Module 1 Test</TableCell>
              <TableCell>Grade 11</TableCell>
              <TableCell>25 Minutes</TableCell>
              <TableCell>1:25PM</TableCell>
              <TableCell>1:44PM</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="flex items-center gap-10 pl-[20px] my-[20px] md:my-[40px]">
          <div>
            <p className="font-medium pb-4 text-[12px] md:text-[14px]">
              No of Questions
            </p>
            <span className="font-bold text-[14px]">10</span>
          </div>
          <div>
            <p className="font-medium pb-4 text-[12px] md:text-[14px]">
              Highest Attainable Score
            </p>
            <span className="font-bold text-[14px]">10</span>
          </div>
          <div>
            <p className="font-medium pb-4 text-[12px] md:text-[14px]">Score</p>
            <span className="font-bold text-[14px]">80%</span>
          </div>
        </div>

        <Link href="/parents-dashboard/assessment/test">
          <Button className="ml-4 bg-secondary text-white text-[12px] py-3 mr-0 md:mr-6">
            View Result
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ParentTestSubject;
