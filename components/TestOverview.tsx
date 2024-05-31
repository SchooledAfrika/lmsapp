"use client";
import React, { useState } from "react";
import ViewTestDetails from "./ViewTestDetails";
import ViewAllQuestions from "./ViewAllQuestions";

const TestOverview = () => {
  const [displayComponent, setDisplayComponent] = useState(true);

  const handleDisplayComponent = () => {
    setDisplayComponent(false);
  };

  return (
    <div>
      {displayComponent ? (
        <ViewTestDetails onClickChange={handleDisplayComponent} />
      ) : (
        <ViewAllQuestions />
      )}
    </div>
  );
};

export default TestOverview;
