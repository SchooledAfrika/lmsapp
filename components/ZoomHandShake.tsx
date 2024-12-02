"use client";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FullPageLoading } from "./SingleTutor";
import { useQuery } from "@tanstack/react-query";
import { IoMdCheckmark } from "react-icons/io";
import { useSession } from "next-auth/react";

export const LargeSuccessful = () => {
  return (
    <div className=" w-[150px] h-[150px] rounded-full border-[5px] border-green-700 text-green-700 flex text-[40px] items-center justify-center">
      <IoMdCheckmark />
    </div>
  );
};

const ZoomHandShake = () => {
  const query = useSearchParams();
  const router = useRouter();
  const code = query.get("code");
  const { data: userInfo } = useSession();
  // here, we will send the code gotten from the query parameter to the backend
  // so we can continue with other important functionality there
  const { isLoading, data } = useQuery({
    queryKey: ["send-code"],
    queryFn: async () => {
      const response = await fetch(`/api/zoom/get-access-code?code=${code}`);
      const result = await response.json();
      return result;
    },
  });
  const handleClick = () => {
    if (userInfo?.user.role !== "Teacher") {
      return alert("illegal path!!!");
    }
    return router.push("/teacher-dashboard");
  };
  // return the loading spinner has we make our backend request to get information from the zoom
  if (isLoading) {
    return (
      <div className=" flex items-center justify-center">
        <FullPageLoading fullpage={true} />
      </div>
    );
  }
  return (
    <div className=" flex items-center justify-center w-full h-screen">
      <div className=" flex flex-col gap-2 items-center">
        <LargeSuccessful />
        <p className=" font-semibold text-slate-500 ">
          Your connection to zoom was successful!!!
        </p>
        <button
          onClick={handleClick}
          className=" px-3 py-2 rounded-md mt-2 border shadow-md bg-green-200 cursor-pointer hover:text-white hover:bg-green-800 transition-all ease-in-out duration-700"
        >
          Back to dashboard
        </button>
      </div>
    </div>
  );
};

export default ZoomHandShake;
