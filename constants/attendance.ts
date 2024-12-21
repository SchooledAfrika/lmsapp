"use client";

import { z } from "zod";

// below is the zod schema for marking attendance
//
export const attendanceSchema = z.object({
  date: z.date(),
  duration: z.enum(
    ["Absent", "30 minutes", "1 hour", "1 hour 30 minutes", "2 hours"],
    {
      message: "you can only enter the above listed format",
    }
  ),
});
