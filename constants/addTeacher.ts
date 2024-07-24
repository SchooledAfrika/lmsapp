"use client";

import { z } from "zod";


// below is the zod schema for adding classroom
//
export const addingTeacherSchoolSchema = z.object({
    teacherId: z.string().optional(),
   
    
  });
  