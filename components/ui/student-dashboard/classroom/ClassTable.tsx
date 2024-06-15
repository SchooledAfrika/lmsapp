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
import { ClassOptions } from "../ClassOptions";
 
  const ClassroomType = [
    {
      id: "1",
      icon: "/maths.png",
      subject: "Mathematics",
      name: "Alpha",
      Grade: "Grade 12",
      
     
    },
    {
      id: "2",
      icon: "/govt.png",
      subject: "Government",
      name: "Diasy",
      Grade: "Grade 10",
     
     
    },
    
  ];
  
  export default function ClassTable() {
    return (
      <Table className="bg-white overflow-x-auto    rounded-md mt-12">
        <TableHeader>
          <TableRow>
            <TableHead className="text-[12px]">Subject</TableHead>
            <TableHead className="text-[12px]">Class Name</TableHead>
            <TableHead className="text-[12px]">Grade</TableHead>
            <TableHead className="text-right text-[12px]">Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ClassroomType.map((Class) => (
            <TableRow key={Class.id} className="">
              <TableCell className="font-bold flex py-4 text-[13px] items-center mr-3">
                <Image
                  src={Class.icon}
                  alt="icon"
                  width={100}
                  height={100}
                  className="w-[50px] h-[50px] mr-1"
                />
                {Class.subject}
              </TableCell>
              <TableCell className="text-[12px]  font-semibold">{Class.name}</TableCell>
              <TableCell className="text-[12px]  font-semibold">{Class.Grade}</TableCell>
             
  
              <TableCell className="flex justify-end items-center  pr-3 text-[14px]  text-lightGreen cursor-pointer">
                <ClassOptions/>
              
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  