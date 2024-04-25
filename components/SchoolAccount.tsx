"use client";
import { useState } from "react";
import SchoolInfo from "./ui/school-login/SchoolInfo";
import SchoolPersonalInfo from "./ui/school-login/SchoolPersonalInfo";

const SchoolAccout: React.FC = () => {
  const [showSchoolInfo, setShowSchoolInfo] = useState(true);

  const handleShowSchoolInfo = () => {
    setShowSchoolInfo(false);
  };

  return (
    <div>
      {showSchoolInfo ? (
        <SchoolInfo onClickSchoolInfo={handleShowSchoolInfo} />
      ) : (
        <SchoolPersonalInfo />
      )}
    </div>
  );
};

export default SchoolAccout;
