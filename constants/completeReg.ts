"use client";

import { z } from "zod";

export interface IprogressType {
  name: string;
  field: string[];
}

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
// the progress data for parent completing their profile
export const ParentsMoreInfo: IprogressType[] = [
  {
    name: "Personal Information",
    field: ["name", "gender", "phoneNo", "address", "profilePhoto"] as const,
  },
  {
    name: "Wards Account Access",
    field: ["wardId", "wardEmail", "password", "confirmPassword"] as const,
  },
  {
    name: "Ward Profile Data",
    field: [
      "wardName",
      "wardGender",
      "grade",
      "disable",
      "details",
      "childImg",
    ] as const,
  },
];

// the zod types for completing profile information
//
// below is the zod schema for parents that continues with their registration
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const parentSchema = z.object({
  name: z.string().min(3, { message: "enter your name" }),
  gender: z.enum(["Male", "Female"], {
    message: "you can only enter male or female as gender",
  }),
  phoneNo: z.string().min(5, { message: "enter your phone number" }),
  address: z
    .string()
    .min(5, { message: "enter valid parmanent address please" }),
  profilePhoto: z
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
  wardId: z.string().optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  wardName: z.string().min(4, { message: "enter a valid name" }),
  wardGender: z.enum(["Male", "Female"], {
    message: "you can only enter male or female as gender",
  }),
  grade: z.string({ message: "enter grade" }),
  disable: z.string({ message: "select the field above" }),
  details: z.string({ message: "fill the field above" }),
  childImg: z
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
  wardEmail: z.string().optional(),
});
