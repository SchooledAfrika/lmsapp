// here, admin will be able to get all the special requests
// and also be able to merge them to a particular teacher.
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, onlyAdmin, serverError } from "@/prisma/utils/error";
import { specialRequest } from "@/prisma/utils/payment";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

// getting all the special requests
export async function GET(req: Request) {
  // check for authentication
  // and only admin can be able to access this
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  if (!userId) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();
  try {
    const allSession = await prisma.specialTeacherUnmerged.findMany({
      where: { merged: false },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        student: {
          select: {
            profilePhoto: true,
            name: true,
            email: true,
          },
        },
      },
    });
    console.log(allSession);
    return new Response(JSON.stringify(allSession), { status: 200 });
  } catch (error) {
    return serverError();
  }
}

// updating the specialRequest and also merging a teacher here
export async function PUT(req: Request) {
  const { adminSessionId, amt, teacherSessionId } = await req.json();
  console.log(adminSessionId, amt, teacherSessionId);
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  if (!userId) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();

  // lets check if the specialRequest actually exists before we proceed
  const theSpecialRequest = await prisma.specialTeacherUnmerged.findUnique({
    where: { id: adminSessionId },
    select: {
      id: true,
      merged: true,
      studentId: true,
      language: true,
      subject: true,
      grade: true,
      time: true,
    },
  });
  if (!theSpecialRequest || theSpecialRequest.merged === true) {
    return new Response(
      JSON.stringify({
        message: "this session is already merged or does not exist",
      }),
      { status: 404 }
    );
  }
  //   now lets get the teacher id making use of their session Id provided
  //   throw an error if this teacher does not exist
  const teacherId = await prisma.oneOnOneSection.findFirst({
    where: { sessionId: teacherSessionId },
    select: { teacherId: true },
  });
  if (!teacherId)
    return new Response(
      JSON.stringify({ message: "Invalid teacher's session id provided" }),
      { status: 404 }
    );
  try {
    // now we can go ahead and merge the student with a teacher
    await prisma.specialTeacherMerged.create({
      data: {
        studentId: theSpecialRequest.studentId,
        teacherId: teacherId.teacherId,
        subject: theSpecialRequest.subject,
        amt: Number(amt),
        language: theSpecialRequest.language,
        grade: theSpecialRequest.grade,
        time: theSpecialRequest.time,
      },
    });
    // now we can update the database of the special request model
    // and set the merged to true
    await prisma.specialTeacherUnmerged.update({
      where: { id: adminSessionId },
      data: { merged: true },
    });
    return new Response(
      JSON.stringify({ message: "teacher merged successfully to the student" }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return serverError();
  }
}
