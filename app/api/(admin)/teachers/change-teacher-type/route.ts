// here, we will be able to change the role of teacher from external to internal
// or changing it back from internal to external teacher
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, onlyAdmin, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function PUT(req: Request) {
  const { teacherId, type } = await req.json();
  //   here, we will check if the user is authenticated so far
  const id = await serverSessionId();
  const role = await serverSessionRole();
  if (!id) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();
  try {
    await prisma.teacher.update({
      where: { id: teacherId },
      data: {
        teachingRole: type,
      },
    });
    return new Response(
      JSON.stringify({ message: "teacher role updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}
