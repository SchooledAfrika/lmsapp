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
      icon: "/maths.png",
      name: "Mathematics Class",
      markObtained: "70/100",
      gradeRemarks: "Excellent",
      
    },
    {
      id: "2",
      icon: "/govt.png",
      name: "Government Class",
      markObtained: "40/100",
      gradeRemarks: "Fair",
    },
    {
        id: "3",
        icon: "/crs.png",
        name: "C.R.S Class",
        markObtained: "70/100",
        gradeRemarks: "Excellent",
      },
  ];
  
  export default function SingleStudentTable() {
    return (
      <Table className="bg-white overflow-x-auto    rounded-md my-12">
        
        <TableHeader>
            <p className="px-3 py-2 font-bold text-base">Assessment Records</p>
            
          <TableRow>

            <TableHead>Subject</TableHead>
            <TableHead className="">Mark Obtained</TableHead>
            <TableHead className="">Grade Remarks</TableHead>
           
          </TableRow>
        </TableHeader>
        <TableBody>
          {SingleTeacherType.map((Teacher) => (
            <TableRow key={Teacher.id} className="">
              <TableCell className="font-semibold text-[14px] flex  mr-1">
                <Image
                  src={Teacher.icon}
                  alt="icon"
                  width={100}
                  height={100}
                  className="w-[40px] h-[40px] rounded-md mr-1"
                />{" "}
                <div className="flex ml-1 flex-col">
                  <div>{Teacher.name}</div>
                 
                </div>
              </TableCell>
             
              <TableCell className="">{Teacher.markObtained}</TableCell>
              <TableCell className="">{Teacher.gradeRemarks}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  