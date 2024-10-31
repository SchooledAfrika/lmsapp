// here, we will return the total students we have below;
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { serverSessionId } from "@/prisma/utils/utils";

export async function GET(req: Request) {
  const userId = await serverSessionId();
  if (!userId) return notAuthenticated();
  try {
    // lets calculate the total number of applied sessions of the teacher
    const totalSession = await prisma.oneOnOneSection.findFirst({
      where: { teacherId: userId },
      select: {
        AppliedSection: {
          select: {
            id: true,
          },
        },
      },
    });
    // here we get the total number of students in the classes
    const totalStudentInClass = await prisma.classes.findMany({
      where: { teacherId: userId },
      select: {
        studentIDs: true,
      },
    });
    const allSessions = Number(totalSession?.AppliedSection.length) || 0;
    const allStudentInClass = Number(totalStudentInClass.length) || 0;
    const total = allSessions + allStudentInClass;
    return new Response(JSON.stringify({ allStudent: total }), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
