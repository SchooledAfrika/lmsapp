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
import Link from "next/link";
import TeacherOptions from "./TeacherOptions";

const SinglePaymentType = [
  {
    id: "1",
    icon: "/noavatar.png",
    name: "Maurice Odo",
    email: "odo@gmail.com",
    accountNo: "3067459507",
    bank: "Firstbank",
    amount: "$7000",
    paymentDate: "14-07-2024",
  },
  {
    id: "2",
    icon: "/noavatar.png",
    name: "David Augustine",
    email: "david@gmail.com",
    accountNo: "106379507",
    bank: "Fidelity",
    amount: "$4000",
    paymentDate: "01-07-2024",
  },
  {
    id: "3",
    icon: "/noavatar.png",
    name: "Sarah Adebayor",
    email: "sarah@gmail.com",
    accountNo: "2133446773",
    bank: "UBA",
    amount: "$3000",
    paymentDate: "02-06-2024",
  },
];

const SingleTeacherPaymentComplete = () => {
  return (
    <div>
      <Table className="bg-white overflow-x-auto rounded-md mt-12">
        <TableHeader>
          <TableRow>
            <TableHead className="text-[12px] w-[100px] text-left p-2">
              Teacher
            </TableHead>
            <TableHead className="text-[12px] text-left p-2">
              Account Number
            </TableHead>
            <TableHead className="text-[12px] text-left p-2">Bank</TableHead>
            <TableHead className="text-[12px] text-left p-2">Amount</TableHead>
            <TableHead className="text-[12px] text-left p-2">Date</TableHead>
            <TableHead className="text-[12px] text-right p-2">
              Options
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {SinglePaymentType.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="text-[13px] md:w-[250px]  w-[150px] font-bold  flex items-center gap-2">
                <Image
                  src={payment.icon}
                  alt="icon"
                  width={25}
                  height={25}
                  className="w-[25px] h-[25px]"
                />
                <div className="flex flex-col space-y-1">
                  <p>{payment.name}</p>
                  <p className="font-normal">{payment.email}</p>
                </div>
              </TableCell>
              <TableCell className="text-[12px]  font-semibold p-2">
                {payment.accountNo}
              </TableCell>

              <TableCell className="text-[12px] font-semibold p-2">
                {payment.bank}
              </TableCell>
              <TableCell className="text-[13px]  font-semibold p-2">
                {payment.amount}
              </TableCell>
              <TableCell className="text-[13px]  font-semibold p-2">
                {payment.paymentDate}
              </TableCell>
              {/* <TableCell className="text-right text-[16px] text-lightGreen cursor-pointer p-2">
                <TeacherOptions/>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SingleTeacherPaymentComplete;
