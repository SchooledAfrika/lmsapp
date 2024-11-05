// here, we will allow teachers to get special request where they exist
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { serverSessionId } from "@/prisma/utils/utils";

export async function GET(req: Request) {
  const userId = await serverSessionId();
  if (!userId) return notAuthenticated();
  try {
    const allSpecialRequestedSessions =
      await prisma.specialTeacherMerged.findMany({
        where: { teacherId: userId },
        include: {
          student: {
            select: {
              profilePhoto: true,
              name: true,
              status: true,
              email: true,
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
