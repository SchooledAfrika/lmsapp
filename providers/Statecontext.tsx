"use client";

import React, { createContext, useState } from "react";
export const CommonDashboardContext = createContext<any>("");
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
    <CommonDashboardContext.Provider value={allContext}>
      {children}
    </CommonDashboardContext.Provider>
  );
};

export default Statecontext;
