"use client";

import { z } from "zod";





const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MAX_VIDEO_FILE_SIZE = 1073741824;
const ACCEPTED_VIDEO_TYPES = [
  "video/mp4",
  "video/mov",
  "video/flv",
  "video/wmv",
  "video/avi",
  "video/webm",
];

// below is the zod schema for admin to add courses
//
export const addingCourseSchema = z.object({
  title: z.string().min(3, { message: "field is required" }),
  description: z.string().min(3, { message: "field is required" }),
  price: z.string({ message: "enter your price" }),
  courseBanner: z
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
    coursePreview: z
    .any()
    // To not allow empty files
    .refine((files) => files?.length >= 1, { message: "Video is required." })
    // To not allow files other than videos
    .refine((files) => ACCEPTED_VIDEO_TYPES.includes(files?.[0]?.type), {
      message: ".mp4, .mov, .avi, .wmv, .flv, and .webm files are accepted.",
    })
    // To not allow files larger than 1GB
    .refine((files) => files?.[0]?.size <= MAX_VIDEO_FILE_SIZE, {
      message: `Max file size is 1GB.`,
    }),
    courseVideo: z
    .any()
    // To not allow empty files
    .refine((files) => files?.length >= 1, { message: "Video is required." })
    // To not allow files other than videos
    .refine((files) => ACCEPTED_VIDEO_TYPES.includes(files?.[0]?.type), {
      message: ".mp4, .mov, .avi, .wmv, .flv, and .webm files are accepted.",
    })
    // To not allow files larger than 1GB
    .refine((files) => files?.[0]?.size <= MAX_VIDEO_FILE_SIZE, {
      message: `Max file size is 1GB.`,
    }),
 
});

export const urlRegex =
  /^(https?:\/\/)?((([a-zA-Z\d]([a-zA-Z\d-]*[a-zA-Z\d])*)\.)+[a-zA-Z]{2,}|\d{1,3}(\.\d{1,3}){3})(:\d+)?(\/[-a-zA-Z\d%_.~+]*)*(\?[;&a-zA-Z\d%_.~+=-]*)?(#[a-zA-Z\d_]*)?$/;
