import OneOneSession from "@/components/OneOnOneSession";
import PrivateSession from "@/components/ui/student-dashboard/private-session/PrivateSession";
import React from "react";

const page = () => {
  return (
    <div>
      <div>
        <OneOneSession isTeacher={false} />
      </div>
    </div>
  );
};

export default page;
