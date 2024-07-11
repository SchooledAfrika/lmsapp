import { z } from "zod";

// schema for get in touch with school afrika
export const contactSchema = z.object({
  name: z.string().min(3, { message: "name is required" }),
  email: z.string().email({ message: "enter valid email" }),
  message: z.string().min(3, { message: "enter a valid message" }),
  phoneNo: z.string().min(5, { message: "enter a valid phone number" }),
});
