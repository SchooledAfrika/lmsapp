<<<<<<< HEAD:app/find-tutors/page.tsx
import React from "react";
import FindTutors from "@/components/FindTutors";

import Header from "@/components/Header";
import Search from "@/components/Search";
import PageNav from "@/components/PageNav";
import Footer from "@/components/Footer";

const page = () => {
  return (
    <div className="bg-stone-100 w-full">
      <Header />
      <h2 className="font-bold my-20 text-2xl text-center">Tutors Listing</h2>
      <Search />
      <FindTutors />
      <FindTutors />
      <FindTutors />
      <FindTutors />
      <FindTutors />
      <PageNav />
      <Footer />
=======
import React from 'react'
import FindTutors from '@/components/FindTutors'
import Search from '@/components/Search'
import PageNav from '@/components/PageNav'


const page = () => {
  return (
    <div>
        
        <h2 className="font-bold my-20 text-2xl text-center">Tutors Listing</h2>
        <Search/>
        <FindTutors />
        <FindTutors />
        <FindTutors />
        <FindTutors />
        <FindTutors />
        <PageNav/>
>>>>>>> 4f74f7e2d3201a8de768a4134624c93fb05c37bd:app/(showNavbar)/find-tutors/page.tsx
    </div>
  );
};

export default page;
