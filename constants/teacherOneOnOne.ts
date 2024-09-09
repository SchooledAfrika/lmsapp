"use client";

import { z } from "zod";

export interface oneOnOneSection {
  name: string;
  field: string[];
}

export const Preferences = [
  "Homework Support",
  "OneOnOne Section",
  "Open To Jobs",
  "Group Work",
];

export const Subject = [
  "CHEMISTRY",
  "PHYSICS",
  "BIOLOGY",
  "GOVERNMENT",
  "ENGLISH",
  "LITERATURE",
  "CRS",
  "MATHEMATICS",
];

export const Grade = [
  "Grade1",
  "Grade2",
  "Grade3",
  "Grade4",
  "Grade5",
  "Grade6",
  "Grade7",
  "Grade8",
  "Grade9",
  "Grade10",
  "Grade11",
  "Grade12",
];

export const TeacherOneOnOneSection: oneOnOneSection[] = [
  { name: "Profile Data", field: ["aboutTutor"] },
  {
    name: "Subject and Preferences",
    field: ["subjects", "grade", "preference"],
  },
];

export const oneOnOneSectionSchema = z.object({
  aboutTutor: z.string().min(3, { message: "please enter your bio" }),
  subjects: z.array(z.string(), { message: "please enter subject" }),
  grade: z.array(z.string(), { message: "please enter grade" }),
  preference: z.array(z.string(), { message: "please enter preferences" }),
});
