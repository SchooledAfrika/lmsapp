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

const TestResources = () => {
  return (
    <section>
      <div className="flex items-center px-4 pt-3 pb-2 gap-3 ">
        <Image src="/svgs/book.svg" width={30} height={30} alt="Calculator" />
        <span className="font-bold text-[14px]">
          How Europe underdeveloped Africa
        </span>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Author</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Upload Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Walter Rodney</TableCell>
              <TableCell>Grade 11</TableCell>
              <TableCell>Government</TableCell>
              <TableCell>April 22, 2024</TableCell>
              <TableCell>12:09pm</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="pl-[20px] my-[40px]">
          <p className="font-medium pb-4 text-[14px]">No of Views</p>
          <span className="font-bold text-[14px]">10</span>
        </div>

        <Link href={"/teachers-dashboard"} className="ml-4">
          <Button className="bg-secondary text-white text-[12px] py-5 my-3 mr-0 md:mr-6">
            View Resources
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default TestResources;
