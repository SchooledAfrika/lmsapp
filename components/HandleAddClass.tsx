"use client";
import React, { useState } from "react";
import AddClassroom from "./ui/teacher-dashboard/addClassroom/addClassroom";

const HandleAddClass = () => {
  const [showModel, setShowmodel] = useState<boolean>(false);
  return (
    <div onClick={() => setShowmodel(true)}>
      <AddClassroom showModel={showModel} setShowmodel={setShowmodel} />
    </div>
  );
};

export default HandleAddClass;
