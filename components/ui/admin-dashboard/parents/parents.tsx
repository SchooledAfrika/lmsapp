"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableSkeleton } from "@/components/TableSkeleton";
import ParentOptions from "./ParentOptions";

const Parents = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["AdminGetParents"],
    queryFn: async () => {
      const response = await fetch("/api/parents");
      const result = await response.json();
      return result;
    },
  });
  

  // If loading
  if (isLoading) {
    return (
      <div className="">
        <p className="my-4 font-bold">loading...</p>
        <TableSkeleton />
      </div>
    );
  }

  // If error
  if (isError) {
    return <div className="flex-1">{error.message}</div>;
  }

  return (
    <div className="w-full font-header">
      <Table className="bg-white overflow-x-auto rounded-md mt-2">
        <TableHeader>
          <TableRow>
            <TableHead className="text-[12px] w-[100px] text-left p-2">
              Name
            </TableHead>
            <TableHead className="text-[12px] text-left p-2">Email</TableHead>
            <TableHead className="text-[12px] text-left p-2">Status</TableHead>
            <TableHead className="text-[12px] text-left p-2">Wards</TableHead>
            <TableHead className="text-[12px] text-left p-2">Plan</TableHead>
            <TableHead className="text-[12px] text-right p-2">
              Options
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(data) &&
            data.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="text-[13px] md:w-[250px]  w-[150px] font-bold  flex items-center gap-2">
                  {item.name}
                </TableCell>

                <TableCell className="text-[12px] font-semibold p-2">
                  {item.email}
                </TableCell>
                <TableCell className="text-[12px] font-semibold p-2">
                  {item.status}
                </TableCell>
                <TableCell className="text-[12px] font-semibold p-2">
                  {item.wards.length}
                </TableCell>

                <TableCell className="text-[13px]  font-semibold p-2">
                  {item.PaymentPlans ? item.PaymentPlans : "Basic"}
                </TableCell>
                <TableCell className="text-right text-[16px] text-lightGreen cursor-pointer p-2">
                  <ParentOptions email={item.email} dataId={item.id} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Parents;
