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
import CoursesOptions from './CoursesOptions';


const SingleParentType = [
    {
      id: "1",
      icon: "/mathematics.png",
      subject:"Mathematics",
      ward: "Okoye Emmanuel",
      class: "Alpha",
      grade: "Grade 2",
      joined: "20-06-2023"
      
    },
    {
      id: "2",
      icon: "/government.png",
      subject:"Government",
      ward: "Adetoyin Oluwatobi",
      class: "Beta",
      grade: "Grade 10",
      joined: "30-05-2024"
    },
    {
        id: "3",
        icon: "/literature.png",
        subject:"Literature",
        ward: "Yusuf Abubakir",
        class: "Omicron",
        grade: "Grade 11",
        joined: "10-10-2024"
      },
  ];
  

const SingleParentCourses = () => {
  return (
    <div>
        <Table className="bg-white overflow-x-auto rounded-md mt-12">
      <TableHeader>
        <TableRow>
          <TableHead className="text-[12px] w-[100px] text-left p-2">Subject</TableHead>
          <TableHead className="text-[12px] text-left p-2">Class</TableHead>
          <TableHead className="text-[12px] text-left p-2">Grade</TableHead>
          <TableHead className="text-[12px] text-left p-2">Ward</TableHead>
          <TableHead className="text-[12px] text-left p-2">Joined</TableHead>
          <TableHead className="text-[12px] text-right p-2">Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {SingleParentType.map((Parent) => (
            <TableRow key={Parent.id}>
              <TableCell className="text-[13px] md:w-[250px]  w-[150px] font-bold  flex items-center gap-2">
                <Image
                  src={Parent.icon}
                  alt="icon"
                  width={25}
                  height={25}
                  className="w-[25px] h-[25px]"
                />
                {Parent.subject}
              </TableCell>
              <TableCell className="text-[12px]  font-semibold p-2">
                {Parent.class}
              </TableCell>
              <TableCell className="text-[12px]  font-semibold p-2">
                {Parent.grade}
              </TableCell>
             
              <TableCell className="text-[12px] font-semibold p-2">
                {Parent.ward}
              </TableCell>
              <TableCell className="text-[13px]  font-semibold p-2">
                {Parent.joined}
              </TableCell>
              <TableCell className="text-right text-[16px] text-lightGreen cursor-pointer p-2">
                <CoursesOptions/>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
    </div>
  )
}

export default SingleParentCourses