// Teachers will be redirected to this route when they choose to register as teachers to complete their registration
import Card from "@/components/ui/teacher-dashboard/card/card";
import Chart from "@/components/ui/teacher-dashboard/chart/chart";
import React from "react";
import Transactions from "@/components/ui/teacher-dashboard/Transactions"

const page = () => {
  return <div className="mt-[80px]  md:mt-6">
     <Card/>
     <Chart/>
     <Transactions/>
     
  </div>;
};

export default page;
