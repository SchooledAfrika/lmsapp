import SingleSessionShow from "@/components/SingleSessionShow";
import React from "react";

const page = () => {
  return (
    <div className=" my-[80px] md:my-6">
      <SingleSessionShow isTeacher={true} />
    </div>
  );
};

export default page;
