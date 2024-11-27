// here, we will get the information of the teacher
// and check if he has connected to zoom with our application before
import prisma from "@/prisma/prismaConnect";
import {
  notAuthenticated,
  onlyTeacher,
  serverError,
} from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(req: Request) {
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  if (!userId) return notAuthenticated();
  if (role !== "Teacher") return onlyTeacher();
  try {
    const zoomInfos = await prisma.meetingInfo.findUnique({
      where: {
        teacherId: userId,
      },
    });
    return new Response(JSON.stringify(zoomInfos), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
