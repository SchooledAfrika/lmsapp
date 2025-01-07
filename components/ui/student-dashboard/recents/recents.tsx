"use client";
import ChartDialog from "@/components/ChartDialog";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { TiArrowSortedDown } from "react-icons/ti";
import { useQuery } from "@tanstack/react-query";
import { useConversion } from "@/data-access/conversion";
import { useSession } from "next-auth/react";
import { Skeleton } from "@mui/material";

const Recents = () => {
  const { data } = useSession();
  const { getTimeAgo, handleDate, handleTime } = useConversion();

  // Fetching the data using react-query
  const { data: getClassStudents, isFetching, isError, error } = useQuery({
    queryKey: ["allClass Students"],
    queryFn: async () => {
      const response = await fetch("/api/all-classes");
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
  const lastClassStudents = Array.isArray(getClassStudents) && getClassStudents.length > 0 ? getClassStudents[getClassStudents.length - 1] : null;

  return (
    <div className="my-6 flex  md:flex-row justify-between flex-col  text-[15px] gap-3   md:gap-3 rounded-md">
      <div className="flex md:flex-5 h-full    px-3 bg-white rounded-md py-6  flex-col">
        <div className="flex pl-4 py-2 justify-between">
          <p className="text-[14px] text-slate-500 font-semibold">
            Overall Perfomance
          </p>
          <div className="flex text-[13px] text-lightGreen font-subtext justify-end">
            <p className="inline justify-end ">
              Monthly
              <TiArrowSortedDown className="inline text-xl text-lightGreen" />
            </p>
          </div>
        </div>
        <ChartDialog userId={data?.user.id as string} />
      </div>

      <div className="flex flex-3 bg-white md:mb-0 mb-6 py-6 px-3  rounded-md overflow-hidden">
        <div className="">
          <h3 className="text-slate-400 text-[14px] font-bold">
            Recently Added
          </h3>
          {lastClassStudents ? (
                      <div className="space-y-4 mx-auto mt-4">
                        <div className="flex space-x-2">
                          <Image src="/green-book.png" alt="" width={30} height={30} className="w-[30px] h-[30px]" />
                          <div className="flex flex-col">
                            <p className="font-bold">{lastClassStudents.name || "Unknown Class name"}</p>
                            <p className="font-semibold pt-2 text-[13px] inline">Subject: {lastClassStudents.subjects || "Unknown Subject"}
                              <Image src={`/${lastClassStudents?.subjects.toLowerCase()}.png`} alt="subject icon" width={50} height={50} className="w-[20px] h-[20px] inline-block" />
                            </p>
                          </div>
                        </div>
                        
                        <hr className="my-3" />
                        
                        <div className="mt-2 flex items-center md:space-x-6 py-3 space-x-4">
                          
          
                          <div className="flex flex-col space-y-2">
                            <p className="text-slate-500 text-[13px] font-semibold">Time</p>
                            <div className="flex space-x-2">
                              <p className="text-[12px] font-semibold">{handleTime(lastClassStudents.createdAt)}</p>
                            </div>
                          </div>
          
                          <div className="flex flex-col space-y-2">
                            <p className="text-slate-500 text-[13px] font-semibold">Date</p>
                            <div className="flex space-x-2">
                              <p className="text-[12px] font-semibold">{handleDate(lastClassStudents.createdAt)}</p>
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
                          <p>No resources available</p>
                        </div>
                      </div>
                    )}
          
          
        </div>
      </div>
    </div>
  );
};

export default Recents;
