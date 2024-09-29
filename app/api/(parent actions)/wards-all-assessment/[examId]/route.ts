// this will handle getting only a single exam
// this may be exam from one on one session
// or single exam from class
import prisma from "@/prisma/prismaConnect";
import { serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(
  req: Request,
  { params }: { params: { examId: string } }
) {
  console.log(params);
  try {
    // first lets check if the exam exists in class
    // if it exist, we should just return it
    const classExam = await prisma.studentClassExam.findUnique({
      where: { id: params.examId },
    });
    console.log(classExam);
    if (classExam)
      return new Response(JSON.stringify(classExam), { status: 200 });
    // check if the exam exist in one on one session
    // if it exist we should just return it
    const sessionExam = await prisma.studentExam.findUnique({
      where: { id: params.examId },
    });
    if (sessionExam)
      return new Response(JSON.stringify(sessionExam), { status: 200 });
    // then if the exam can't be found in the both kinds of exam, we should return an error message
    return new Response(JSON.stringify({ message: "exams not found" }), {
      status: 404,
    });
  } catch (error) {
    return serverError();
  }
}
