"use client";

import { z } from "zod";


// below is the zod schema for teachers that updates their profiles


// below is the zod schema for adding classroom
//
export const teacherProfileSettingsSchema = z.object({
  name: z.string().min(3, { message: "name is required" }),
  phoneNo: z.string().min(3, { message: "Phone Number is required" }),
  email: z.string().min(3, { message: "email is required" }),
  address: z.string().min(3, { message: "address is required" }),
});
