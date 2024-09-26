"use client";
"use client";
import React from "react";

import { useQuery, useQueries } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { FaEllipsisH } from "react-icons/fa";
import Link from "next/link";
import { Layers3 } from "lucide-react";
import { FaRegEye } from "react-icons/fa";
import { BookOpenCheck } from "lucide-react";
// import RemoveClass from "./RemoveClass";
import { IoMailUnreadOutline } from "react-icons/io5";
import { FaTableList } from "react-icons/fa6";
import { ListCollapse } from "lucide-react";
import { FaUserSlash } from "react-icons/fa6";
import RemoveParent from "./RemoveParent";
import SingleWardInfo from "./SingleWardInfo";

interface Iward {
  dataId: string;
  wards: string[];
}

const WardInfo: React.FC<Iward> = ({dataId, wards}) => {
  // Ensure wards is defined and is an array
  const validWards = Array.isArray(wards) ? wards : [];
  // getting individual wards using parallel query with usequeries
  const queries = useQueries({
    queries: validWards.map((singleWard: any) => {
      return {
        queryKey: ["ward", singleWard],
        queryFn: async () => {
          const response = await fetch(`/api/parents/${dataId}`);
          const result = await response.json();
          return result;
        },
      };
    }),
  });

  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="inline text-[13px] cursor-pointer underline  font-semibold">
          View wards details
        </p>
      </DialogTrigger>
      <DialogContent className="sm:w-[750px] w-[380px] font-header">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">
            More Wards Information
          </DialogTitle>
        </DialogHeader>
        <div>
      <Table className="bg-white overflow-x-auto rounded-md mt-12">
        <TableHeader>
          <TableRow>
            <TableHead className="text-[12px] w-[100px] text-left p-2">
              Name
            </TableHead>
            <TableHead className="text-[12px] text-left p-2">Grade</TableHead>
            <TableHead className="text-[12px] text-left p-2">Gender</TableHead>
            <TableHead className="text-[12px] text-left p-2">
              Joined
            </TableHead>
            {/* <TableHead className="text-[12px] text-right p-2">
              Classes
            </TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {wards.map((singleWard: any, index) => (
            <TableRow key={index}>
              <TableCell className="text-[13px] md:w-[250px]  w-[150px] font-bold  flex items-center gap-2">
                {/* <Image
                  src={singleWard.classBanner}
                  alt="icon"
                  width={25}
                  height={25}
                  className="w-[25px] h-[25px] rounded-md"
                /> */}
                {singleWard.name}
              </TableCell>
              <TableCell className="text-[12px]  font-semibold p-2">
                {singleWard.grade}
              </TableCell>

              <TableCell className="text-[12px] font-semibold p-2">
                {singleWard.gender}
              </TableCell>
              <TableCell className="text-[13px]  font-semibold p-2">
                {singleWard.createdAt}
              </TableCell>
              {/* <TableCell className="text-right text-[16px] text-lightGreen cursor-pointer p-2">
                <SingleWardInfo dataId={singleWard.id} classes={singleWard.classes}   />
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
       
          
        
      </DialogContent>
    </Dialog>
  );
};

export default WardInfo;
