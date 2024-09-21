'use client'

import AdminChartDialog from "@/components/AdminChartDialog";
import React from "react";
import { StudentsChart } from "../StudentsChart";
import { TeachersChart } from "../TeachersChart";
import { SchoolsChart } from "../SchoolsChart";
import { ParentsChart } from "../ParentsChart";

const dashboard = () => {
  return (
  <div>
    <AdminChartDialog/>

    <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-3">
     <StudentsChart/>
    <ParentsChart/>
     
    </div>
   <div className="">
    <TeachersChart/>
   </div>
   

   
   
  </div>

  )
};

export default dashboard;
