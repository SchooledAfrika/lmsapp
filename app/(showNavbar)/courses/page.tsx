import Courses from "@/components/Courses";

import Search from "@/components/Search";
import React from "react";

const page = () => {
  return (
    <div>
      <h2 className="font-bold font-subtext my-20 text-2xl text-center">
        Course Listing
      </h2>
      <Search />
      <Courses />
    </div>
  );
};

export default page;