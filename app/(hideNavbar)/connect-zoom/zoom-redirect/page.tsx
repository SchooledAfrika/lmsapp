import { FullPageLoading } from "@/components/SingleTutor";
import ZoomHandShake from "@/components/ZoomHandShake";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<FullPageLoading fullpage={true} />}>
        <ZoomHandShake />
      </Suspense>
    </div>
  );
};

export default page;
