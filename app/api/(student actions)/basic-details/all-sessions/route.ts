// here, we will get all the session that belongs to a particular student
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { serverSessionId } from "@/prisma/utils/utils";

export async function GET(req: Request) {
  const userId = await serverSessionId();
  if (!userId) return notAuthenticated();
  try {
    const allSessions = await prisma.appliedSection.findMany({
      where: { studentId: userId },
    });
    const totalSessions = allSessions.length;
    return new Response(JSON.stringify({ totalSession: totalSessions }), {
      status: 200,
    });
  } catch (error) {
    return serverError();
  }
}
