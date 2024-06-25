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
  
  const SingleclassType = [
    {
      id: "1",
      icon: "/teacher-img.png",
      name: "Odo Maurice O",
      start: "April 31, 2024",
      active: "Active",
      sessionsAttended: "2",
      options: "...",
    },
    {
      id: "2",
      icon: "/tutors.jpg",
      name: "Augustine David",
      start: "April 31, 2024",
      active: "Active",
      sessionsAttended: "2",
    },
    {
        id: "3",
        icon: "/tutors.jpg",
        name: "Augustine David",
        start: "April 31, 2024",
      active: "Active",
      sessionsAttended: "2",
      },
  ];
  
  export default function SingleClassTable() {
    return (
      <Table className="bg-white overflow-x-auto    rounded-md mt-6 mb-12">
        
        <TableHeader>
            <p className="px-3 py-2 font-bold text-base">Students</p>
            
          <TableRow className="text-[13px]">

            <TableHead>Name</TableHead>
            <TableHead className="">Start Date</TableHead>
            <TableHead className="">Sessions Attended</TableHead>
            <TableHead className="text-right">Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {SingleclassType.map((Class) => (
            <TableRow key={Class.id} className="">
              <TableCell className="font-semibold w-[250px] text-[12px] flex  mr-1">
                <Image
                  src={Class.icon}
                  alt="icon"
                  width={100}
                  height={100}
                  className="w-[60px] h-[60px] rounded-md mr-1"
                />{" "}
                <div className="flex ml-1 flex-col">
                  <div>{Class.name}</div>
                  <div className="flex  mt-2 justify-between">
                    <p
                      className={`${
                        Class.active
                          ? "text-[11px] px-[25px] py-[5px] rounded-md mr-3 bg-lightGreen text-white"
                          : "text-[11px] px-[20px] py-[5px] rounded-md mr-3 bg-gold text-white"
                      }`}
                    >
                      {Class.active}
                    </p>
                    
                  </div>
                </div>
              </TableCell>
             
              <TableCell className="text-[12px] font-semibold">{Class.start}</TableCell>
              <TableCell className="text-[12px] font-semibold">{Class.sessionsAttended}</TableCell>
              <TableCell className="float-right text-[16px]   text-lightGreen cursor-pointer"><FaEllipsisH className="ml-3"/></TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  