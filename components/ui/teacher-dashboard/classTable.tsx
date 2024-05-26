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
  import { IndividualClass } from "./IndividualClass";
import { SingleClassOptions } from "./SingleClassOptions";
import { MultipleClass } from "./MultipleClass";
//   import { AssignDialog } from "./AssignDialog";
  const ClassroomType = [
    {
      id: "1",
      icon: "/maths.png",
      subject: "Mathematics",
      name: "Alpha",
      Grade: "Grade 12",
      Teacher: "JP",
      Students: "0"
     
    },
    {
      id: "2",
      icon: "/govt.png",
      subject: "Government",
      name: "Diasy",
      Grade: "Grade 10",
      Teacher: "JP",
      Students: "0",
     
    },
    {
        id: "3",
        icon: "/chem.png",
        subject: "Chemistry",
        name: "Beta",
        Grade: "Grade 11",
        TeacherGroup: ["JP", " ", "OM", " ", "OY"],
        Students: "0",
       
      },
  ];
  
  export default function ClassTable() {
    return (
      <Table className="bg-white overflow-x-auto    rounded-md mt-12">
        <TableHeader>
          <TableRow>
            <TableHead className="text-[12px]">Subject</TableHead>
            <TableHead className="md:w-[100px] text-[12px]">Class Name</TableHead>
            <TableHead className="text-[12px]">Grade</TableHead>
            <TableHead className="text-[12px]">Teacher</TableHead>
            <TableHead className="text-[12px]">Students</TableHead>
            <TableHead className="text-right text-[12px]">Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ClassroomType.map((Class) => (
            <TableRow key={Class.id} className="">
              <TableCell className="font-bold flex md:w-full w-[200px] text-[13px] items-center mr-3">
                <Image
                  src={Class.icon}
                  alt="icon"
                  width={100}
                  height={100}
                  className="w-[40px] h-[40px] mr-1"
                />
                {Class.subject}
              </TableCell>
              <TableCell className="text-[12px]  font-semibold">{Class.name}</TableCell>
              <TableCell className="text-[12px]  font-semibold">{Class.Grade}</TableCell>
              <TableCell
                className=""
              >

                   
                <div  className={`${
                      Class.Teacher
                        ? "rotate-[45deg] text-[12px] w-[33px] rounded-[5px] py-2 pl-2 pr-6 mx-auto  font-bold  bg-dimOrange"
                        :  "font-bold mx-auto text-[12px]"
                    }`} >
                   {Class.Teacher || Class.TeacherGroup} 
                </div>
               
              </TableCell>
  
              <TableCell className="text-[13px]  font-semibold">{Class.Students}</TableCell>
              <TableCell className="flex justify-end items-center text-[14px]  text-lightGreen cursor-pointer"> { Class.Teacher ? <IndividualClass/> : <MultipleClass/>}
              
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  