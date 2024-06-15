"use client";
import React, { useState } from "react";
import StudentInfo from "./ui/student-login/StudentInfo";
import StudentProfileData from "./ui/student-login/StudentProfileData";

const StudentAccount = () => {
  const [viewComponent, setViewComponent] = useState(true);

  const handleViewComponent = () => {
    setViewComponent(false);
  };

  return (
    <div>
      {viewComponent ? (
        <StudentInfo onClickView={handleViewComponent} />
      ) : (
        <StudentProfileData />
      )}
    </div>
  );
};

export default StudentAccount;
