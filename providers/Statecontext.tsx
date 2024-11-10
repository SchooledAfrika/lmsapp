"use client";
import Cookies from "js-cookie";

import React, { createContext, useState } from "react";
export const CommonDashboardContext = createContext<any>("");
const Statecontext = ({ children }: { children: React.ReactNode }) => {
  const [showSideBar, setShowSideBar] = useState<boolean>();
  const [showPricing, setShowPricing] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(true);
  const [confirmLogout, setConfirmLogout] = useState<boolean>(false);
  // state that handles refetch when wardId changes
  const [wardId, setWardIs] = useState<string | undefined>(() => {
    const id = Cookies.get("wardId");
    return id;
  });
  const allContext = {
    showSideBar,
    setShowSideBar,
    showPricing,
    setShowPricing,
    verified,
    setVerified,
    wardId,
    setWardIs,
    confirmLogout,
    setConfirmLogout,
  };
  return (
    <CommonDashboardContext.Provider value={allContext}>
      {children}
    </CommonDashboardContext.Provider>
  );
};

export default Statecontext;
