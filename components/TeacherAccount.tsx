"use client";
import React, { useState } from "react";
import TeacherInfo from "./ui/teacher-login/TeacherInfo";
import TeacherResume from "./ui/teacher-login/TeacherResume";
import TeacherPaymentDetails from "./ui/teacher-login/TeacherPaymentDetails";
import TeacherFinalPaymentDetails from "./ui/teacher-login/TeacherFinalPaymentDetails";

const TeacherAccount = () => {
  const [showComponent, setShowComponent] = useState("Personal Information");

  const handleComponentView = (view: any) => {
    setShowComponent(view);
  };

  return (
    <div>
      {showComponent === "Personal Information" && (
        <TeacherInfo onClickButton={handleComponentView} />
      )}
      {showComponent === "Resume" && (
        <TeacherResume onClickButton={handleComponentView} />
      )}
      {showComponent === "Payment Details" && (
        <TeacherPaymentDetails onClickButton={handleComponentView} />
      )}
      {showComponent === "Final Payment Details" && (
        <TeacherFinalPaymentDetails />
      )}
    </div>
  );
};

export default TeacherAccount;
