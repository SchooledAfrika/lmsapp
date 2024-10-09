"use client";

import { z } from "zod";

// below is the zod schema for adding ward
//
export const addWardSchema = z.object({
  email: z.string().min(3, { message: "Email is required" }),
  password: z.string().min(3, { message: "Password is required" }),
  gender: z.enum(["Male", "Female"], {
    message: "you can only enter Male or Female format",
  }),
  name: z.string().min(3, { message: "field is required" }),
});

export const urlRegex =
  /^(https?:\/\/)?((([a-zA-Z\d]([a-zA-Z\d-]*[a-zA-Z\d])*)\.)+[a-zA-Z]{2,}|\d{1,3}(\.\d{1,3}){3})(:\d+)?(\/[-a-zA-Z\d%_.~+]*)*(\?[;&a-zA-Z\d%_.~+=-]*)?(#[a-zA-Z\d_]*)?$/;
