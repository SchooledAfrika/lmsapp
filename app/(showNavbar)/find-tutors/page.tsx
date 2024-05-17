import React from "react";
import Search from "@/components/Search";
import PageNav from "@/components/PageNav";
import AllTutors from "@/components/AllTutors";


const page = () => {
  return (
    <div>
      <h2 className="font-bold my-20 text-2xl text-center">Tutors Listing</h2>
      <Search />
      <AllTutors/>
      <AllTutors/>
      <AllTutors/>
      <AllTutors/>
      <PageNav />

     
    </div>
  );
};

export default page;
