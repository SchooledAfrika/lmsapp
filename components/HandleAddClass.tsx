"use client";
import React, { useState } from "react";
import AddClassroom from "./ui/teacher-dashboard/addClassroom/addClassroom";
import AttendanceForm from "./ui/student-dashboard/sessions/AttendanceForm";
import { Button } from "./ui/button";
import { CiCalendarDate } from "react-icons/ci";

export const HandleAttendance: React.FC<{
  sessionId: string;
  name: string;
}> = ({ sessionId, name }) => {
  const [showModel, setShowmodel] = useState<boolean>(false);
  return (
    <div>
      <Button
        onClick={() => setShowmodel(true)}
        className="bg-lightGreen mt-3 bg-none border-none rounded-lg hover:bg-green-700  text-white text-[13px] font-semibold  px-3 w-full    py-2 text-center lg:block"
      >
        <CiCalendarDate className="sm:inline-block text-[18px] hidden mr-1" />
        Mark Attendance
      </Button>
      <AttendanceForm
        sessionId={sessionId}
        name={name}
        showModel={showModel}
        setShowmodel={setShowmodel}
      />
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
