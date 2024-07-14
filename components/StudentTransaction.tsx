import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { MdOutlineContactSupport } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const StudentTransaction = () => {
  const TransactionType = [
    {
      id: "1",
      icon: "/teacher1.jpg",
      name: "Rotimi Wajabs",
      type: "Tuition Fee",
      teacher: "Teacher",
      date: "April 20, 2024",
      amount_add: "+$17.50",
    },
    {
      id: "2",
      icon: "/parent1.jpg",
      name: "Adeniran James",
      type: "Tuition Fee",
      teacher: "Teacher",
      date: "April 19, 2024",
      amount_add: "+$14.5",
    },
  ];

  return (
    <div className="md:flex md:flex-row  gap grid grid-cols-1 justify-between gap-6">
      <div className="flex  flex-6 flex-col">
        <Table className="bg-white overflow-x-auto    rounded-md my-4">
          <TableCaption className="px-3  py-3 rounded-md bg-white">
            <div className="flex font-semibold  justify-between">
              <p>Recent Transactions</p>
              <Link
                href="/"
                className="text-[11.5px] font-semibold text-right text-lightGreen "
              >
                View More
              </Link>
            </div>
          </TableCaption>

          <TableHeader>
            <TableRow className="mt-0 text-[12.5px]">
              <TableHead>Name</TableHead>
              <TableHead className="">Type</TableHead>
              <TableHead className="">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TransactionType.map((Transaction) => (
              <TableRow key={Transaction.id} className="">
                <TableCell className="font-semibold w-[200px] text-[13px] flex  mr-1">
                  <Image
                    src={Transaction.icon}
                    alt="icon"
                    width={100}
                    height={100}
                    className="w-[30px] h-[30px] mt-2 rounded-md mr-1"
                  />{" "}
                  <div className="flex ml-1 flex-col">
                    <div className="text-[12px]">{Transaction.name}</div>
                    <div className="flex justify-between">
                      <p className="text-[10px] py-[2px] px-[10px] rounded-md mr-3 bg-lightGreen text-white">
                        {Transaction.teacher}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-[12px] font-semibold">
                  {Transaction.type}
                </TableCell>
                <TableCell className="text-[12px] font-semibold">
                  {Transaction.date}
                </TableCell>
                <TableCell className="text-[12px] text-lightGreen font-semibold">
                  {Transaction.amount_add}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-4 font-subtext  text-sm w-full p-6  space-x-1  bg-white rounded-md">
        <div className="flex flex-col w-full justify-evenly">
          <div className="flex justify-between">
            <h3 className="font-bold text-[15px] ">Transaction Details</h3>
            <Button className="bg-lightGreen text-[12px] text-white">
              Export
            </Button>
          </div>

          <p className=" font-bold py-4">Payment Information</p>
          <div className="font-semibold text-[13px] pb-4 flex mr-1">
            <Image
              src="/teacher1.jpg"
              alt="icon"
              width={100}
              height={100}
              className="w-[40px] h-[40px] rounded-md mr-1"
            />{" "}
            <div className="flex ml-1 flex-col">
              <div className="text-[12px]">Rotimi Amaechi</div>
              <div className="flex  mt-1 justify-between">
                <p className="text-[10px] px-[10px] py-[2px] rounded-md mr-3 bg-lightGreen text-white">
                  Student
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between font-bold w-full pb-4 mt-2">
            <p className="text-[13px]">Payment Type</p>

            <p className="font-semibold text-[13px]">Tution Fee</p>
          </div>
          <div className="flex justify-between font-bold  mt-2">
            <p className="text-[13px]">Transaction ID</p>

            <p className="font-semibold text-red-500 text-[13px]">SA09786</p>
          </div>
          <div className="flex justify-between font-bold py-4 mt-2">
            <p className="text-[13px]">Subject</p>
            <div className="flex ">
              <Image
                src="/maths.png"
                alt=""
                width={100}
                height={100}
                className="w-[30px] mr-1  h-[30px]"
              />
              <p className="font-semibold text-[13px]">Mathematics</p>
            </div>
          </div>
          <div className="flex justify-between pb-2 font-bold">
            <p className="text-[13px]">Amount</p>

            <p className="font-semibold text-lightGreen text-[13px]">$17.50</p>
          </div>

          <hr className="my-1" />

          <div className="space-y-2 pt-2 font-header">
            <h3 className="font-bold">Need Help ?</h3>
            <p className="text-[13px]">
            Send us a message, we are one click away!
            </p>
            <Button
              asChild
              variant="outline"
              className="border font-bold border-lightGreen text-lightGreen hover:text-lightGreen"
            >
              <Link href="/">
                {" "}
                <MdOutlineContactSupport className="mr-2 text-[18px]" /> Contact
                Support
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTransaction;
