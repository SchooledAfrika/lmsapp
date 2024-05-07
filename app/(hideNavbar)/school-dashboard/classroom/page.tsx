
import Classroom from "@/components/Classroom";
import React from "react";
import { AddClassroom } from "./add/page";
import Link from "next/link";

const page = () => {
  return <div>
    <div className="flex justify-end mt-6">
        
           <AddClassroom/>
        
          
         </div>
     <Classroom/>
  </div>;
};

export default page;
