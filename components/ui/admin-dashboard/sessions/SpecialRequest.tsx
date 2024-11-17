import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ShowSkeleton } from "./Sessions";
import { Noitem } from "@/components/ApplicantsTable";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import Image from "next/image";

interface ISession {
  id: string;
  amt: boolean;
  language: string;
  subject: string;
  grade: string;
  student: {
    profilePhoto: string;
    name: string;
    email: string;
  };
}

const OfferCard: React.FC<{ item: ISession }> = ({ item }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/admin-dashboard/sessions/special-request/${item.id}`);
  };
  return (
    <div className=" bg-white p-3 flex flex-col gap-5 shadow-md">
      <div className=" flex items-center gap-2">
        <div>
          {item.student.profilePhoto === null ? (
            <div className=" w-[40px] aspect-square rounded-full border flex items-center justify-center text-[20px]">
              <CgProfile />
            </div>
          ) : (
            <Image
              alt=""
              src={item.student.profilePhoto!}
              width={200}
              height={200}
              className=" w-[40px] aspect-square rounded-full"
              priority
            />
          )}
        </div>
        <div>
          <p className=" text-[12px]">{item.student.email}</p>
          <p className=" text-[14px] font-semibold">{item.student.name}</p>
        </div>
      </div>
      <div className=" border border-gray-500 rounded-md flex flex-col w-full p-1">
        <div className=" flex items-center gap-1 ">
          <p className=" font-semibold">Language:</p>
          <p className=" text-[14px]">{item.language}</p>
        </div>
        <div className=" flex items-center gap-1 ">
          <p className=" font-semibold">Subject:</p>
          <p className=" text-[14px]">{item.subject}</p>
        </div>
        <div className=" flex items-center gap-1 ">
          <p className=" font-semibold">Grade:</p>
          <p className=" text-[14px]">{item.grade}</p>
        </div>
        <div className=" flex items-center gap-1 ">
          <p className=" font-semibold">Amount:</p>
          <p className=" text-[14px]">{item.amt}</p>
        </div>
      </div>
      <div>
        <button
          onClick={handleClick}
          className=" w-full py-2 text-[14px] transition-all ease-in-out duration-500 hover:bg-green-800 bg-green-700 text-white font-bold rounded-md flex items-center justify-center"
        >
          Show Details
        </button>
      </div>
    </div>
  );
};

const SpecialRequest = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-special-request-all"],
    queryFn: async () => {
      const response = await fetch("/api/special-request");
      const result = await response.json();
      return result;
    },
  });
  if (isLoading) {
    return <ShowSkeleton />;
  }
  if (isError) {
    return (
      <div>
        <p>something went wrong</p>
      </div>
    );
  }
  console.log(data);
  return (
    <section>
      <div className="max-w-full">
        <div className=" w-full flex items-center justify-center">
          <p className="  mb-4 text-black font-bold text-[16px] md:text-[24px]">
            List of unmerged Special Request
          </p>
        </div>
        {Array.isArray(data) && (
          <div>
            {data.length === 0 ? (
              <div className=" w-full">
                <Noitem desc="No new session" />
              </div>
            ) : (
              <div className="grid  grid-cols-1 xs:grid-cols-2 gap-3  md:grid-cols-4">
                {data.map((item: ISession, index) => (
                  <OfferCard item={item} key={index} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default SpecialRequest;
