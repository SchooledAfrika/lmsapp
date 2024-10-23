// here we will get all the session for a particular student
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";
export async function GET(req: Request) {
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  if (!userId) return notAuthenticated();
  if (role !== "Student") {
    return new Response(
      JSON.stringify({ message: "this route is allowed only for students" })
    );
  }
  try {
    const allSessions = await prisma.student.findUnique({
      where: { id: userId },
      select: {
        AppliedSection: {
          include: {
            sectionOwner: {
              select: {
                teacher: {
                  select: {
                    name: true,
                    profilePhoto: true,
                    email: true,
                    status: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return new Response(JSON.stringify(allSessions), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
