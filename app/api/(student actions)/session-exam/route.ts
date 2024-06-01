// here, this route handles when student answers their questions
// this exam will be updated and saved
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { IexamType } from "@/prisma/utils/utils";

// make an update request here
export async function PUT(req: Request) {
  // TODO: change this studentId to nextauth id
  const { studentId, studentExamId, answeredTest } = await req.json();
  if (!studentId) return notAuthenticated();
  // continue here to calculate the total score of the test written
  //   first, we will map the answered test and return the total number that was answered correctly
  const correctAnswer = answeredTest.map(
    (item: IexamType) => item.answer === item.studentAnswer
  );
  const getPercent = (correctAnswer.length / answeredTest.length) * 100;
  const percentage = getPercent.toFixed(2).toString();
  // now, lets update the studentExam now
  try {
    await prisma.studentExam.update({
      where: { id: studentExamId },
      data: {
        completed: true,
        score: correctAnswer.length,
        percentage: percentage,
        questions: answeredTest,
      },
    });
    return new Response(
      JSON.stringify({
        message: `you have answered ${correctAnswer.length} correctly, check for corrections`,
      }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}
