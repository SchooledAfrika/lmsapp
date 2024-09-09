import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { RxAvatar } from "react-icons/rx";
import { useRouter } from "next/navigation";

const ShowProfile = () => {
  const { data } = useSession();
  const router = useRouter();

  const handleToDashboard = () => {
    if (data?.user.role === "Teacher") {
      router.push("/teacher-dashboard");
    } else if (data?.user.role === "Student") {
      router.push("/student-dashboard");
    } else if (data?.user.role === "Admin") {
      router.push("/admin-dashboard");
    } else if (data?.user.role === "School") {
      router.push("/school-dashboard");
    } else {
      router.push("/parents-dashboard");
    }
  };
  return (
    <div
      onClick={handleToDashboard}
      className=" flex items-center gap-2 cursor-pointer mr-8"
    >
      <p className=" text-green-700 text-[12px] font-bold">My Dashboard</p>
      <div className=" p-1  w-[40px] h-[40px] border border-green-700 rounded-full">
        {data?.user.image ? (
          <Image
            className=" w-full h-full object-cover rounded-full"
            priority
            src={data.user.image}
            alt="profile"
            width={200}
            height={200}
          />
        ) : (
          <RxAvatar className="w-full h-full" />
        )}
      </div>
    </div>
  );
};

export default ShowProfile;
