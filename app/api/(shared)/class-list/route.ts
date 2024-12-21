// here, we will be able to get class information about a single class
// this are class for group and not for schools
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { serverSessionId } from "@/prisma/utils/utils";

export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("classId");
  const studentId = await serverSessionId();
  // checking if the student is authenticated
  if (!studentId) return notAuthenticated();
  try {
    const classInfo = await prisma.classes.findUnique({
      where: {
        id: id!,
      },
      include: {
        AnnouncementByTeacherClass: true,
        ClassExams: true,
        teacher: {
          select: {
            name: true,
            profilePhoto: true,
          },
        },
        ClassLink: {
          select: {
            stillValid: true,
            joinUrl: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(classInfo), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
