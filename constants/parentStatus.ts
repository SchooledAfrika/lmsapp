"use client";

import { z } from "zod";

// below is the zod schema for admin to update parent status

export const parentStatusSchema = z.object({
  status: z.enum(["Active", "Suspended"], {
    message: "you can select a Active or Suspended format",
  }),
});