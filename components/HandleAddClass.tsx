"use client";
import React, { useState } from "react";
import AddClassroom from "./ui/teacher-dashboard/addClassroom/addClassroom";
import AttendanceForm from "./ui/student-dashboard/sessions/AttendanceForm";


export const HandleAttendance : React.FC<{ sessionId: string, name: string }> = ({ sessionId, name }) => {
  const [showModel, setShowmodel] = useState<boolean>(false);
  return (
    <div onClick={() => setShowmodel(true)}>
      <AttendanceForm  sessionId={sessionId} name={name} showModel={showModel} setShowmodel={setShowmodel} />
    </div>
  );
};

const HandleAddClass = () => {
  const [showModel, setShowmodel] = useState<boolean>(false);
  return (
    <div onClick={() => setShowmodel(true)}>
      <AddClassroom showModel={showModel} setShowmodel={setShowmodel} />
    </div>
  );
};

export default HandleAddClass;
