"use client";
import React, { useState } from "react";
import TeacherSubject from "./TeacherSubject";
import TeacherProfileData from "./TeacherProfileData";
import TeacherPrice from "./TeacherPrice";

export const TeacherOneOnOne: React.FC = () => {
  const [currentView, setCurrentView] = useState("profileData");
  const [canTransition, setCanTransition] = useState(true);

  const handleTeacherDetails = (view: string) => {
    if (canTransition) {
      setCurrentView(view);

      if (view === "price") {
        setCanTransition(false);
      }
    }
  };

  return (
    <div>
      {currentView === "profileData" && (
        <TeacherProfileData onClickTeacherDetails={handleTeacherDetails} />
      )}
      {currentView === "subject" && (
        <TeacherSubject onClickTeacherDetails={handleTeacherDetails} />
      )}
      {currentView === "price" && <TeacherPrice />}
    </div>
  );
};
