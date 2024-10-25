"use client";
import React, { useState } from "react";
import AddCourses from "./AddCourses";

const HandleAddCourses = () => {
  const [showModel, setShowmodel] = useState<boolean>(false);
  return (
    <div onClick={() => setShowmodel(true)}>
      <AddCourses showModel={showModel} setShowmodel={setShowmodel} />
    </div>
  );
};

export default HandleAddCourses;
