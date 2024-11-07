import OneOneSession from "@/components/ui/student-dashboard/sessions/OneOnOneSession";

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
