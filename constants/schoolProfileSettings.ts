"use client";

import { z } from "zod";


// below is the zod schema for schools that updates their profiles
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const schoolProfileSettingsSchema = z.object({
  name: z.string().min(3, { message: "name is required" }),
  phoneNo: z.string().min(3, { message: "Phone Number is required" }),
  email: z.string().min(3, { message: "email is required" }),
  schAddress: z.string().min(3, { message: "address is required" }),
  ownerName: z.string().min(3, { message: "School Name is required" }),
  schoolLogo: z
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
