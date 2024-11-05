import React from "react";
import Card from "@/components/ui/parent-dashoard/card/card";
import Chart from "@/components/ui/parent-dashoard/chart/chart";
import Overall from "@/components/ui/parent-dashoard/overall/overall";
import AddWard from "@/components/ui/parent-dashoard/AddWard/AddWard";

const DashboardPage = () => {
  return (
    <div className="mt-[100px] md:mt-3">
      <div className="flex md:flex-row flex-col   py-4 cursor-pointer     rounded-md">
        <Card />
        {/* <AddWard /> */}
      </div>

      <Chart />
      <Overall />
    </div>
  );
};

export default DashboardPage;
