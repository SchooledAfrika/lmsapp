"use client";
import React, { useState } from "react";
import StudentModuleTestOne from "./StudentModuleTestOne";
import StudentModuleTestTwo from "./StudentModuleTestTwo";

const StudentTestQuestions = () => {
  const [showComponent, setShowComponent] = useState(true);

  const handleClick = () => {
    setShowComponent(false);
  };

  const handleBackClick = () => {
    setShowComponent(true);
  };
  return (
    <div>
      {showComponent ? (
        <StudentModuleTestOne
          onClickBackButton={handleBackClick}
          onClickButton={handleClick}
        />
      ) : (
        <StudentModuleTestTwo />
      )}
    </div>
  );
};

export default StudentTestQuestions;
