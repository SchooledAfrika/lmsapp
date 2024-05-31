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
    <section>
      <Container>
        <div className="flex justify-between items-center mb-5">
          <span className="font-bold">Details</span>
          <Link
            href="/teacher-dashboard/test-and-resources"
            className="cursor-pointer"
          >
            <Image src="/closeAlt.svg" alt="cancel" width={15} height={15} />
          </Link>
        </div>
        <div className="flex flex-col md:flex-row  mb-[50px]">
          <div>
            <div className="flex gap-10">
              <span className="bg-[#359C71] px-[7px] rounded-full text-white">
                1
              </span>
              <p className="text-[#359C71] font-bold">Choose Type</p>
            </div>
            <p className="border-l-2 border-[#359C71] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#359C71] rounded-full px-[7px] text-white">
                2
              </span>
              <p className="text-[#359C71] font-bold">Test Paper</p>
            </div>
            <p className="border-l-2 border-[#359C71] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#359C71] rounded-full px-[7px] text-white">
                3
              </span>
              <p className="text-[#359C71] font-bold">Settings</p>
            </div>
            <p className="border-l-2 border-[#359C71] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#359C71] rounded-full px-[7px] text-white">
                4
              </span>
              <p className="text-[#359C71] font-bold">Finalization</p>
            </div>
          </div>
          <div className="flex flex-col pl-[0] md:pl-[100px] mt-[40px] md:mt-[0]">
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
                    <TableCell className="px-8 text-center">
                      30 (Minutes)
                    </TableCell>
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
            <Button className="bg-secondary w-full text-white text-[16px] px-6 py-7 my-5">
              Proceed
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TestFinalization;
