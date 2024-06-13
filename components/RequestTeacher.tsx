"use client";
import { useState } from "react";
import WardsDetail from "./ui/parent-dashoard/teachers/request-teacher/WardsDetail";
import TeacherRequest from "./ui/parent-dashoard/teachers/request-teacher/TeacherRequest";

const RequestTeacher: React.FC = () => {
  const [showWardsDetail, setShowWardsDetail] = useState(true);

  const handleShowWardsDetail = () => {
    setShowWardsDetail(false);
  };

  return (
    <div>
      {showWardsDetail ? (
        <WardsDetail OnclickWardsDetail={handleShowWardsDetail} />
      ) : (
        <TeacherRequest/>
      )}
    </div>
  );
};

export default RequestTeacher;
