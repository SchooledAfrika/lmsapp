"use client";

import { z } from "zod";

// below is the zod schema for admin to update teacher role

export const changeTeacherRoleSchema = z.object({
  type: z.enum(["INTERNAL", "EXTERNAL"], {
    message: "you can select a INTERNAL or EXTERNAL format",
  }),
});