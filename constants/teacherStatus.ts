"use client";

import { z } from "zod";

// below is the zod schema for admin to update teacher status

export const teacherStatusSchema = z.object({
  status: z.enum(["Active", "Suspended", "Pending"], {
    message: "you can select a Active, Suspended or Pending format",
  }),
});
