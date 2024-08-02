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

export const TeacherOneOnOneSection: oneOnOneSection[] = [
  { name: "Profile Data", field: ["aboutTutor"] },
  {
    name: "Subject and Preferences",
    field: ["subjects", "grade", "preference"],
  },
  {
    name: "Pricing Details",
    field: ["minPrice", "maxPrice"],
  },
];

// const MAX_FILE_SIZE = 5000000;
// const ACCEPTED_IMAGE_TYPES = [
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "image/webp",
// ];

export const oneOnOneSectionSchema = z.object({
  // teacherImg: z
  //   .any()
  //   // To not allow empty files
  //   .refine((files) => files?.length >= 1, { message: "Image is required." })
  //   // To not allow files other than images
  //   .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
  //     message: ".jpg, .jpeg, .png and .webp files are accepted.",
  //   })
  //   // To not allow files larger than 5MB
  //   .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
  //     message: `Max file size is 5MB.`,
  //   }),
  aboutTutor: z.string().min(3, { message: "please enter your bio" }),
  subjects: z.array(z.string(), { message: "please enter subject" }),
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
      message: "please enter grade",
    }
  ),
  preference: z.array(z.string(), { message: "please enter preferences" }),
  minPrice: z.number({ message: "please enter minimum price" }),
  maxPrice: z.number({ message: "please enter maximum price" }),
});
