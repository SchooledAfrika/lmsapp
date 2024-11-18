"use client";

import React from "react";

const page = () => {
  const handleClick = () => {
    throw new Error("something went wrong doing this");
  };
  return (
    <div className=" px-3 py-2 rounded-md border" onClick={handleClick}>
      click me
    </div>
  );
};

export default page;
