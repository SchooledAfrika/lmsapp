"use client";

import { z } from "zod";

export interface IprogressType {
  name: string;
  field: string[];
}

// progress info for booking session with teachers
export const BookSessionInfo: IprogressType[] = [
  {
    name: "Child Details",
    field: [
      "childId",
      "grade",
      "subject",
      "curriculum",
      "specialNeeds",
      "goals",
    ] as const,
  },
  {
    name: "Scheduling",
    field: [
      "days",
      "SessionTypes",
      "hours",
      "length",
      "time",
      "classStarts",
    ] as const,
  },
  { name: "Payment", field: ["paystack", "flutterwave"] as const },
];

// below is the zod schema for booking of session with teachers
//
export const sessionbookingSchema = z.object({
  childId: z.string().min(3, { message: "field is required" }),
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
  sessionTypes: z.object({
    id: z.number(),
    sessionName: z.string(),
    price: z.number(),
    billingCycle: z.string().min(1),
  }),
  subject: z.array(z.string(), { message: "select at least one subject" }),
  curriculum: z.string().min(3, { message: "field is required" }),
  specialNeeds: z.string().min(3, { message: "field is required" }),
  goals: z.string().min(3, { message: "field is required" }),
  days: z.array(z.string(), { message: "please select days" }),
  times: z.string().min(3, { message: "field is required" }),
  hours: z.string().optional(),
  length: z.string().min(3, { message: "field is required" }),
  classStarts: z.date(),
  paystack: z.boolean({ message: "selection is required" }),
  flutterwave: z.boolean({ message: "selection is required" }),
});

// progress info for booking session with teachers
export const BookSessionStudentInfo: IprogressType[] = [
  {
    name: "Your Details",
    field: ["grade", "subject", "curriculum", "specialNeeds", "goals"] as const,
  },
  {
    name: "Scheduling",
    field: [
      "days",
      "SessionTypes",
      "hours",
      "length",
      "time",
      "classStarts",
    ] as const,
  },
  { name: "Payment", field: ["paystack", "flutterwave"] as const },
];

// below is the schema for student that want to book a section
export const StudentSessionSchema = z.object({
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
  subject: z.array(z.string(), { message: "select at least one subject" }),
  curriculum: z.string().min(3, { message: "field is required" }),
  specialNeeds: z.string().min(3, { message: "field is required" }),
  goals: z.string().min(3, { message: "field is required" }),
  sessionTypes: z.string().min(3, { message: "field is required" }),
  days: z.array(z.string(), { message: "please select days" }),
  times: z.string().min(3, { message: "field is required" }),
  hours: z.string().optional(),
  length: z.string().min(3, { message: "field is required" }),
  classStarts: z.date(),
});
