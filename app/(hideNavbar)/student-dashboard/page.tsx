import Card from "@/components/ui/student-dashboard/card/card";
import Recents from "@/components/ui/student-dashboard/recents/recents";
import UnderCard from "@/components/ui/student-dashboard/under-card/under-card";
import React from "react";

const page = () => {
  return <div className="mt-[80px]  md:mt-6">
        <Card/>
        <UnderCard/>
        <Recents/>
    </div>;
};

export default page;
