"use client";

import { z } from "zod";

export interface IprogressType {
  name: string;
  field: string[];
}

// progress info for booking session with teachers
export const BookSessionInfo: IprogressType[] = [
  {
    name: "Language & Duration",
    field: ["language", "duration"] as const,
  },
  { name: "Session Details", field: ["privateSession", "homeworkSupport", "groupSessions", "sessionNumber"] as const, },
  { name: "Scheduling", field: ["classStarts", "classEnds"] as const, },
  { name: "Payment", field: ["paystack", "flutterwave", "remita"] as const, }
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
export const sessionbookingSchema = z.object({
  language:z.string().min(3,{ message: "field is required" }),
  duration: z.string().min(3,{ message: "field is required" }),
  privateSession: z.boolean({ message: "please select session number" }),
  homeworkSupport: z.boolean({ message: "please select session number" }),
  groupSessions: z.boolean({ message: "please select session number" }),
  
  sessionNumber: z.number({ message: "please select session number" }),
  classStarts: z.date({ message: "selection is required" }),
  classEnds: z.date({ message: "selection is required" }),
  paystack: z.boolean({ message: "selection is required" }),
  flutterwave: z.boolean({ message: "selection is required" }),
  remita: z.boolean({ message: "selection is required" }),
});

