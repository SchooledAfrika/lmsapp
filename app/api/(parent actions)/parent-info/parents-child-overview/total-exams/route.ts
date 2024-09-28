// here we run the logic of getting the total exam written so far by a child
// this is assessible by the parents,
// this endpoint will hold the information about total exams written by the ward
// and also it will hold the overall percentage of the exam written
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import {
  getQuery,
  serverSessionId,
  serverSessionRole,
} from "@/prisma/utils/utils";

export async function GET(req: Request) {
  // check for authentication first
  const childId = getQuery(req.url, "childId");
  const parentsId = await serverSessionId();
  if (!parentsId) return notAuthenticated();
  try {
    // first lets get all the exams that has been answered so far by student in the one to one section
    // remember, we are only returning the answered exams
    const studentOneToOneExams = await prisma.appliedSection.findMany({
      where: { studentId: childId },
      select: {
        StudentExam: {
          where: {
            completed: true,
          },
          select: {
            score: true,
          },
        },
      },
    });
    // next, we will return exams which the ward answered
    // and it should be the ones that are already answered
    const studentClassExams = await prisma.studentClassExam.findMany({
      where: {
        studentId: childId,
        completed: true,
      },
      select: {
        score: true,
      },
    });
    // getting the value of the score by mapping through the arrays
    // and also flattening the arrays to one and summing the array using reduce method
    // then now getting the average from the summed scores
    const newArrayFromOneOnOneScores = studentOneToOneExams
      .map((exam) => exam.StudentExam.map((oneexam) => oneexam.score))
      .flat();
    const addedOneToOneValue = newArrayFromOneOnOneScores.reduce(
      (total, current) => total! + (current ?? 0),
      0
    );
    const oneToOneAverageScore =
      addedOneToOneValue! / newArrayFromOneOnOneScores.length;
    // here we repeat the same thing we did above
    // but now its for exams answered so far in classes
    const newArrayFromClassExams = studentClassExams.map((exam) => exam.score);
    const addedClassExamValue = newArrayFromClassExams.reduce(
      (total, current) => total! + (current ?? 0),
      0
    );
    const classExamAverageScore =
      addedClassExamValue! / newArrayFromClassExams.length;
    // now we can then get the average from both type of exams
    const trueAverage = (oneToOneAverageScore + classExamAverageScore) / 2;
    const studentExamInfo = {
      totalExams:
        newArrayFromOneOnOneScores.length + newArrayFromClassExams.length,
      averageScore: trueAverage,
    };
    return new Response(JSON.stringify(studentExamInfo), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
