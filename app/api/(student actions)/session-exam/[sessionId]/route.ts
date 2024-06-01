// here, we will get all the exams that is associated with appliedsection
import prisma from "@/prisma/prismaConnect";
import { serverError } from "@/prisma/utils/error";

// route to get exams based on the appliedSectionId
export async function GET(req: Request) {
  const url = new URL(req.url).pathname;
  const splitedUrl = url.split("/");
  const appliedSectionId = splitedUrl[splitedUrl.length - 1];
  // now we go ahead and get all the exams associated with this session
  try {
    const sessionExams = await prisma.studentExam.findMany({
      where: { appliedSectionId },
    });
    return new Response(JSON.stringify(sessionExams), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
