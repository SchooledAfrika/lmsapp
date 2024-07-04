import { authOptions } from "@/lib/nextAuth";
import { getServerSession } from "next-auth/next";

export interface IexamType {
  question: String;
  answer: String;
  studentAnswer: String;
  options: String[];
}

interface ExamType {
  correctAnswer: number;
  percentage: string;
}

export const successFullMessage = (message: string) => {
  return new Response(JSON.stringify({ message }), { status: 200 });
};

// function to handle marking of exams here
export const markExams = (answeredTest: IexamType[]): ExamType => {
  const correctAnswerArray = answeredTest.filter(
    (item: IexamType) => item.answer === item.studentAnswer
  );
  const correctAnswer = correctAnswerArray.length;
  const getPercent = (correctAnswer / answeredTest.length) * 100;
  const percentage = getPercent.toFixed(2).toString().concat("%");
  // returning the number of question got and also the percentage gotten in the exam
  return { correctAnswer, percentage };
};

// here we get users information or roles
export const serverSessionId = async (): Promise<string | undefined> => {
  const session = await getServerSession(authOptions);
  const id = session?.user.id;
  return id;
};
export const serverSessionRole = async (): Promise<string | undefined> => {
  const session = await getServerSession(authOptions);
  const role = session?.user.role;
  return role;
};
