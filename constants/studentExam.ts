import { z } from "zod";


// creating the zod definition for the exams to be answered
export const studentExamSchema = z.object({
    answeredExam: z
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
        option: z.array(z.string()),
      })
    ).default([{ question: "", answer: "", studentAnswer: "", option: ["", "", "", ""] }]),
 
});
