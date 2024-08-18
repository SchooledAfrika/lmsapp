// here we will be able to get one class which will incluse the
// school teachers info and the students information
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(req: Request) {
  const classId = new URL(req.url).searchParams.get("id");
  const schoolId = await serverSessionId();
  if (!schoolId) return notAuthenticated();
  try {
    const singleClass = await prisma.schoolClass.findUnique({
      where: { id: classId as string },
      include: {
        AnnouncementBySchoolClass: true,
        SchoolClassTeacher: {
          select: {
            teacher: {
              select: {
                id: true,
                name: true,
                email: true,
                profilePhoto: true,
              },
            },
          },
        },
        SchoolClassStudent: {
          select: {
            createdAt: true,
            student: {
              select: {
                name: true,
                profilePhoto: true,
              },
            },
          },
        },
        school: {
          select: {
            banner: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(singleClass), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
