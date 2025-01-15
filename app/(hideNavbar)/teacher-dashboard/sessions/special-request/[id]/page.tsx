import SingleSpecialSessionShow from "@/components/SingleSpecialSessionShow";
import React from "react";

const page = () => {
  return (
    <div className=" my-[80px] md:my-6">
      <SingleSpecialSessionShow isTeacher={true} />
    </div>
  );
};

export default page;