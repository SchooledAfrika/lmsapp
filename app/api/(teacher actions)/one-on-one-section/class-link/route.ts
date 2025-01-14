// here we will create a class link for the student to join for a class
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
  const checkSession = await prisma.appliedSection.findUnique({
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
    await prisma.singleMeeting.create({
      data: {
        link,
        appliedSectionId: sessionId,
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

// here, we will make a put request to modify the class link
export async function PUT(req: Request) {
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  const { link, sessionId } = await req.json();

  if (!userId) return notAuthenticated();
  if (role !== "Teacher") return onlyTeacher();

  // check if the meeting exist first,
  // if not throw an error
  const checkMeeting = await prisma.singleMeeting.findFirst({
    where: { appliedSectionId: sessionId },
    select: { id: true },
  });
  if (!checkMeeting) {
    return new Response(
      JSON.stringify({ message: "create meeting before updating it" }),
      { status: 400 }
    );
  }

  try {
    await prisma.singleMeeting.update({
      where: { id: checkMeeting.id },
      data: { link },
    });
    return new Response(
      JSON.stringify({ message: "class link successfully updated" }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}
