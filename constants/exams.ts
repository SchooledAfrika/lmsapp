import { z } from "zod";
export interface IprogressType {
  name: string;
  field: string[];
}
export const Iexam: IprogressType[] = [
  { name: "Choose Type", field: ["title", "type"] },
  { name: "Test Paper", field: ["test"] },
  { name: "Settings", field: ["grade", "duration", "start", "end"] },
  { name: "Finalization", field: [""] },
];

// creating the zod defination for the exams we have
export const examSchema = z.object({
  subject: z.string().min(2, { message: "enter subject" }),
  title: z.string().min(3, { message: "enter your exam title" }),
  type: z.string({ message: "select the exam type" }),
  test: z
    .array(
      z.object({
        question: z
          .string({ message: "enter your question" })
          .min(4, { message: "enter a valid answer" }),
        answer: z.string({ message: "enter a valid answer" }).min(1, {
          message: "click beside the correct option to add the answer",
        }),
        options: z.array(z.string()),
      })
    )
    .default([{ question: "", answer: "", options: ["", "", "", ""] }]),
  grade: z.enum([
    "Grade1",
    "Grade2",
    "Grade3",
    "Grade4",
    "Grade5",
    "Grade6",
    "Grade7",
    "Grade8",
    "Grade9",
    "Grade10",
    "Grade11",
    "Grade12",
  ]),
  duration: z.string({ message: "enter the duration" }),
  start: z.date(),
  end: z.date(),
});
