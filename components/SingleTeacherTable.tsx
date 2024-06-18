import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
 
  
  import Image from "next/image";
import { FaEllipsisH } from "react-icons/fa";
  
  const SingleTeacherType = [
    {
      id: "1",
      icon: "/pin.png",
      link: "docs.google.com/History of Economics/...",
      author: "Maurice Odo",
      grade: "Grade 1",
      timeUploaded: "2:30pm",
      date: "July 15, 2024"
      
    },
    {
      id: "2",
      icon: "/green-book.png",
      title: "Macbeth",
      author: "William Shakespeare",
      grade: "Grade 4",
      timeUploaded: "3:30pm",
      date: "May 16, 2024"
    },
    {
        id: "3",
        icon: "/green-book.png",
        title: "Onwards and forwards",
        author: "Sarah Adebayor",
        grade: "Grade 8",
        timeUploaded: "4:30pm",
        date: "March 15, 2024"
      },
  ];
  
  export default function SingleTeacherTable() {
    return (
      <Table className="bg-white overflow-x-auto    rounded-md my-12">
        
        <TableHeader>
            <p className="px-3 py-2 font-bold text-base">Tests & Resources</p>
            
          <TableRow className="text-[13px]">

            <TableHead>Title</TableHead>
            <TableHead className="">Author</TableHead>
            <TableHead className="">Grade</TableHead>
            <TableHead className="">Time Uploaded</TableHead>
            <TableHead className="">Date</TableHead>
           
          </TableRow>
        </TableHeader>
        <TableBody>
          {SingleTeacherType.map((Teacher) => (
            <TableRow key={Teacher.id} className="">
              <TableCell className="font-semibold text-[12px] flex  mr-1">
                <Image
                  src={Teacher.icon}
                  alt="icon"
                  width={100}
                  height={100}
                  className="w-[40px] h-[40px] rounded-md mr-1"
                />{" "}
                <div className="flex ml-1 flex-col">
                  <div className={`${
                Teacher.link
                  ? "cursor-pointer text-blue-400 underline"
                  : "text-black"
              }`}>{Teacher.title || Teacher.link}</div>
                 
                </div>
              </TableCell>
             
              <TableCell className="text-[12px] font-semibold">{Teacher.author}</TableCell>
              <TableCell className="text-[12px] font-semibold">{Teacher.grade}</TableCell>
              <TableCell className="text-[12px] font-semibold">{Teacher.timeUploaded}</TableCell>
              <TableCell className="text-[12px] font-semibold">{Teacher.date}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  