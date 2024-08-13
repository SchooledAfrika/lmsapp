"use client";

import { z } from "zod";


// below is the zod schema for students that updates their profiles



export const studentProfileSettingsSchema = z.object({
  name: z.string().min(3, { message: "name is required" }),
  email: z.string().min(3, { message: "email is required" }),
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
  phoneNo: z.string().min(3, { message: "Phone Number is required" }),
  address: z.string().min(3, { message: "address is required" }),
  gender: z.enum(["Male", "Female"], {
    message: "you can only enter male or female as gender",
  }),
});
