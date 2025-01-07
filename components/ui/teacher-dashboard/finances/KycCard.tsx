import Link from "next/link";
import React from "react";
import { useQuery } from "@tanstack/react-query";

const KycCard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getkyc"],
    queryFn: async () => {
      const response = await fetch("/api/kyc");
      const result = await response.json();
      return result;
    },
  });
  console.log(data);
  const verified = true;
  return (
    <div className="flex flex-2   text-sm pl-4  pr-3 py-3  justify-between space-x-2  bg-white rounded-md">
      <div className="flex flex-col  justify-evenly">
        <h3 className="font-semibold text-slate-500 text-[13px] pb-3">
          Account Balance
        </h3>

        <p className="font-bold text-[22px] text-lightGreen pb-2 ">$00.00</p>
        {/* <p className="inline text-[11.5px] mt-2 font-subtext font-medium">
          <span className="text-red-500 ">15%</span> less than last month
        </p> */}
        {data === null ? (
          <p className="inline text-[13px] my-3   font-semibold">
            {" "}
            Complete Your
            <Link
              href={`/teacher-dashboard/finance/kyc`}
              className="text-lightGreen underline font-bold "
            >
              {" "}
              KYC
            </Link>
          </p>
        ) : (
          <p className="inline text-[13px] my-3 text-lightGreen  font-semibold">
            your kyc is{" "}
            <span className="text-[13px] px-2 py-1 bg-green-700 text-white rounded-md">
              {data?.status}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default KycCard;
