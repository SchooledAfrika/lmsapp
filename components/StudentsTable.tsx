import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  
  import Image from "next/image";
  import { Button } from "@/components/ui/button";
  import Link from "next/link";
  
  const StudentsType = [
    {
      id: "1",
      icon: "/teacher-img.png",
      name: "Odo Maurice O",
      classrooms: "Daisy, Alpha, Beta",
      active: "Active",
      status: "Student",
      options: "...",
    },
    {
      id: "2",
      icon: "/tutors.jpg",
      name: "Augustine David",
      classrooms: "Daisy, Alpha, Beta",
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
            <TableHead>Name</TableHead>
            <TableHead className="sm:w-[100px] w-full">Classrooms</TableHead>
            <TableHead className="text-right">Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {StudentsType.map((Student) => (
            <TableRow key={Student.id} className="">
              <TableCell className="font-semibold text-[14px] w-[300px] sm:w-full flex  mr-1">
                <Image
                  src={Student.icon}
                  alt="icon"
                  width={100}
                  height={100}
                  className="w-[60px] h-[60px] rounded-md mr-1"
                />{" "}
                <div className="flex ml-1 flex-col">
                  <div>{Student.name}</div>
                  <div className="flex  mt-2 justify-between">
                    <p
                      className={`${
                        Student.active
                          ? "text-[11px] px-[20px] py-[5px] rounded-md mr-3 bg-lightGreen text-white"
                          : "text-[11px] px-[20px] py-[5px] rounded-md mr-3 bg-gold text-white"
                      }`}
                    >
                      {Student.active || Student.pending}
                    </p>
                    <p className="text-[12px] px-[20px] py-[5px]   rounded-md bg-dimOrange text-white">
                      {Student.status}
                    </p>
                  </div>
                </div>
              </TableCell>
             
              <TableCell className="sm:w-[100px] w-[300px]">{Student.classrooms}</TableCell>
  
              <TableCell className="text-right mr-2 text-3xl text-lightGreen cursor-pointer">
                {Student.options || <div className="flex  mt-2 items-center justify-end">
                <Link href="/ ">
                        <p className="bg-lightGreen  rounded-lg hover:bg-green-700  text-white text-[12px]  pl-2 py-1 pr-3 w-24 mr-3   text-center lg:block"> {Student.accept}</p>
                       
                    </Link> 
                   
                    <Link href="/ ">
                        <p className="bg-dimOrange  rounded-lg hover:bg-gold  text-white text-[12px]  pl-2 py-1 pr-3 w-24 mr-3   text-center lg:block"> {Student.reject}</p>
                       
                    </Link> 
                   
                    
                  </div>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  