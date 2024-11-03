// here, the student should be able to get all the special class requested for them below;
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { getQuery, serverSessionId } from "@/prisma/utils/utils";

// student gets all the sessions that was requested for them
export async function GET(req: Request) {
  const studentId = getQuery(req.url, "studentId");
  // check for authentication below
  const userId = await serverSessionId();
  if (!userId) return notAuthenticated();
  try {
    const allSpecialRequestedSessions =
      await prisma.specialTeacherMerged.findMany({
        where: {
          studentId,
        },
        include: {
          teacher: {
            select: {
              name: true,
              profilePhoto: true,
              email: true,
              details: true,
            },
          },
        },
      });
    return new Response(JSON.stringify(allSpecialRequestedSessions), {
      status: 200,
    });
  } catch (error) {
    return serverError();
  }
}
