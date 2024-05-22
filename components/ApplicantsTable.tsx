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
import Link from "next/link";
import { Button } from "./ui/button";

const ApplicantType = [
  {
    id: "1",
    icon: "/teacher-img.png",
    name: "Cole Palmer",
    rating: "⭐ 4.7/5",
    mail: "Odomaurice@gmail.com",
    phone: "+234 912 7836 353",
    Added: "April 20, 2024",
    view: "View",
  },
  {
    id: "2",
    icon: "/tutors.jpg",
    name: "Michael Imodu",
    rating: "⭐ Unrated",
    mail: "Odomaurice@gmail.com",
    phone: "+234 912 7836 353",
    Added: "April 20, 2024",
    view: "View",
  },
];

export default function ApplicantsTable() {
  return (
    <Table className="bg-white overflow-x-auto rounded-md mt-6">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="sm:w-[100px] w-full">Contact</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ApplicantType.map((Applicant) => (
          <TableRow key={Applicant.id} className="">
            <TableCell className="font-semibold text-[14px] w-[200px] flex mr-1">
              <Image
                src={Applicant.icon}
                alt="icon"
                width={100}
                height={100}
                className="w-[60px] h-[60px] rounded-md mr-1"
              />{" "}
              <div className="flex ml-1 flex-col">
                <div>{Applicant.name}</div>
                {Applicant.rating}
              </div>
            </TableCell>
            <TableCell className="w-[250px]">
              <div className="flex flex-col">
                <p className="inline mb-2">
                  <FaEnvelope className="inline mr-1 " />
                  {Applicant.mail}
                </p>
                <p className="inline">
                  <FaPhoneAlt className="inline mr-1" />
                  {Applicant.phone}
                </p>
              </div>
            </TableCell>

            <TableCell className="w-[400px]">{Applicant.Added}</TableCell>
            <TableCell className="text-[11px] w-[10px] text-center">
              <Link href={"/school-dashboard/job-listing/applicant/details"}>
                <Button className="bg-secondary w-[60px] md:w-[100px] text-white text-[12px] py-3 my-3">
                  {Applicant.view}
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
