import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import Image from "next/image"
import Link from "next/link"
import PaymentOptions from './PaymentOptions';


const SinglePaymentType = [
    {
      id: "1",
      icon: "/mathematics.png",
      subject:"Mathematics",
      offer: "Homework Support",
      class: "Alpha",
      grade: "Grade 2",
      ward: "Emenike Emmanuel",
      Amount: "$1000",
      startDate: "25-01-2024",
      endDate: "25-03-2024",
      
    },
    {
      id: "2",
      icon: "/government.png",
      subject:"Government",
      offer: "1 on 1 session",
      class: "Daisy",
      grade: "Grade 6",
      ward: "Adenike Ibrahim",
      Amount: "$500",
      startDate: "05-01-2024",
      endDate: "20-03-2024",
    },
    {
        id: "3",
        icon: "/literature.png",
        subject:"Literature",
        offer: "Group Session",
        class: "Alpha",
        grade: "Grade 5",
        ward: "Sultan Yusuf",
        Amount: "$3000",
        startDate: "25-01-2024",
        endDate: "05-06-2024",
      },
  ];
  

const Payments = () => {
  return (
    <div>
        <Table className="bg-white overflow-x-auto rounded-md mt-12">
      <TableHeader>
        <TableRow>
          <TableHead className="text-[12px] w-[100px] text-left p-2">Subject</TableHead>
          <TableHead className="text-[12px] text-left p-2">Session</TableHead>
          <TableHead className="text-[12px] text-left p-2">Class</TableHead>
          <TableHead className="text-[12px] text-left p-2">Grade</TableHead>
          <TableHead className="text-[12px] text-left p-2">Ward</TableHead>
          <TableHead className="text-[12px] text-left p-2">Amount</TableHead>
          <TableHead className="text-[12px] text-right p-2">Options</TableHead>
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
                {payment.subject}
              </TableCell>
              <TableCell className="text-[12px]  font-semibold p-2">
                {payment.offer}
              </TableCell>
              <TableCell className="text-[12px]  font-semibold p-2">
                {payment.class}
              </TableCell>
             
              <TableCell className="text-[12px] font-semibold p-2">
                {payment.grade}
              </TableCell>
              <TableCell className="text-[13px]  font-semibold p-2">
                {payment.ward}
              </TableCell>
              <TableCell className="text-[12px]  font-semibold p-2">
                {payment.Amount}
              </TableCell>
              <TableCell className="text-right text-[16px] text-lightGreen cursor-pointer p-2">
                <PaymentOptions/>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
    </div>
  )
}

export default Payments