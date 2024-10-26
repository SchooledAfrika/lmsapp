import { z } from "zod";


// creating the zod definition for the exams
export const parentExamSchema = z.object({
    subject: z.string().min(2, { message: "enter subject" }),
  title: z.string().min(3, { message: "enter your exam title" }),
  duration: z.string().min(3, { message: "enter your exam title" }),
  grade: z.string().min(3, { message: "enter your exam title" }),
  type: z.string({ message: "select the exam type" }),
  createdAt: z.string(),  
  id: z.string(),
    questions: z
    .array(
      z.object({
        question: z
          .string({ message: "enter your question" })
          .min(4, { message: "enter a valid answer" }),
        answer: z.string({ message: "enter a valid answer" }).min(1, {
          message: "click beside the correct option to add the answer",
        }),
        studentAnswer: z.string({ message: "enter a valid answer" }).min(1, {
            message: "click beside the correct option to add the answer",
          }),
        options: z.array(z.string()),
      })
    ).default([{ question: "", answer: "", studentAnswer: "", options: ["", "", "", ""] }]),
 
});
