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
      include: {
        teacher: {
          select: {
            profilePhoto: true,
            name: true,
            status: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(allCourses), { status: 200 });
  } catch (error) {
    return serverError();
  }
}

// modifying the courses created by the teacher
export async function PUT(req: Request) {
  const { id, ...payloads } = await req.json();
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  // check for authentication
  if (!userId) return notAuthenticated();
  if (role !== "Teacher") return onlyTeacher();
  try {
    // here lets get the courses and check if is the teacher that created it
    const gottenCourse = await prisma.courses.findUnique({
      where: { id },
      select: {
        teacherId: true,
      },
    });
    if (gottenCourse?.teacherId !== userId) {
      return new Response(
        JSON.stringify({ message: "You can update only your courses" }),
        { status: 400 }
      );
    }
    // now, we can proceed to update the course
    await prisma.courses.update({
      where: { id },
      data: { ...payloads },
    });
    return new Response(
      JSON.stringify({ message: "Course updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}

// here we allow the teacher to delete their courses
export async function DELETE(req: Request) {
  const { id } = await req.json();
  const userId = await serverSessionId();
  // check authentication
  if (!userId) return notAuthenticated();
  try {
    // check if is the owner that want to delete the course
    const gottenCourse = await prisma.courses.findUnique({
      where: { id },
      select: {
        teacherId: true,
      },
    });
    if (gottenCourse?.teacherId !== userId) {
      return new Response(
        JSON.stringify({ message: "This course does not belong to you" }),
        { status: 400 }
      );
    }
    // now we can proceed and delete now
    await prisma.courses.delete({
      where: { id },
    });
    return new Response(
      JSON.stringify({ message: "course deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}
