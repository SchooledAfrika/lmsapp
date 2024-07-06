"use client";

import { z } from "zod";

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
export const addingClassroomSchema = z.object({
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
  price: z.number({
    required_error: "Price is required",
    invalid_type_error: "Price must be a number",
  }),
  classBanner: z.string().min(3, { message: "field is required" }),
  publicClass: z.boolean({ message: "field is required" }),
  maxCapacity: z.number({
    required_error: "Maximum Capacity is required",
    invalid_type_error: "Maximum Capacity must be a number",
  }),
  classTime: z.string().min(3, { message: "field is required" }),
});
