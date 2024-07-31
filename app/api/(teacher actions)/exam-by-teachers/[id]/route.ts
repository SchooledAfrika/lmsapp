// here we get a single exam which the teacher is requesting for
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const teacherId = await serverSessionId();
  const teacherRole = await serverSessionRole();
  if (!teacherId) return notAuthenticated();
  if (teacherRole !== "Teacher") {
    return new Response(JSON.stringify({ message: "you are not allowed" }), {
      status: 400,
    });
  }
  //   now we act by fetching the particular exam its self
  try {
    const theExam = await prisma.exams.findUnique({
      where: {
        id: params.id,
      },
    });
    return new Response(JSON.stringify(theExam), { status: 200 });
  } catch (error) {
    console.log(error);
    return serverError();
  }
}
