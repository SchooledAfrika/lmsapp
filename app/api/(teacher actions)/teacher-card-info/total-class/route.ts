// here, we will get all the classes by the teacher below
import prisma from "@/prisma/prismaConnect";
import { serverError } from "@/prisma/utils/error";
import { getQuery, serverSessionId } from "@/prisma/utils/utils";

export async function GET(req: Request) {
  const userId = getQuery(req.url, "id");
  // const userId = await serverSessionId();
  try {
    const allClasses = await prisma.teacher.findUnique({
      where: { id: userId },
      select: {
        Classes: {
          select: {
            id: true,
          },
        },
      },
    });
    const totalClasses = Number(allClasses?.Classes.length) || 0;
    console.log(totalClasses);
    return new Response(JSON.stringify({ allClasses: totalClasses }), {
      status: 200,
    });
  } catch (error) {
    return serverError();
  }
}
