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
