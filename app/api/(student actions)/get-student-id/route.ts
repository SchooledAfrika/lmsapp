// in this page we will be able to just get the student id and display it in the settings
import prisma from "@/prisma/prismaConnect";
import {
  notAuthenticated,
  onlyStudent,
  serverError,
} from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(req: Request) {
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  if (!userId) return notAuthenticated();
  if (role !== "Student") return onlyStudent();

  try {
    const studentId = await prisma.student.findUnique({
      where: { id: userId },
      select: {
        studentId: true,
      },
    });

    return new Response(JSON.stringify(studentId), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
