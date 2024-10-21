// here we will get only the teachers session id
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(req: Request) {
  const teacherId = await serverSessionId();
  if (!teacherId) return notAuthenticated();
  try {
    const sessionId = await prisma.oneOnOneSection.findFirst({
      where: { teacherId },
      select: {
        sessionId: true,
      },
    });
    return new Response(JSON.stringify(sessionId), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
