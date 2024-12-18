// here, we return some basic information about the student in a class
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { serverSessionId } from "@/prisma/utils/utils";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  // checking if user is authenticated
  const teacherId = await serverSessionId();
  if (!teacherId) return notAuthenticated();
  // then we return information about a student
  try {
    const student = await prisma.student.findUnique({
      where: {
        id: params.id,
      },
    });
    return new Response(JSON.stringify(student), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
