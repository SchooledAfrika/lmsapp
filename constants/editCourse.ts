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

export const editingCourseSchema = z.object({
    title: z.string().optional(),
    details: z.string().optional(),
    subject: z.string().optional(),
    grade: z.string().optional(),
    price: z.string().optional(),
  
    banner: z
      .any()
      .optional()
      .refine(
        (files) => !files || files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        { message: ".jpg, .jpeg, .png and .webp files are accepted." }
      )
      .refine(
        (files) => !files || files.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE,
        { message: `Max file size is 5MB.` }
      ),
  
    previewVideo: z
      .any()
      .optional()
      .refine(
        (files) => !files || files.length === 0 || ACCEPTED_VIDEO_TYPES.includes(files?.[0]?.type),
        { message: ".mp4, .mov, .avi, .wmv, .flv, and .webm files are accepted." }
      )
      .refine(
        (files) => !files || files.length === 0 || files?.[0]?.size <= MAX_VIDEO_FILE_SIZE,
        { message: `Max file size is 1GB.` }
      ),
  
    mainVideo: z
      .any()
      .optional()
      .refine(
        (files) => !files || files.length === 0 || ACCEPTED_VIDEO_TYPES.includes(files?.[0]?.type),
        { message: ".mp4, .mov, .avi, .wmv, .flv, and .webm files are accepted." }
      )
      .refine(
        (files) => !files || files.length === 0 || files?.[0]?.size <= MAX_VIDEO_FILE_SIZE,
        { message: `Max file size is 1GB.` }
      ),
  });
  