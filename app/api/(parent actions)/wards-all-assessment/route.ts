// here we will get all the exams written by the ward
// this will include both class exams and the session exams answered by the student
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import {
  getQuery,
  serverSessionId,
  serverSessionRole,
} from "@/prisma/utils/utils";

export async function GET(req: Request) {
  const childId = getQuery(req.url, "childId");
  // const id = await serverSessionId();
  // if (!id) return notAuthenticated();
  try {
    // first, lets get all the exams written by the ward in class
    const answeredClassExams = await prisma.studentClassExam.findMany({
      where: { studentId: childId, completed: true },
      select: {
        id: true,
        completed: true,
        score: true,
        title: true,
        percentage: true,
        questions: true,
        grade: true,
      },
    });
    // now lets get all the exams written by the ward in oneOnOne section
    const appliedSectionExams = await prisma.appliedSection.findMany({
      where: { studentId: childId },
      select: {
        StudentExam: {
          where: { completed: true },
          select: {
            id: true,
            completed: true,
            score: true,
            title: true,
            percentage: true,
            questions: true,
            grade: true,
          },
        },
      },
    });
    // now lets map and flatten the exams written by the student in the oneOnOne section
    // this is because it is actually a nested array,
    // so this will help put it in one single array
    const mappedSectionExam = appliedSectionExams
      .map((exam) => exam.StudentExam)
      .flat();
    //   created a new array that will hold the both types of exam below
    const totalExamArrays = [...answeredClassExams, ...mappedSectionExam];
    return new Response(JSON.stringify(totalExamArrays), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
