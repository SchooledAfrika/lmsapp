// here, we will handle teachers getting all the courses they created before
// so they can modify them if they wish
import prisma from "@/prisma/prismaConnect";
import {
  notAuthenticated,
  onlyAdmin,
  onlyTeacher,
  serverError,
} from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(req: Request) {
  // check for authentication first
  const teacherId = await serverSessionId();
  const role = await serverSessionRole();
  if (!teacherId) return notAuthenticated();
  if (role !== "Teacher") return onlyTeacher();

  try {
    const allCourses = await prisma.courses.findMany({
      where: { teacherId },
      orderBy: [{ createdAt: "desc" }],
    });
    return new Response(JSON.stringify(allCourses), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
