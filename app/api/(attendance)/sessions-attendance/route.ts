// here, we will be able to create the attendance,
// get the attendance
// delete a particular attendance
// or possibly update an attendance
import prisma from "@/prisma/prismaConnect";
import {
  notAuthenticated,
  onlyTeacher,
  serverError,
} from "@/prisma/utils/error";
import {
  getQuery,
  serverSessionId,
  serverSessionRole,
} from "@/prisma/utils/utils";

export async function POST(req: Request) {
  const { sessionId, classday, held, duration, heldType } = await req.json();
  const teacherId = await serverSessionId();
  const role = await serverSessionRole();
  // lets check for authentication first
  if (!teacherId) return notAuthenticated();
  if (role !== "Teacher") return onlyTeacher();
  // next, lets get the sesion
  //   check if the teacher is the owner of the session created
  const session = await prisma.appliedSection.findUnique({
    where: { id: sessionId },
    select: {
      sectionOwner: {
        select: {
          id: true,
        },
      },
    },
  });
  if (!session)
    return new Response(JSON.stringify({ message: "Session not found" }), {
      status: 404,
    });
  // check if attendance is already taken for the day
  // return error if its already taken or existing
  const checkExistence = await prisma.sessionAttendance.findFirst({
    where: {
      appliedSectionId: sessionId,
      classday,
    },
  });
  console.log(checkExistence);
  if (checkExistence) {
    return new Response(
      JSON.stringify({ message: "attendance already taken for the day" }),
      { status: 400 }
    );
  }
  try {
    await prisma.sessionAttendance.create({
      data: {
        teacherId,
        appliedSectionId: sessionId,
        classday,
        held,
        duration: held ? Number(duration) : 0,
        heldType,
      },
    });
    return new Response(
      JSON.stringify({ message: "attendance successfully marked" }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return serverError();
  }
}

// get all the attendance for a particular session
export async function GET(req: Request) {
  const userId = await serverSessionId();
  const sessionId = getQuery(req.url, "sessionId");
  if (!userId) return notAuthenticated();
  try {
    const allAttendance = await prisma.sessionAttendance.findMany({
      where: {
        appliedSectionId: sessionId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return new Response(JSON.stringify(allAttendance), { status: 200 });
  } catch (error) {
    return serverError();
  }
}

// here, we can allow teacher to delete their attendance
export async function DELETE(req: Request) {
  const sessionId = getQuery(req.url, "sessionId");
  const teacherId = await serverSessionId();
  if (!teacherId) return notAuthenticated();
  //   lets get the sessionAttendance and see if the teacher is the one that created it
  const attendance = await prisma.sessionAttendance.findUnique({
    where: {
      id: sessionId,
    },
    select: {
      teacherId: true,
    },
  });
  if (!attendance)
    return new Response(JSON.stringify({ message: "attendance not found" }), {
      status: 400,
    });

  try {
    await prisma.sessionAttendance.delete({
      where: {
        id: sessionId,
      },
    });
    return new Response(
      JSON.stringify({ message: "attendance deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}
