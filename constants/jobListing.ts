"use client";

import { z } from "zod";

export interface IprogressType {
  name: string;
  field: string[];
}

export const States = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Federal Capital Territory",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

// progress info for booking session with teachers
export const JobListingInfo: IprogressType[] = [
  {
    name: "Job Description",
    field: [
      "jobTitle",
      "role",
      "location",
      "state",
      "level",
      "description",
      "minSalary",
      "maxSalary",
    ] as const,
  },
  { name: "Responsibilities", field: ["responsibility"] as const },
  { name: "Qualifications", field: ["qualifications"] as const },
  { name: "Finalization", field: ["note"] as const },
];

// the zod types for completing profile information
//

// below is the zod schema for booking of session with teachers
//
export const jobListingSchema = z.object({
  jobTitle: z.string().min(3, { message: "field is required" }),
  role: z.enum(["FULLTIME", "PARTTIME"], {
    message: "you can only enter FULLTIME format",
  }),
  location: z.string().min(3, { message: "field is required" }),
  state: z.string().min(3, { message: "field is required" }),
  level: z.enum(
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
  description: z.string().min(3, { message: "field is required" }),
  minSalary: z.string().min(3, { message: "field is required" }),
  maxSalary: z.string().min(3, { message: "field is required" }),
  responsibility: z.array(z.string(), {
    message: "please enter job responsibilities",
  }),
  qualifications: z.array(z.string(), {
    message: "please enter job qualifications",
  }),
  note: z.string().min(3, { message: "field is required" }),
});
