import Login from "@/components/Login";
import { FullPageLoading } from "@/components/SingleTutor";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div className="bg-[#F8F7F4]">
      <Suspense fallback={<FullPageLoading fullpage={true} />}>
        <Login />
      </Suspense>
    </div>
  );
};

export default page;
