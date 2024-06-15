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
      gradeRemarksPass: "Excellent",
      
    },
    {
      id: "2",
      icon: "/govt.png",
      name: "Government Class",
      markObtained: "40/100",
      gradeRemarksFail: "Fair",
    },
    {
        id: "3",
        icon: "/crs.png",
        name: "C.R.S Class",
        markObtained: "70/100",
        gradeRemarksPass: "Excellent",
      },
  ];
  
  export default function SingleSessionTable() {
    return (
      <Table className="bg-white overflow-x-auto    rounded-md my-3">
        
        <TableHeader>
            <p className="px-3 py-2 font-bold text-base">Assessment Records</p>
            
          <TableRow className="text-[13px]">

            <TableHead>Subject</TableHead>
            <TableHead className="">Mark Obtained</TableHead>
            <TableHead className="text-right">Grade Remarks</TableHead>
           
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {SingleTeacherType.map((Teacher) => (
            <TableRow key={Teacher.id} className="">
              <TableCell className="font-bold text-[13px] w-[250px] py-4 px-3 flex  mr-1">
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
             
              <TableCell className="text-[12px] font-semibold">{Teacher.markObtained}</TableCell>
              <TableCell className={`${
                      Teacher.gradeRemarksPass
                        ? "text-[12px] font-semibold text-right text-lightGreen px-3"
                        :  " text-right font-semibold text-red-500 px-3 text-[12px]"
                    }`}>{Teacher.gradeRemarksPass || Teacher.gradeRemarksFail}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  