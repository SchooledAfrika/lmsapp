"use client";

import { z } from "zod";


// below is the zod schema for teachers that updates their passwords


// below is the zod schema for adding classroom
//
export const teacherPasswordUpdateSchema = z.object({
  oldPassword: z.string().min(3, { message: "old password is required" }),
  newPassword: z.string().min(3, { message: "new password is required" }),
});
