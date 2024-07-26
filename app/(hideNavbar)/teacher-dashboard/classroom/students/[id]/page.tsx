"use client";

import SingleStudent from "@/components/ui/teacher-dashboard/SingleStudent";
import { useParams } from "next/navigation";

import React from "react";

const page = () => {
  return (
    <div>
      <SingleStudent />
    </div>
  );
};

export default page;
