"use client";

import React, { createContext, useState } from "react";
export const AdminDashboardContext = createContext<any>("");
const Admincontext = ({ children }: { children: React.ReactNode }) => {
  const [showSideBar, setShowSideBar] = useState<boolean>();
  const [verified, setVerified] = useState<boolean>(true);
  const allAdminContext = {
    showSideBar,
    setShowSideBar,
    verified,
    setVerified
  };
  return (
    <AdminDashboardContext.Provider value={allAdminContext}>
      {children}
    </AdminDashboardContext.Provider>
  );
};

export default Admincontext;
