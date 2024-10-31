// here we will get all the resources and test set by the teacher so far.
import prisma from "@/prisma/prismaConnect";
import { serverError } from "@/prisma/utils/error";
import { serverSessionId } from "@/prisma/utils/utils";

export async function GET(req: Request) {
  const userId = await serverSessionId();
  try {
    const totalExamAndResources = await prisma.teacher.findUnique({
      where: { id: userId },
      select: {
        Exams: {
          select: {
            id: true,
          },
        },
        TeachersArticle: {
          select: {
            id: true,
          },
        },
      },
    });
    // checking if there is exam and calculating the total
    const allExamsCount = Number(totalExamAndResources?.Exams.length) || 0;
    // checking if there is resources and calculating the total
    const allResourcesCount =
      Number(totalExamAndResources?.TeachersArticle.length) || 0;

    const total = allExamsCount + allResourcesCount;
    console.log(total);
    // now we can return our response
    return new Response(JSON.stringify({ allResource: total }), {
      status: 200,
    });
  } catch (error) {
    return serverError();
  }
}
