"use client";

import React, { useState } from "react";
import OneOnOneSession from "./OneOnOneSession";
import SpecialRequest from "./SpecialRequest";


const SessionFeatures = () => {
  const [oneOneOne, setOneOneOne] = useState<boolean>(true);
  const handleChange = (value: boolean) => {
    return setOneOneOne(value);
  };
  return (
    <div className=" flex flex-col gap-2">
      <div className=" flex  w-[300px] border rounded-lg overflow-hidden">
        <button
          onClick={() => handleChange(true)}
          className={` px-3 py-2 flex-1 text-[12px] ${
            oneOneOne && " bg-green-700 text-white font-semibold"
          } `}
        >
          One on one Session
        </button>
        <button
          onClick={() => handleChange(false)}
          className={` px-3 py-2 flex-1 text-[12px] ${
            !oneOneOne && " bg-green-700 text-white font-semibold"
          } `}
        >
          Special Requests
        </button>
      </div>
      {oneOneOne ? <OneOnOneSession isTeacher={false} /> : <SpecialRequest />}
    </div>
  );
};

export default SessionFeatures;
