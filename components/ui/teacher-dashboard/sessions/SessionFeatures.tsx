"use client";
import React, { useState } from "react";
import OneOnOneSession from "../../student-dashboard/sessions/OneOnOneSession";
import SpecialRequest from "./SpecialRequest";

// common tab for two parts of a tab
export const ToggleTab: React.FC<{
  setTabState: React.Dispatch<React.SetStateAction<boolean>>;
  tabState: boolean;
  firstTabTitle: string;
  secondTabTitle: string;
}> = ({ tabState, firstTabTitle, secondTabTitle, setTabState }) => {
  const handleChange = (value: boolean) => {
    return setTabState(value);
  };
  return (
    <div className=" flex  w-[300px] mb-3 border rounded-lg overflow-hidden">
      <button
        onClick={() => handleChange(true)}
        className={` px-3 py-2 flex-1 text-[12px] ${
          tabState && " bg-green-700 text-white font-semibold"
        } `}
      >
        {firstTabTitle}
      </button>
      <button
        onClick={() => handleChange(false)}
        className={` px-3 py-2 flex-1 text-[12px] ${
          !tabState && " bg-green-700 text-white font-semibold"
        } `}
      >
        {secondTabTitle}
      </button>
    </div>
  );
};
const SessionFeatures = () => {
  const [oneOneOne, setOneOneOne] = useState<boolean>(true);

  return (
    <div className=" flex my-6 flex-col gap-2">
      <ToggleTab
        setTabState={setOneOneOne}
        tabState={oneOneOne}
        firstTabTitle="One on one Session"
        secondTabTitle="Special Requests"
      />
      {oneOneOne ? (
        <OneOnOneSession isTeacher={true} />
      ) : (
        <SpecialRequest isTeacher={true} />
      )}
    </div>
  );
};

export default SessionFeatures;
