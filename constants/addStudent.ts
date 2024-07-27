"use client";

import { z } from "zod";


// below is the zod schema for adding student
//
export const addingStudentSchoolSchema = z.object({
    studentId: z.string().optional(),
   
    
  });
  