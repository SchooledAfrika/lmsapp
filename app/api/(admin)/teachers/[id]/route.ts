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
        Classes: {
          include: {
            students: {
              select: {
                id: true,
                name: true,
                profilePhoto: true,
              },
            },
          },
        },
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
  // here we check for authentication and role
  const id = await serverSessionId();
  const role = await serverSessionRole();
  if (!id) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();
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
    console.log(error);
    return serverError();
  }
}

// check teachers status to restricted or activated
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  console.log("entered");
  const { status } = await req.json();
  // check for authentication flow here
  const id = await serverSessionId();
  const role = await serverSessionRole();
  if (!id) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();
  try {
    // fetch one teacher and check if it exist before updating the status
    const teacher = await prisma.teacher.findUnique({
      where: { id: params.id },
      select: {
        id: true,
      },
    });
    if (!teacher)
      return new Response(JSON.stringify({ message: "Teacher not found" }), {
        status: 404,
      });
    // now, we can update the teachers status
    await prisma.teacher.update({
      where: { id: params.id },
      data: {
        status,
      },
    });
    return new Response(
      JSON.stringify({ message: "Teacher's status successfully updated" }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}
