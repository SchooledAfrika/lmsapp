import React from "react";
import Card from "@/components/ui/school-dashboard/card/card"
import Chart from "@/components/ui/school-dashboard/chart/chart"
import RecentlyAdded from "@/components/RecentlyAdded";


const page = () => {
  return (
    <div>
      <Card />
      <Chart/>
      <RecentlyAdded/>
      
      
    </div>
  );
};

export default page;
