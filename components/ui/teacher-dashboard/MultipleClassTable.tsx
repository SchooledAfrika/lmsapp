import {
    Table,
    TableBody,
    TableCell,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
 
  
  import Image from "next/image";
import { FaEllipsisH } from "react-icons/fa";
import Link from "next/link";
import { MultipleClass } from "./MultipleClass";
  
  const MultipleType = [
    {
      id: "1",
      icon: "/teacher1.jpg",
      name: "Alex Iwobi Samuel",
      status: "Active",
      date: "April 20, 2024",
      session: "2"
      
    },
    {
      id: "2",
      icon: "/parent1.jpg",
      name: "Alex Iwobi Samuel",
      status: "Active",
      date: "April 20, 2024",
      session: "2"
    },
    {
        id: "3",
        icon: "/tutors.jpg",
        name: "Alex Iwobi Samuel",
        status: "Active",
       date: "April 20, 2024",
       session: "2"
      },
  ];
  
  export default function MultipleClassTable() {
    return (
      <Table className="bg-white overflow-x-auto   rounded-md my-12">
        <TableCaption className="px-3  py-3 rounded-md bg-white">
            <div className="flex font-semibold  justify-between">
                <p className="text-black">Students</p> 
                
            </div>
           
          </TableCaption>
        
        <TableHeader>
           
            <TableRow className="mt-0 text-[12.5px]">

            <TableHead>Name</TableHead>
            <TableHead className="">Start Date</TableHead>
            <TableHead className="">Sessions Attended</TableHead>
            <TableHead className="text-right">Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {MultipleType.map((Multiple) => (
            <TableRow key={Multiple.id} className="">
              <TableCell className="font-semibold w-[200px] text-[13px] flex  mr-1">
                <Image
                  src={Multiple.icon}
                  alt="icon"
                  width={100}
                  height={100}
                  className="w-[40px] h-[40px] mt-2 rounded-md mr-1"
                />{" "}
                <div className="flex ml-1 flex-col">
                  <div className="text-[12px]">{Multiple.name}</div>
                  <div className="flex  mt-1 justify-between">
                    <p
                      className={`${
                        Multiple.status
                          ? "text-[10px] px-[10px] py-[2px] rounded-md mr-3 bg-lightGreen text-white"
                          : ""
                      }`}
                    >
                      {Multiple.status}
                    </p>
                    
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-[12px] font-semibold">{Multiple.date}</TableCell>
              <TableCell className="text-[12px] font-semibold">{Multiple.session}</TableCell>
              <TableCell className="text-[14px] text-lightGreen cursor-pointer   font-semibold">
                <MultipleClass/>
              </TableCell>
              
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  