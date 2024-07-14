"use client";

import { z } from "zod";
// the schedules array
export const Schedules = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
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

// below is the zod schema for parents that continues with their registration
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// below is the zod schema for adding classroom
//
export const addingClassroomSchoolSchema = z.object({
  subject: z.string().min(3, { message: "field is required" }),
  className: z.string().min(3, { message: "field is required" }),
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
  duration: z.string().min(3, { message: "field is required" }),
  classStarts: z.date(),
  classEnds: z.date(),
  schedules: z.array(z.string(), { message: "please select days of classes" }),
  maxCapacity: z.string({ message: "enter your class capacity" }),
  classTime: z.string().min(3, { message: "field is required" }),
});
