// here, we will be able to get only one teacher
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, onlyAdmin, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

// get the teacher info, for single teacher
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  // check for authentication flow here
  const id = await serverSessionId();
  const role = await serverSessionRole();
  if (!id) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();
  try {
    const oneTeacher = await prisma.teacher.findUnique({
      where: { id: params.id },
      include: {
        Classes: true,
      },
    });
    return new Response(JSON.stringify(oneTeacher), { status: 200 });
  } catch (error) {
    return serverError();
  }
}

// delete a teachers account
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const checkTeacher = await prisma.teacher.findUnique({
      where: { id: params.id },
      select: { id: true },
    });
    if (!checkTeacher)
      return new Response(JSON.stringify({ message: "Teacher not found" }), {
        status: 404,
      });
    // now we can delete the teacher
    await prisma.teacher.delete({
      where: { id: params.id },
    });
    return new Response(
      JSON.stringify({ message: "teacher successfully deleted" }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}

// check teachers status to restricted or activated
