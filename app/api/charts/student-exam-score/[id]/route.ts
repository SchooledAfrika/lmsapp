// here in this enpoint, we will calculate the average score of the student based on the month
import prisma from "@/prisma/prismaConnect";
import {
  processScoresByMonth,
  IexamsSum,
} from "@/prisma/utils/charts/students";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  console.log("general exams here");
  const userId = await serverSessionId();
  if (!userId) return notAuthenticated();
  try {
    // fetching all the written exams by student, both one on one and classes exams
    // --- below is fetching for the classes the student is in
    const classWrittenExams = await prisma.studentClassExam.findMany({
      where: { studentId: params.id },
      select: {
        createdAt: true,
        score: true,
      },
    });
    // now we fetch for one on one section of that particular student
    const sessionWrittenExam = await prisma.appliedSection.findFirst({
      where: { studentId: params.id },
      select: {
        StudentExam: {
          select: {
            score: true,
            createdAt: true,
          },
        },
      },
    });
    const sessionExam = sessionWrittenExam?.StudentExam ?? [];
    const totalExams: IexamsSum[] = [...sessionExam, classWrittenExams].flat();
    const chartData = processScoresByMonth(totalExams);
    console.log(chartData);
    return new Response(JSON.stringify(chartData), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
