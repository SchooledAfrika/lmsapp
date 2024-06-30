"use client";

import { z } from "zod";

export interface IprogressType {
  name: string;
  field: string[];
}

// progress info for requesting teacher
export const RequestTeacherInfo: IprogressType[] = [
  {
    name: "Ward's Detail",
    field: [ "gender", "grade"],
  },
  { name: "Teacher's Request", field: [ "selectLanguage",  "selectSubject", "selectGrade", "classSchedule", "details"] },
];

// below is the zod schema for requesting a special teacher
//
export const requestTeacherSchema = z.object({
    gender: z.enum(["Male", "Female"], { message: "please select gender" }),
    grade: z.string({ message: "grade is required" }),
    selectLanguage: z.string({ message: "language is required" }),
    selectSubject: z.string({ message: "subject is required" }),
    selectGrade: z.string({ message: "Grade is required" }),
    classSchedule: z.string({ message: "Field is required" }),
    details: z
      .string()
      .min(20, { message: "describe the type of teacher you need with a minimum of 20 characters" }),
  });
  