// here we will be able to get the session of the ward
import prisma from "@/prisma/prismaConnect";
import {
  notAuthenticated,
  onlyParents,
  serverError,
} from "@/prisma/utils/error";
import {
  getQuery,
  serverSessionId,
  serverSessionRole,
} from "@/prisma/utils/utils";

export async function GET(req: Request) {
  const childId = getQuery(req.url, "childId");
  const id = await serverSessionId();
  const role = await serverSessionRole();
  // check for authentication first
  if (!id) return notAuthenticated();
  if (role !== "Parents") return onlyParents();
  try {
    const childSessions = await prisma.appliedSection.findMany({
      where: { studentId: childId },
      select: {
        subject: true,
        grade: true,
        sectionType: true,
        hoursperday: true,
        duration: true,
        startTime: true,
        sectionOwner: {
          select: {
            teacher: {
              select: {
                name: true,
                profilePhoto: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return new Response(JSON.stringify(childSessions), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
