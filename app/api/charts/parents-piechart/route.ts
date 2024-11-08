// here, we will be able to return all the sessions, teachers and resources pie charts value here
import prisma from "@/prisma/prismaConnect";
import { serverError } from "@/prisma/utils/error";
import {
  getQuery,
  serverSessionId,
  serverSessionRole,
} from "@/prisma/utils/utils";

export async function GET(req: Request) {
  const wardId = getQuery(req.url, "wardId");
  console.log("the wardId here:", wardId);
  try {
    // lets get the total classes first
    const childClasses = await prisma.student.findUnique({
      where: { id: wardId },
      select: {
        classIDs: true,
      },
    });
    const totalClasses = childClasses?.classIDs.length;
    // lets get the total exams written by the student
    const studentOneToOneExams = await prisma.appliedSection.findMany({
      where: { studentId: wardId },
      select: {
        StudentExam: {
          where: {
            completed: true,
          },
          select: {
            id: true,
          },
        },
      },
    });
    // next, we will return exams which the ward answered
    // and it should be the ones that are already answered
    const studentClassExams = await prisma.studentClassExam.findMany({
      where: {
        studentId: wardId,
        completed: true,
      },
      select: {
        id: true,
      },
    });
    const totalExams = studentClassExams.length + studentOneToOneExams.length;
    // for total teacher is teacher in one on one and teachers in normal group classes
    const noOfAppliedSession = await prisma.appliedSection.findMany({
      where: { studentId: wardId },
      select: {
        id: true,
      },
    });
    // total teachers below here
    const totalTeachers = totalClasses! + noOfAppliedSession.length;
    // now we create an array and make sure we return undifined if the number is zero
    const allItem = [
      totalClasses ?? null,
      totalExams ?? null,
      totalTeachers ?? null,
    ];
    console.log(allItem);
    return new Response(JSON.stringify(allItem), { status: 200 });
  } catch (error) {
    console.log(error);
    return serverError();
  }
}
