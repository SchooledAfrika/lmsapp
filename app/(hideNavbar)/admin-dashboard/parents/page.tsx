import Parents from "@/components/ui/admin-dashboard/parents/parents";
import MailComponent from "@/components/ui/GroupMail";
import React from "react";

const page = () => {
  return (
    <div className="my-[80px]">
      <MailComponent group="Parents" />
      <Parents />
    </div>
  );
};

export default page;
