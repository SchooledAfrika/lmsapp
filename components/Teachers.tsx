
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import TeachersTable from "./TeachersTable";
import DashboardPagination from "./DashboardPagination";

const Teachers = () => {
  
  return (
   
    
    <div className=" ">
      

      <TeachersTable />

      <DashboardPagination />
    </div>
    
     
  );
};

export default Teachers;
