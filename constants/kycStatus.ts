"use client";

import { z } from "zod";

// below is the zod schema for admin to update kyc status

export const kycStatusSchema = z.object({
 
  status: z.enum(["PENDING", "APPROVED", "REJECTED"], {
    message: "you can only select a Pending, Approved, or Rejected format",
  }),
});