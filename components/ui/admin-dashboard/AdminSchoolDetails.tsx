import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminSchoolDetails = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold text-[25px]">School Information</p>
          <span>More about schools</span>
        </div>
      </div>
      <>
        <p className="mt-5 bg-gray-200 text-[14px] p-2 rounded">Details</p>
      </>

      <Table className="bg-white overflow-x-auto rounded-md my-6">
        <TableHeader>
          <TableRow className="text-[14px]">
            <TableHead className="">School Name:</TableHead>
            <TableCell className="font-bold">
              Abu Bin Maurice Secondary School
            </TableCell>
          </TableRow>
          <TableRow className="text-[14px]">
            <TableHead className="">Email:</TableHead>
            <TableCell className="font-bold">info@gmail.com</TableCell>
          </TableRow>
          <TableRow className="text-[14px]">
            <TableHead className="">Course:</TableHead>
            <TableCell className="font-bold">UI/UX Adobe</TableCell>
          </TableRow>
          <TableRow className="text-[14px]">
            <TableHead className="">Phone Number:</TableHead>
            <TableCell className="font-bold">+2283628352</TableCell>
          </TableRow>
          <TableRow className="text-[14px]">
            <TableHead className="">Date of Registration:</TableHead>
            <TableCell className="font-bold">29th Feb, 1999</TableCell>
          </TableRow>
          <TableRow className="text-[14px]">
            <TableHead className="">Name of Country:</TableHead>
            <TableCell className="font-bold">Japan</TableCell>
          </TableRow>
          <TableRow className="text-[14px]">
            <TableHead className="">Address:</TableHead>
            <TableCell className="font-bold">
              Allen Ajegunle Ikeja, Tokyo Japan
            </TableCell>
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  );
};

export default AdminSchoolDetails;
