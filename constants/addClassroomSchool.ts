"use client";

import { z } from "zod";


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


// below is the zod schema for adding classroom
//
export const addingClassroomSchoolSchema = z.object({
  subject: z.string().min(3, { message: "field is required" }),
  name: z.string().min(3, { message: "field is required" }),
  grade: z.enum(
    [
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
    ],
    {
      message: "you can only enter Grade1 format",
    }
  ),
  time: z.string().min(3, { message: "field is required" }),
});
