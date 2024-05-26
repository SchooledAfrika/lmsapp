import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  
import Image from "next/image";
import { StudentOptions } from "./StudentOptions";
import { RejectStudent } from "./RejectStudent";
  
  const StudentsType = [
    {
      id: "1",
      icon: "/teacher-img.png",
      name: "Alex Iwobi Samuel",
      classrooms: "Alpha",
      active: "Active",
      status: "Student",
     
     
    },
    {
      id: "2",
      icon: "/tutors.jpg",
      name: "Cole Palmer",
      classrooms: "Beta",
      pending: "pending",
      status: "Student",
      accept: "Accept",
      reject: "Reject",
    },
  ];
  
  export default function StudentsTable() {
    return (
      <Table className="bg-white overflow-x-auto    rounded-md mt-12">
        <TableHeader>
          <TableRow>
            <TableHead className="text-[12px]">Name</TableHead>
            <TableHead className="text-[12px] w-[250px]">Class Name</TableHead>
            <TableHead className="text-right text-[12px]">Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {StudentsType.map((Student) => (
            <TableRow key={Student.id} className="">
              <TableCell className="font-semibold w-[250px] text-[14px]  flex  mr-1">
                <Image
                  src={Student.icon}
                  alt="icon"
                  width={100}
                  height={100}
                  className="w-[50px] h-[60px] rounded-md mr-1"
                />{" "}
                <div className="flex ml-1 flex-col">
                  <div className="text-[13px]  font-bold">{Student.name}</div>
                  <div className="flex  mt-2 justify-between">
                    <p
                      className={`${
                        Student.active
                          ? "text-[11px] px-[10px]  py-[2px] text-center rounded-md mr-3 bg-lightGreen text-white"
                          : "text-[11px] px-[10px]  py-[2px] text-center rounded-md mr-3 bg-gold text-white"
                      }`}
                    >
                      {Student.active || Student.pending}
                    </p>
                   
                  </div>
                </div>
              </TableCell>
             
              <TableCell className="text-[12.5px] font-semibold">{Student.classrooms}</TableCell>
  
              <TableCell className="flex justify-end   text-[14px]  text-lightGreen cursor-pointer">
                {Student.active ?  <StudentOptions/> : 
                    <div className="flex  space-x-3">
                        <p className="text-[13px] px-[20px]  py-[5px] text-center rounded-md mr-3 bg-lightGreen text-white"> {Student.accept}</p>
                        
                            <RejectStudent/> 
                       
                       
                    </div>
                }
            
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  