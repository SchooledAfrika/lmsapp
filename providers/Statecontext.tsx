"use client";

import React, { createContext, useState } from "react";
export const SchoolDashboardContext = createContext<any>("");
const Statecontext = ({ children }: { children: React.ReactNode }) => {
  const [showSideBar, setShowSideBar] = useState<boolean>();
  const [showPricing, setShowPricing] = useState<boolean>(true);
  const allContext = {
    showSideBar,
    setShowSideBar,
    showPricing,
    setShowPricing,
  };
  return (
    <SchoolDashboardContext.Provider value={allContext}>
      {children}
    </SchoolDashboardContext.Provider>
  );
};

export default Statecontext;
