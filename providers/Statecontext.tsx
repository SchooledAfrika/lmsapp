"use client";

import React, { createContext, useState } from "react";
export const SchoolDashboardContext = createContext<any>("");
const Statecontext = ({ children }: { children: React.ReactNode }) => {
  const [showSideBar, setShowSideBar] = useState<boolean>();
  const allContext = { showSideBar, setShowSideBar };
  return (
    <SchoolDashboardContext.Provider value={allContext}>
      {children}
    </SchoolDashboardContext.Provider>
  );
};

export default Statecontext;
