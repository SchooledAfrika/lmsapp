"use client";

import { z } from "zod";

export interface oneOnOneSection {
  name: string;
  field: string[];
}

export const TeacherOneOnOneSection: oneOnOneSection[] = [
  { name: "Profile Data", field: ["teacherImg", "aboutTeacher"] },
  {
    name: "Subject and Preferences",
    field: ["language", "subject", "grade", "preferences"],
  },
  {
    name: "Pricing Details",
    field: ["pricing"],
  },
];

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const oneOnOneSectionSchema = z.object({
  teacherImg: z
    .any()
    // To not allow empty files
    .refine((files) => files?.length >= 1, { message: "Image is required." })
    // To not allow files other than images
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
      message: ".jpg, .jpeg, .png and .webp files are accepted.",
    })
    // To not allow files larger than 5MB
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
      message: `Max file size is 5MB.`,
    }),
  aboutTeacher: z.string().min(3, { message: "please enter your bio" }),
  language: z.string({ message: "please enter language" }),
  subject: z.string({ message: "please enter subject" }),
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
  preferences: z.array(z.string(), { message: "please enter preferences" }),
  pricing: z.string({ message: "please enter price" }),
});
