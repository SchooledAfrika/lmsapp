import { authOptions } from "@/lib/nextAuth";
import { getServerSession } from "next-auth/next";
import prisma from "../prismaConnect";

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

// custome function for returning a query based on the name
export const getQuery = (url: string, queryKey: string): string => {
  const newUrl = new URL(url);
  const queryName = newUrl.searchParams.get(queryKey);
  return queryName as string;
};

// function to check for kyc approvals
export const checkKyc = async (
  teacherId: string
): Promise<string | undefined> => {
  let status: string | undefined;
  const teacherKyc = await prisma.kyc.findUnique({
    where: { teacherId },
    select: { status: true },
  });
  status = teacherKyc?.status;
  return status;
};

// function to check to total class created by the teacher
export const checkTotalClass = async (
  teacherId: string
): Promise<number | undefined> => {
  let totalClasses: number | undefined;
  const getClasses = await prisma.classes.findMany({
    where: { teacherId },
    select: { id: true },
  });
  totalClasses = getClasses.length;
  return totalClasses;
};

// get the plans of the teacher below here
export const checkPlans = async (
  teacherId: string
): Promise<string | undefined> => {
  let plan: string | undefined;
  const teachersPlans = await prisma.teachersPlans.findFirst({
    where: { teacherId },
    select: { plan: true },
  });
  plan = teachersPlans?.plan;
  return plan;
};

export const generateId = (): string => {
  const randomId = crypto.randomUUID().toString().substring(0, 5);
  console.log(randomId);
  const sessionId = `SCLAFK-${randomId}`;
  console.log(sessionId);
  return sessionId;
};
