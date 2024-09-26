"use client";

import { z } from "zod";

export const studentStatusSchema = z.object({
  status: z.enum(["Active", "Suspended", "Pending"], {
    message: "you can select a Active, Suspended or Pending format",
  }),
});
