"use client";
import React, { useState } from "react";
import TestType from "./TestType";
import TestPaper from "./TestPaper";
import TestSettings from "./TestSettings";
import TestFinalization from "./TestFinalization";

const TestDetails = () => {
  const [changeComponent, setChangeComponent] = useState("TestType");

  const handleChangeComponent = (view: string) => {
    setChangeComponent(view);
  };

  return (
    <>
      {changeComponent === "TestType" && (
        <TestType onChangeComponent={handleChangeComponent} />
      )}
      {changeComponent === "TestPaper" && (
        <TestPaper onChangeComponent={handleChangeComponent} />
      )}
      {changeComponent === "TestSettings" && (
        <TestSettings onChangeComponent={handleChangeComponent} />
      )}
      {changeComponent === "TestFinalization" && <TestFinalization />}
    </>
  );
};

export default TestDetails;
