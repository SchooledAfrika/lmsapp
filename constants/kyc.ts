"use client";

import { z } from "zod";

export interface IprogressType {
  name: string;
  field: string[];
}

// progress info for booking session with teachers
export const KycInfo: IprogressType[] = [
  {
    name: "Document Upload",
    field: ["documentType", "documentUpload"] as const,
  },
  { name: "Take Picture", field: ["takePicture"] as const, },
 
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

// below is the zod schema for booking of session with teachers
//
export const kycSchema = z.object({
  documentType:z.enum(["pdf", "docx", "txt"], {
    message: "you can only enter pdf, docx, or txt files",
  }),
  documentUpload: z
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
  takePicture: z
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
  
});

