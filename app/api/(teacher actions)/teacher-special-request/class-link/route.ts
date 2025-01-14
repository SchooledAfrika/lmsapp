// here we will create a class link for the student to join for a class
import SingleSpecialRequest from "@/components/ui/admin-dashboard/sessions/SingleSpecialRequest";
import prisma from "@/prisma/prismaConnect";
import {
  notAuthenticated,
  onlyTeacher,
  serverError,
} from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

// lets create the class link
export async function POST(req: Request) {
  const { link, sessionId } = await req.json();
  // check for authentication of the teacher
  const teacherId = await serverSessionId();
  const role = await serverSessionRole();
  if (!teacherId) return notAuthenticated();
  if (role !== "Teacher") return onlyTeacher();
  // first, lets check if the applied session actually exist
  // return error if it does not exist
  const checkSession = await prisma.specialTeacherMerged.findUnique({
    where: {
      id: sessionId,
    },
  });
  if (!checkSession) {
    return new Response(JSON.stringify({ message: "session does not exist" }), {
      status: 400,
    });
  }
  // now we can proceed to create the link here
  try {
    await prisma.specialRequestMeeting.create({
      data: {
        link,
        specialTeacherMergedId: sessionId,
      },
    });
    return new Response(
      JSON.stringify({ message: "class link created successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}

// here we will update a link if is created already before
export async function PUT(req: Request) {
  const user = await serverSessionId();
  const role = await serverSessionRole();
  const { link, sessionId } = await req.json();

  if (!user) return notAuthenticated();
  if (role !== "Teacher") return onlyTeacher();

  const checkClass = await prisma.specialRequestMeeting.findFirst({
    where: { specialTeacherMergedId: sessionId },
    select: { id: true },
  });

  if (!checkClass) {
    return new Response(JSON.stringify({ message: "class not found" }), {
      status: 400,
    });
  }

  try {
    await prisma.specialRequestMeeting.update({
      where: { id: checkClass.id },
      data: { link },
    });
    return new Response(
      JSON.stringify({ message: "class link updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}
