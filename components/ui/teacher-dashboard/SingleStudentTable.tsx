import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
 
  
  import Image from "next/image";



  
  const SingleclassType = [
    {
      id: "1",
      icon: "/maths.png",
      name: "Mathematics",
      markObtained: "70/100",
      gradeRemarksPass: "Excellent",
     
     
    },
    {
      id: "2",
      icon: "/govt.png",
      name: "Government",
      markObtained: "40/100",
      gradeRemarksFail: "Fair",
    },
    {
        id: "3",
        icon: "/crs.png",
        name: "C.R.S",
        markObtained: "70/100",
        gradeRemarksPass: "Excellent",
      },
  ];
  
  export default function SingleStudentTable() {
    return (
      <Table className="bg-white overflow-x-auto    rounded-md my-6">
        
        <TableHeader>
            <p className="px-3 py-4 font-bold text-[15px]">Assessment Record</p>
            
          <TableRow className="text-[13px]">

           
            <TableHead className="">Subject</TableHead>
            <TableHead className="">Marks Obtained</TableHead>
            <TableHead className="text-right">Grade Remarks</TableHead>
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
                  className="w-[40px] h-[40px] rounded-md mr-1"
                />{" "}
               
                  <div className="text-[13px] flex items-center font-bold">{Class.name}</div>
                  
               
              </TableCell>
             
              <TableCell className="text-[12px]  font-semibold">{Class.markObtained}</TableCell>
              <TableCell className={`${
                      Class.gradeRemarksPass
                        ? "text-[12px] font-semibold text-right text-lightGreen"
                        :  " text-right font-semibold text-red-500  text-[12px]"
                    }`}>{Class.gradeRemarksPass || Class.gradeRemarksFail}</TableCell>
              
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  