import React from "react";
import Card from "@/components/ui/school-dashboard/card/card";
import Chart from "@/components/ui/school-dashboard/chart/chart";

const page = () => {
  return (
    <div className="mt-[80px]  md:mt-6">
      <Card />
      <Chart />
    </div>
  );
};

export default page;
