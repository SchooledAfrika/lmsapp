"use client";
import React from "react";

import { useQuery } from "@tanstack/react-query";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
 
  import { useParams } from "next/navigation";
  import Image from "next/image";
import IndividualClass from "./IndividualClass";
import SingleClassroom from "./SingleClassroom";
import { TableSkeleton } from "@/components/TableSkeleton";

interface ISingular {
  dataId: string;
}


  
  
  const SingleClassTable: React.FC<ISingular> = ({ dataId }) => {
    const { id } = useParams();
    console.log(id)

    const { isLoading, isError, error, data } = useQuery({
      queryKey: ["add"],
      queryFn: async () => {
        const response = await fetch(`/api/class/specific/${id}`);
        const result = await response.json();
        return result;
       
       
        
      },
     
    });
    //   if is loading
    if (isLoading) {
      return <div className=" flex-1">
       <p className="my-2 font-bold">loading...</p>
      <TableSkeleton/>
      
      </div>;
    }
    // if is error
    if (isError) {
      return <div className=" flex-1">{error.message}</div>;
    }
    
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
        {data && (
            <TableRow key={data.id} className="">
              <TableCell className="font-semibold w-[250px] text-[14px] flex  mr-1">
                {/* <Image
                  src={Class.icon}
                  alt="icon"
                  width={100}
                  height={100}
                  className="w-[50px] h-[50px] rounded-md mr-1"
                />{" "} */}
                <div className="flex ml-1 flex-col">
                  <div className="text-[13px] font-bold">{data.className}
                    {console.log(data.className)}
                  </div>
                  <div className="flex  mt-1 justify-between">
                    <p
                      className="text-[11px] px-[10px] py-[2px] rounded-md mr-3 bg-lightGreen text-white"
                        
                    >
                      Active
                    </p>
                    
                  </div>
                </div>
              </TableCell>
             
              <TableCell className="text-[12px] font-semibold">{data.classStarts}
              {console.log(data.classStarts)}
              </TableCell>
              <TableCell className="text-[12px] font-semibold">{data.maxCapacity}
              {console.log(data.maxCapacity)}
              </TableCell>
              {/* <TableCell className="flex justify-end text-[14px]   text-lightGreen cursor-pointer">
                <SingleClassroom dataId={data.id}/>
                </TableCell> */}
              
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
  export default SingleClassTable
  