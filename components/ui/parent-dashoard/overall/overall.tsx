"use client";
import { useQuery } from "@tanstack/react-query";
import ChartDialog from "@/components/ChartDialog";
import Image from "next/image";
import { TiArrowSortedDown } from "react-icons/ti";
import Link from "next/link";
import { useWardId } from "@/data-access/conversion";

const Overall = () => {
  //The wardId is already stored in the localStorage and so we initialize a state for it
  const { wardId } = useWardId();

  // here we get all the exams from teacher
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["wardAssessment"],
    queryFn: async () => {
      const response = await fetch(
        `/api/wards-all-assessment?childId=${wardId}`
      );
      const result = await response.json();
      return result;
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    <div className="my-6 flex  md:flex-row justify-between flex-col  text-[15px] gap-3   md:gap-3 rounded-md">
      <div className="flex md:flex-4 h-full    px-3 bg-white rounded-md py-6  flex-col">
        <div className="flex pl-4 py-2 justify-between">
          <p className="text-[14px] text-slate-500 font-semibold">
            Ward's Overall Perfomance
          </p>
          <div className="flex text-[13px] text-lightGreen font-subtext justify-end">
            <p className="inline justify-end ">
              Monthly
              <TiArrowSortedDown className="inline text-xl text-lightGreen" />
            </p>
          </div>
        </div>
        <ChartDialog userId={wardId as string} />
      </div>

      <div className="flex flex-col flex-3 bg-white md:mb-0 mb-6 py-6 px-3  rounded-md ">
        <div className="flex  justify-between">
          <p className="text-slate-500 text-[14px] font-semibold">
            Ward's Assessment
          </p>
          <Link
            href="/parents-dashboard/assessment"
            className="text-[11.5px] text-lightGreen  "
          >
            View More
          </Link>
        </div>
        {Array.isArray(data) &&
          data.map((item: any) => (
            <div key={item.id} className="flex justify-between my-3 pr-2">
              <div className="flex space-x-3">
                <Image
                  src="/maths.png"
                  alt="maths"
                  width={100}
                  height={100}
                  className="w-[30px] h-[30px]"
                />
                <div className="flex flex-col space-y-1">
                  <p className="text-[13px] font-bold">{item.subject}</p>
                  <p className="text-[12px] font-semibold">
                    {item.grade}{" "}
                    <span className="border border-l mx-2 border-l-slate-500"></span>
                    {item.title}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <p className="font-bold text-lightGreen">
                  {item.score}/
                  {Array.isArray(item?.questions) && item?.questions.length}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Overall;
