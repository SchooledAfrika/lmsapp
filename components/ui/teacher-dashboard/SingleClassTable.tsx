import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
 
  
  import Image from "next/image";
import { IndividualClass } from "./IndividualClass";


  
  const SingleclassType = [
    {
      id: "1",
      icon: "/teacher-img.png",
      name: "Odo Maurice O",
      start: "April 31, 2024",
      active: "Active",
      sessionsAttended: "2",
     
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
      <Table className="bg-white overflow-x-auto    rounded-md my-6">
        
        <TableHeader>
            <p className="px-3 py-4 font-bold text-[15px]">Students</p>
            
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
              <TableCell className="font-semibold w-[250px] text-[14px] flex  mr-1">
                <Image
                  src={Class.icon}
                  alt="icon"
                  width={100}
                  height={100}
                  className="w-[50px] h-[50px] rounded-md mr-1"
                />{" "}
                <div className="flex ml-1 flex-col">
                  <div className="text-[13px] font-bold">{Class.name}</div>
                  <div className="flex  mt-1 justify-between">
                    <p
                      className={`${
                        Class.active
                          ? "text-[11px] px-[10px] py-[2px] rounded-md mr-3 bg-lightGreen text-white"
                          : "text-[11px] px-[10px] py-[2px] rounded-md mr-3 bg-gold text-white"
                      }`}
                    >
                      {Class.active}
                    </p>
                    
                  </div>
                </div>
              </TableCell>
             
              <TableCell className="text-[12px] font-semibold">{Class.start}</TableCell>
              <TableCell className="text-[12px] font-semibold">{Class.sessionsAttended}</TableCell>
              <TableCell className="flex justify-end text-[14px]   text-lightGreen cursor-pointer">
                <IndividualClass/>
                </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  