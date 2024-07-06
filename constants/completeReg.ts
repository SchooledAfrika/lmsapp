"use client";

import { z } from "zod";

export interface IprogressType {
  name: string;
  field: string[];
}

// progress info for students
export const StudentMoreInfo: IprogressType[] = [
  {
    name: "Personal Information",
    field: ["name", "gender", "phoneNo", "address", "profilePhoto"],
  },
  { name: "Profile Data", field: ["grade", "details"] },
];
// progress info for teachers
export const TeacherMoreInfo: IprogressType[] = [
  {
    name: "Personal Information",
    field: ["name", "gender", "phoneNo", "address", "profilePhoto"],
  },
  { name: "Resume & Qualification", field: ["resume", "details"] },
  {
    name: "Subject & preference",
    field: ["language", "subject", "grade", "homeWorkPrice", "sessionPrice"],
  },
  {
    name: "Payments Details",
    field: ["bankName", "accountName", "accountNo", "terms"],
  },
];
export const SchoolMoreInfo: IprogressType[] = [
  { name: "School Information", field: ["schName", "schAddress", "banner"] },
  {
    name: "Personal Information",
    field: ["ownerName", "phoneNo", "homeAddress"],
  },
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
const ACCEPT_DOC_TYPES = ["application/pdf"];
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

// below is the zod schema for students
//
export const studentSchema = z.object({
  name: z
    .string({ message: "name is required" })
    .min(3, { message: "name is required" }),
  gender: z.enum(["Male", "Female"], { message: "please select gender" }),
  phoneNo: z
    .string({ message: "phone number is required" })
    .min(5, { message: "enter your phone number" }),
  address: z
    .string({ message: "address is required" })
    .min(5, { message: "enter a valid address" }),
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
  grade: z.string({ message: "grade is required" }),
  details: z
    .string()
    .min(20, { message: "describe your self with a minimum of 20 characters" }),
});

// this is zod schema for teachers completing their profile informations
//
export const teacherSchema = z.object({
  name: z.string().min(3, { message: "enter your name" }),
  gender: z.enum(["Male", "Female"], { message: "enter your gender" }),
  phoneNo: z.string().min(5, { message: "enter your phone number" }),
  address: z.string().min(10, { message: "enter a valid house address" }),
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
  resume: z
    .any()
    // To not allow empty files
    .refine((files) => files?.length >= 1, { message: "resume is required" })
    // To not allow files other than images
    .refine((files) => ACCEPT_DOC_TYPES.includes(files?.[0]?.type), {
      message: "only pdf, doc and docx files are allowed",
    })
    // To not allow files larger than 5MB
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
      message: `Max file size is 5MB.`,
    }),
  details: z.string().min(10, { message: "description is needed" }),
  language: z.string().min(3, { message: "enter your prefered language" }),
  subject: z.string({ message: "enter your prefered subject" }),
  grade: z.string({ message: "select your grade" }),
  sessionPrice: z.string().min(1, { message: "add your session price" }),
  homeWorkPrice: z.string().min(1, { message: "add your homework price" }),
  bankName: z.string({ message: "enter your bank name" }),
  accountNo: z.string().min(9, { message: "enter a valid account number" }),
  accountName: z.string().min(5, { message: "enter valid bank name" }),
  preference: z.array(z.string(), { message: "please select a preference" }),
});

// below is the schema for completing the school account registration
//
export const schoolSchema = z.object({
  name: z.string().min(2, { message: "enter a valid school name" }),
  schAddress: z.string().min(3, { message: "enter a valid school address" }),
  banner: z
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
  ownerName: z.string().min(3, { message: "enter a valid name" }),
  phoneNo: z.string().min(5, { message: "enter a valid phone number" }),
  homeAddress: z.string().min(5, { message: "enter a valid home address" }),
});
