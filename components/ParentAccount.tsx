"use client";
import React, { useState } from "react";
import ParentInfo from "./ui/parent-login/ParentInfo";
import ParentWardAccess from "./ui/parent-login/ParentWardAccess";
import ParentWardProfileData from "./ui/parent-login/ParentWardProfileData";

const ParentAccount = () => {
  const [showComponent, setShowComponent] = useState("Personal Info");

  const handleParentLogin = (view: any) => {
    setShowComponent(view);
  };

  return (
    <div>
      {showComponent === "Personal Info" && (
        <ParentInfo onClickButton={handleParentLogin} />
      )}
      {showComponent === "Ward Access" && (
        <ParentWardAccess onClickButton={handleParentLogin} />
      )}
      {showComponent === "Ward Profile Data" && <ParentWardProfileData />}
    </div>
  );
};

export default ParentAccount;
