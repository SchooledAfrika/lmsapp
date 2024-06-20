"use client";

import { z } from "zod";

export const StudentMoreInfo: string[] = [
  "Personal Information",
  "Profile Data",
];
export const TeacherMoreInfo: string[] = [
  "Personal Information",
  "Resume & Qualification",
  "Subject & preference",
  "Payments Details",
];
export const SchoolMoreInfo: string[] = [
  "School Information",
  "Personal Information",
];
export const ParentsMoreInfo: string[] = [
  "Personal Information",
  "Wards Account Access",
  "Ward Profile Data",
];

// the zod types for completing profile information
//
// below is the zod schema for parents that continues with their registration
