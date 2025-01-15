"use client";
import React, { useState } from "react";
import { ToggleTab } from "./sessions/SessionFeatures";
import {
  AllPurchasedCourses,
  AllTeacherCreatedCourses,
} from "./courses/courses";
import HandleComingSoon from "./courses/HandleComingSoon";

const ResourceFeatures = () => {
  const [createdCourse, setCreatedCourse] = useState<boolean>(true);
  return (
    <div>
      <ToggleTab
        tabState={createdCourse}
        setTabState={setCreatedCourse}
        firstTabTitle="Created Courses"
        secondTabTitle="Purchased Courses"
      />
      {createdCourse ? <AllTeacherCreatedCourses /> : <AllPurchasedCourses />}
    </div>
  );
};

export default ResourceFeatures;
