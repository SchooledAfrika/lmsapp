// here, we will allow parents to make their request to get all the special request they hv made so far
import prisma from "@/prisma/prismaConnect";
import {
  notAuthenticated,
  onlyParents,
  serverError,
} from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(req: Request) {
  // check for authentication
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  if (!userId) return notAuthenticated();
  if (role !== "Parents") return onlyParents();
  try {
    const allSpecialRequest = await prisma.specialTeacherUnmerged.findMany({
      where: { parentsId: userId },
      include: {
        student: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(allSpecialRequest), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
