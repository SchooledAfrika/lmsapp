"use client";
import React from "react";

import { useQuery, useQueries } from "@tanstack/react-query";
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

interface Ipending{
  dataId: string;
  name: string;
  email: string;
  bankName : string;
  photo: string;
  accountName: string;
  accountNo : string;
}


  

const SingleTeacherPaymentPending: React.FC<Ipending> = ({dataId, photo, name, email, bankName, accountName, accountNo}) => {
  

  console.log(dataId);
  return (
    <div>
        <Table className="bg-white overflow-x-auto rounded-md mt-12">
      <TableHeader>
        <TableRow>
          <TableHead className="text-[12px] w-[100px] text-left p-2">Teacher</TableHead>
          <TableHead className="text-[12px] text-left p-2">Account Number</TableHead>
          <TableHead className="text-[12px] text-left p-2">Bank</TableHead>
          <TableHead className="text-[12px] text-left p-2">Pending Amount</TableHead>
          <TableHead className="text-[12px] text-right p-2">Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
            <TableRow>
              <TableCell className="text-[13px] md:w-[250px]  w-[150px] font-bold  flex items-center gap-2">
                <Image
                  src={photo}
                  alt="icon"
                  width={25}
                  height={25}
                  className="w-[25px] h-[25px] rounded-md"
                />
                <div className='flex flex-col space-y-1'>
                  <p>{name}</p>
                  <p className='font-normal'>{email}</p>
                </div>
                
              </TableCell>
              <TableCell className="text-[12px]  font-semibold p-2">
                {bankName}
              </TableCell>
             
              <TableCell className="text-[12px] font-semibold p-2">
                {accountName}
              </TableCell>
              <TableCell className="text-[13px]  font-semibold p-2">
                {accountNo}
              </TableCell>
              <TableCell className="text-right text-[16px] text-lightGreen cursor-pointer p-2">
                <PaymentOptions/>
              </TableCell>
            </TableRow>
         
      </TableBody>
    </Table>
    </div>
  )
}

export default SingleTeacherPaymentPending