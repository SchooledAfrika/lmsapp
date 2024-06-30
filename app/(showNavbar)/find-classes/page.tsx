import PageNav from "@/components/PageNav";
import PopularClasses from "@/components/PopularClasses";
import Search from "@/components/Search";
import React from "react";

const page = () => {
  return (
    <div>
      <h2 className="font-bold font-subtext my-20 text-2xl text-center">
        Class Listing
      </h2>
      <Search />
      <PopularClasses />
      <PageNav />
    </div>
  );
};

export default page;
