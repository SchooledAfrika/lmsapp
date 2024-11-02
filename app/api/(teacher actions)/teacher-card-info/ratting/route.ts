// here we just get the ratting of the teacher
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { serverSessionId } from "@/prisma/utils/utils";

export async function GET(req: Request) {
  const userId = await serverSessionId();
  if (!userId) return notAuthenticated();
  try {
    const getRatting = await prisma.teacher.findUnique({
      where: { id: userId },
      select: { rating: true },
    });
    const totalRate = Number(getRatting?.rating) || 0;
    return new Response(JSON.stringify({ rattings: totalRate }), {
      status: 200,
    });
  } catch (error) {
    return serverError();
  }
}
