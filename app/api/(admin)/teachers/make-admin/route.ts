// here, in this route, we make a teacher an admin
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, onlyAdmin, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function PUT(req: Request) {
  const { id } = await req.json();
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  if (!userId) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();
  try {
    // check if the teacher is even existing first
    const teacher = await prisma.teacher.findUnique({
      where: { id },
      select: {
        id: true,
      },
    });
    if (!teacher)
      return new Response(
        JSON.stringify({ message: "teacher does not exist" }),
        { status: 404 }
      );
    // we can now make the teacher an admin now
    await prisma.teacher.update({
      where: { id },
      data: { role: "Admin" },
    });
    return new Response(
      JSON.stringify({
        message: "you have successfully made the teacher an admin",
      }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}
