'use client'
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@mui/material";
import { useConversion } from "@/data-access/conversion";
import TransactionTable from '@/components/TransactionTable'
import Image from 'next/image'
import { MdVerified } from 'react-icons/md'

const Transactions = () => {
  const { getTimeAgo, handleDate, handleTime } = useConversion();

  // Fetching the data using react-query
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["allexam"],
    queryFn: async () => {
      const response = await fetch("/api/manage-resources");
      const result = await response.json();
      return result;
    },
  });

  

  // Display loading state
  if (isFetching) {
    return <Skeleton variant="rectangular" height={400} />;
  }

  // Display error state
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // Get the last resource in the data array
  const lastResource = Array.isArray(data) && data.length > 0 ? data[data.length - 1] : null;

  return (
    <div className="md:flex md:flex-row grid grid-cols-1 items-center mb-6 mx-auto text-[15px] gap-3 md:gap-2 rounded-md">
      <div className="flex md:flex-5 overflow-x-auto rounded-md flex-col">
        <TransactionTable />
      </div>

      <div className="flex md:mb-0 mb-6 py-6 px-2   rounded-md mt-6 bg-white flex-2">
        <div>
          <h3 className="text-slate-600 font-bold">Recently Added</h3>

          {lastResource ? (
            <div className="space-y-4 mx-auto mt-4">
              <div className="flex space-x-2">
                <Image src="/green-book.png" alt="" width={30} height={30} className="w-[30px] h-[30px]" />
                <div className="flex flex-col">
                  <p className="font-bold">{lastResource.title || "Unknown Title"}</p>
                  <p className="font-semibold pt-2 text-[13px] inline">Subject: {lastResource.subject || "Unknown"}
                    <Image src={`/${lastResource?.subject.toLowerCase()}.png`} alt="subject icon" width={50} height={50} className="w-[20px] h-[20px] inline-block" />
                  </p>
                </div>
              </div>
              
              <hr className="my-3" />
              
              <div className="mt-2 flex items-center md:space-x-6 py-3 space-x-4">
                

                <div className="flex flex-col space-y-2">
                  <p className="text-slate-500 text-[13px] font-semibold">Time</p>
                  <div className="flex space-x-2">
                    <p className="text-[12px] font-semibold">{handleTime(lastResource.createdAt)}</p>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <p className="text-slate-500 text-[13px] font-semibold">Date</p>
                  <div className="flex space-x-2">
                    <p className="text-[12px] font-semibold">{handleDate(lastResource.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center flex-col gap-2 mb-2">
              <Image
                priority
                src="/noitem.avif"
                alt="noitem"
                width={200}
                height={200}
                className="w-[120px] h-[120px]"
              />
              <div className="px-4 py-2 border border-green-700 rounded-md text-sm">
                <p>No resources available, please create one.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
