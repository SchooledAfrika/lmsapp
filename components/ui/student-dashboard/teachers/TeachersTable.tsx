import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  
  import Image from "next/image";
  import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
  import { TeacherOptions } from "./TeacherOptions";
  
  
  const TeachersType = [
    {
      id: "1",
      icon: "/teacher-img.png",
      name: "Odo Maurice ",
      className: "Alpha",
      active: "Active",
      subject: "Mathematics, English, Accounting",
      Grade: "Grade 10, Grade 11, & Grade 12",

    },
    {
      id: "2",
      icon: "/tutors.jpg",
      name: "Augustine David",
      className: "Daisy",
      active: "Active",
      subject: "Mathematics, English, Accounting",
      Grade: "Grade 10, Grade 11, & Grade 12",
      
    },
  ];
  
  export default function TeachersTable() {
    return (
      <Table className="bg-white overflow-x-auto    rounded-md mt-12">
        <TableHeader>
          <TableRow>
            <TableHead className="text-[12px]">Name</TableHead>
            <TableHead className="text-[12px]">Class</TableHead>
            <TableHead className="text-[12px]">Subject</TableHead>
            <TableHead className="text-[12px]">Grade</TableHead>
            <TableHead className="text-right text-[12px]">Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {TeachersType.map((Teacher) => (
            <TableRow key={Teacher.id} className="">
              <TableCell className="font-bold text-[13px] w-[200px]  flex  mr-1">
                <Image
                  src={Teacher.icon}
                  alt="icon"
                  width={100}
                  height={100}
                  className="w-[60px] h-[60px] rounded-md mr-1"
                />{" "}
                <div className="flex ml-1 flex-col">
                  <div>{Teacher.name}</div>
                  <div className="flex  mt-2 justify-between">
                    <p
                      className={`${
                        Teacher.active
                          ? "text-[11px] px-[20px] py-[5px] w-28 text-center rounded-md mr-3 bg-lightGreen text-white"
                          : "text-[11px] px-[20px] py-[5px] w-28 text-center rounded-md mr-3 bg-gold text-white"
                      }`}
                    >
                      {Teacher.active}
                    </p>
                    
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-[12px]  font-semibold">{Teacher.className}</TableCell>
              <TableCell className="text-[12px]  font-semibold">{Teacher.subject}</TableCell>
  
              <TableCell className="text-[12px]  font-semibold">{Teacher.Grade}</TableCell>
              <TableCell className="float-right  text-[16px] items-center  text-lightGreen cursor-pointer">
               <TeacherOptions/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  