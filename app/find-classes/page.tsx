import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageNav from "@/components/PageNav";
import PopularClasses from "@/components/PopularClasses";
import Search from "@/components/Search";
import React from "react";

const page = () => {
  return (
    <div>
      <Header />
      <h2 className="font-bold font-subtext my-20 text-2xl text-center">
        Class Listing
      </h2>
      <Search />
      <PopularClasses />
      <PopularClasses />
      <PageNav />
      <Footer />
    </div>
  );
};

export default page;
