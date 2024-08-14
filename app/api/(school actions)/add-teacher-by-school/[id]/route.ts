// here we will be able to get one teacher and display just few of their information in the school
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const schoolId = await serverSessionId();
  const role = await serverSessionRole();
  if (!schoolId) return notAuthenticated();
  if (role !== "School")
    return new Response(
      JSON.stringify({
        message: "you are not allowed to view this information",
      })
    );
  try {
    const teacherInfo = await prisma.teacher.findUnique({
      where: {
        id: params.id,
      },
      select: {
        name: true,
        profilePhoto: true,
        email: true,
        phoneNo: true,
        rating: true,
        resume: true,
      },
    });
    console.log(teacherInfo);
    return new Response(JSON.stringify(teacherInfo), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
