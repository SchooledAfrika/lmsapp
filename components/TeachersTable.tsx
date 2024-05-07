import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Image from "next/image";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";


const TeachersType = [
  {
    id: "1",
    icon: "/teacher-img.png",
    name: "Odo Maurice O",
    mail: "odo@gmail.com",
    phone: "+2349130893924",
    subject: "Mathematics, English, Accounting",
    Grade: "Grade 10, Grade 11, & Grade 12",

    Added: "April 20, 2024",
    active: "Active",
    status: "Teacher",
    options: "...",
  },
  {
    id: "2",
    icon: "/tutors.jpg",
    name: "Augustine David",
    mail: "odo@gmail.com",
    phone: "+2349130893924",
    subject: "Mathematics, English, Accounting",
    Grade: "Grade 10, Grade 11, & Grade 12",
    Added: "April 20, 2024",
    pending: "pending",
    status: "Teacher",
    options: "...",
  },
];

export default function TeachersTable() {
  return (
    <Table className="bg-white overflow-x-auto    rounded-md mt-12">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="sm:w-[100px] w-full">Contact</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Grade</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {TeachersType.map((Teacher) => (
          <TableRow key={Teacher.id} className="">
            <TableCell className="font-semibold text-[14px] w-[300px] sm:w-full flex  mr-1">
              <Image
                src={Teacher.icon}
                alt="icon"
                width={100}
                height={100}
                className="w-[60px] h-[60px] rounded-md mr-1"
              />{" "}
              <div className="flex ml-1 flex-col">
                <div>{Teacher.name}</div>
                <div className="flex  mt-2 justify-between">
                  <p
                    className={`${
                      Teacher.active
                        ? "text-[11px] px-[20px] py-[5px] rounded-md mr-3 bg-lightGreen text-white"
                        : "text-[11px] px-[20px] py-[5px] rounded-md mr-3 bg-gold text-white"
                    }`}
                  >
                    {Teacher.active || Teacher.pending}
                  </p>
                  <p className="text-[12px] px-[20px] py-[5px]   rounded-md bg-dimOrange text-white">
                    {Teacher.status}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell className="sm:w-[200px] w-[300px]">
              <div className="flex flex-col">
                <p className="inline mb-2">
                  <FaEnvelope className="inline mr-1 " />
                  {Teacher.mail}
                </p>
                <p className="inline">
                  <FaPhoneAlt className="inline mr-1" />
                  {Teacher.phone}
                </p>
              </div>
            </TableCell>
            <TableCell className="sm:w-[100px] w-[300px]">{Teacher.subject}</TableCell>

            <TableCell className="sm:w-[100px] w-[300px]">{Teacher.Grade}</TableCell>
            <TableCell className="sm:w-[200px] w-[300px]">{Teacher.Added}</TableCell>
            <TableCell className="text-right mr-2 text-3xl text-lightGreen cursor-pointer">
              {Teacher.options}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
