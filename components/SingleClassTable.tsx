import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IouterStudent } from "./SingleClassroom";
import { useConversion } from "@/data-access/conversion";
import Image from "next/image";
import { FaEllipsisH } from "react-icons/fa";
import React from "react";

const SingleClassTable: React.FC<{
  students: IouterStudent[];
}> = ({ students }) => {
  const { handleDate } = useConversion();
  return (
    <Table className="bg-white overflow-x-auto    rounded-md mt-6 mb-12">
      <TableHeader>
        <p className="px-3 py-2 font-bold text-base">Students</p>
        <TableRow className="text-[13px]">
          <TableHead>Name</TableHead>
          <TableHead className="">Start Date</TableHead>
          <TableHead className="">Sessions Attended</TableHead>
          <TableHead className="text-right">Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student, index) => (
          <TableRow key={index} className="">
            <TableCell className="font-semibold w-[250px] text-[12px] flex  mr-1">
              <Image
                src={student.student.profilePhoto}
                alt="icon"
                width={100}
                height={100}
                className="w-[60px] h-[60px] rounded-md mr-1"
              />{" "}
              <div className="flex ml-1 flex-col">
                <p className=" font-semibold">{student.student.name}</p>
                <div className="flex  mt-2 justify-between">
                  <p
                    className={`${"text-[11px] px-[25px] py-[5px] rounded-md mr-3 bg-lightGreen text-white"}`}
                  >
                    Active
                  </p>
                </div>
              </div>
            </TableCell>

            <TableCell className="text-[12px] font-semibold">
              {handleDate(student.createdAt)}
            </TableCell>
            <TableCell className="text-[12px] font-semibold">N/A</TableCell>
            <TableCell className="float-right text-[16px]   text-lightGreen cursor-pointer">
              <FaEllipsisH className="ml-3" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SingleClassTable;
