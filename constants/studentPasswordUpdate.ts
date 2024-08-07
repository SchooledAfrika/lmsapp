"use client";

import { z } from "zod";


// below is the zod schema for students that updates their passwords



export const studentPasswordUpdateSchema = z.object({
  oldPassword: z.string().min(3, { message: "old password is required" }),
  newPassword: z.string().min(3, { message: "new password is required" }),
});
