// here admin will be able to get all the courses created by the admin
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, onlyAdmin, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(req: Request) {
  // check for authentication first
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  if (!userId) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();
  try {
    const coursesByAdmins = await prisma.courses.findMany({
      where: { byAdmin: true },
      orderBy: [{ createdAt: "desc" }],
      include: {
        teacher: {
          select: {
            name: true,
            status: true,
            profilePhoto: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(coursesByAdmins), { status: 200 });
  } catch (error) {
    return serverError();
  }
}

// the admin can be able to update the courses they created before
export async function PUT(req: Request) {
  const { id, ...payload } = await req.json();
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  // check for authentication
  if (!userId) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();
  try {
    await prisma.courses.update({
      where: { id },
      data: { ...payload },
    });
    return new Response(
      JSON.stringify({ message: "Successfully updated course" }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}

// admin can be able to delete their courses here
export async function DELETE(req: Request) {
  const { id } = await req.json();
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  // check for authentication
  if (!userId) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();
  try {
    // we can go ahead and delete the course
    await prisma.courses.delete({
      where: { id },
    });
    return new Response(
      JSON.stringify({ message: "course deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}
